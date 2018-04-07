/*
 * This file contains common function used in other resolver
 * Arif Khan 2018-03-28;
 *
 */

const axios = require('axios');
const Sequelize = require('sequelize');

const Op = Sequelize.Op;
const constant = require('./constant');
const activityTaskValidation = require('../validation/activityTaskValidation');
const {
    fileStorageServerLink,
    multiDBApiServerLink
} = require('../config/index').microservicesLinks;

const commonValidation = require('../validation/commonValidation');
const model = require('.././models');

module.exports = {
    getCrmModelById: async (id, model, include, responseKey) => {
        const filter = {
            include: include,
            where: {
                id: id,
                is_deleted: 0
            }
        };
        const modelObj = await model.findOne(filter);
        if (modelObj) {
            const result = {
                message: constant.SUCCESS
            };
            result[responseKey] = modelObj;
            return result;
        } else {
            throw new Error(constant.DOES_NOT_EXIST);
        }
    },
    getCrmModelListByPage: async (args, model, include, responseKey) => {
        const whereCondition = {
            is_deleted: 0
        };
        if (args.input.filter) {
            try {
                console.log('----------------------------------filter-------------------------------------');
                console.log(args.input.filter);
                args.input.filter = JSON.parse(args.input.filter);
                Object.keys(args.input.filter).forEach(key => {
                    if (/[A-Z]/.test(key[0])) {
                        const filterModel = include.find(e => e instanceof Object && key === e.model.name);
                        if (filterModel) {
                            if (filterModel.where) {
                                Object.assign(filterModel.where, args.input.filter[key]);
                            } else {
                                filterModel.where = args.input.filter[key];
                            }
                        }
                        delete args.input.filter[key];
                    }
                });
                Object.assign(whereCondition, args.input.filter);
            } catch (err) {
                console.log('Invalid filter object');
            }
        }
        const totalCounts = await model.findAndCountAll({
            where: whereCondition
        });
        let filter = {
            include: include,
            where: whereCondition,
            limit: args.input.pageSize,
            offset: args.input.pageSize * (args.input.currentPage - 1),
            order: [
                [args.input.sortField, args.input.sortDirection]
            ]
        };
        const crmObjList = await model.findAll(filter);
        const result = {
            message: constant.SUCCESS,
            pageInfo: {
                totalCounts: totalCounts.count,
                totalPages: Math.ceil(totalCounts.count / args.input.pageSize),
                currentPage: args.input.currentPage,
                pageSize: args.input.pageSize,
                sortField: args.input.sortField,
                sortDirection: args.input.sortDirection
            }
        };
        result[responseKey] = crmObjList;
        return result;
    },
    updateModelAddress: async (Addresses, model, modelObj) => {
        return await Promise.all(Addresses.map(async (e) => {
            if (e.id) {
                const addressObj = modelObj.Addresses.find(addressObj => {
                    return addressObj.id === e.id;
                });
                if (addressObj) {
                    delete e.id;
                    Object.keys(e).forEach(key => {
                        addressObj[key] = e[key];
                    });
                    await addressObj.save();
                    return true;
                }
                return false;
            } else {
                const addressObj = await model.Address.create(e);
                await modelObj.addAddress(addressObj);
                return true;
            }
        }));
    },
    deleteModelById: async (id, model, deleteBy) => {
        const modelObj = await model.update({
            deleted_at: new Date(),
            is_deleted: 1,
            deleted_by: deleteBy
        }, {
                where: {
                    id: id,
                    is_deleted: 0
                }
            });
        if (!modelObj[0]) {
            throw new Error(constant.DOES_NOT_EXIST);
        }
        return {
            id: id,
            message: constant.SUCCESS
        }
    },

    deleteMinioFileById: async (miniosFileIds) => {
        const objAttachment = {};
        console.log(miniosFileIds);

        // sending request to file storage API to get l                  
        if (process.env.FILE_STORAGE_MANAGER_SERVICE_HOST && process.env.FILE_STORAGE_MANAGER_SERVICE_PORT) {
            let attachmentFilesUrl = await axios.post(fileStorageServerLink + 'file-delete', {
                files: miniosFileIds
            });
            // check errors
            if (attachmentFilesUrl.data.errors.length > 0) {
                throw new Error(attachmentFilesUrl.data.errors);
            }
            objAttachment.message = constant.SUCCESS;
        }
        return objAttachment;
    },
    addAddressName: async (Addresses) => {
        if (!Addresses || !Addresses.length) {
            return [];
        }
        //Addresses = JSON.parse(JSON.stringify(Addresses));
        const addressIdList = {
            city_id: new Set(),
            state_id: new Set(),
            country_id: new Set()
        };
        Addresses.forEach(address => {
            if (address.city) addressIdList.city_id.add(address.city);
            if (address.state_province) addressIdList.state_id.add(address.state_province);
            if (address.country) addressIdList.country_id.add(address.country);
        });
        addressIdList.city_id = [...addressIdList.city_id];
        addressIdList.state_id = [...addressIdList.state_id];
        addressIdList.country_id = [...addressIdList.country_id];
        if (process.env.MULTI_DB_SERVICE_HOST && process.env.MULTI_DB_SERVICE_PORT) {
            const addressResult = await axios.post(multiDBApiServerLink + 'getBulkDataByID', addressIdList);
            if (addressResult.data.errors) {
                throw new Error(addressResult.data.errors);
            }
            if (addressResult.data && addressResult.data.length) {
                const addressData = addressResult.data[0];
                Addresses.forEach(address => {
                    if (address.city) {
                        const city = addressData.city.find(city => address.city === city.id);
                        address.city_name = city.name;
                    }
                    if (address.state_province) {
                        const state = addressData.state.find(state => address.state_province === state.id);
                        address.state_province_name = state.name;
                    }
                    if (address.country) {
                        const country = addressData.country.find(country => address.country === country.id);
                        address.country_name = country.country_name;
                    }
                })
            }

        }
        return Addresses;
    },
    createActivityTask: async (args, context, responseKey, model) => {
        const errors = activityTaskValidation.validateCreateActivityTask(args.input);
        if (errors.error) {
            throw new Error(errors.error.details[0].message);
        }
        args.input.created_by = context.user.id;
        const modelIncludes = [{
            model: model.ActivityTaskLink
        }];
        switch (args.input.recurrence_type) {
            case 'daily':
                modelIncludes.push({
                    model: model.RecurrenceDaily,
                    as: 'Daily',
                    required: false
                });
                break;
            case 'monthly':
                modelIncludes.push({
                    model: model.RecurrenceMonthly,
                    as: 'Monthly',
                    required: false
                });
                break;
            case 'weekly':
                modelIncludes.push({
                    model: model.RecurrenceWeekly,
                    as: 'Weekly',
                    required: false
                });
                break;
            case 'yearly':
                modelIncludes.push({
                    model: model.RecurrenceYearly,
                    as: 'Yearly',
                    required: false
                });
                break;
        }
        const activityTaskObj = await model.ActivityTask.create(args.input, {
            include: modelIncludes
        });
        return {
            message: constant.SUCCESS
        };
    },
    updateActivityTask: async (args, context, responseKey, modelIncludes, referenceKey, model) => {
        const errors = activityTaskValidation.validateEditActivityTask(args.input);
        if (errors.error) {
            throw new Error(errors.error.details[0].message);
        }
        const activityTaskId = args.input.id;
        delete args.input.id;
        const activityTaskObj = await model.ActivityTask.findOne({
            include: modelIncludes,
            where: {
                id: activityTaskId,
                is_deleted: 0
            }
        });
        if (activityTaskObj) {
            const modelIncludes = [];
            const deleteOption = {
                deleted_at: new Date(),
                is_deleted: 1
            };
            const deleteCondition = {
                where: {
                    is_deleted: 0
                }
            };
            deleteCondition.where[referenceKey] = activityTaskObj.id;
            switch (activityTaskObj.recurrence_type) {
                case 'daily':
                    await model.RecurrenceDaily.update(deleteOption, deleteCondition);
                    delete activityTaskObj.daily;
                    break;
                case 'monthly':
                    await model.RecurrenceMonthly.update(deleteOption, deleteCondition);
                    delete activityTaskObj.monthly;
                    break;
                case 'weekly':
                    await model.RecurrenceWeekly.update(deleteOption, deleteCondition);
                    delete activityTaskObj.weekly;
                    break;
                case 'yearly':
                    await model.RecurrenceYearly.update(deleteOption, deleteCondition);
                    delete activityTaskObj.yearly;
                    break;
            }
            switch (args.input.recurrence_type) {
                case 'daily':
                    args.input.daily[0][referenceKey] = activityTaskObj.id;
                    args.input.daily[0] = await model.RecurrenceDaily.create(args.input.daily[0]);
                    break;
                case 'monthly':
                    args.input.monthly[0][referenceKey] = activityTaskObj.id;
                    args.input.monthly[0] = await model.RecurrenceMonthly.create(args.input.monthly[0]);
                    break;
                case 'weekly':
                    args.input.weekly[0][referenceKey] = activityTaskObj.id;
                    args.input.weekly[0] = await model.RecurrenceWeekly.create(args.input.weekly[0]);
                    break;
                case 'yearly':
                    args.input.yearly[0][referenceKey] = activityTaskObj.id;
                    args.input.yearly[0] = await model.RecurrenceYearly.create(args.input.yearly[0]);
                    break;
            }
            args.input.updated_by = context.user.id;
            Object.keys(args.input).forEach((e) => {
                activityTaskObj[e] = args.input[e];
            });
            await activityTaskObj.save();
        } else {
            throw new Error(constant.DOES_NOT_EXIST);
        }
        const result = {
            message: constant.SUCCESS
        };
        result[responseKey] = activityTaskObj;
        return result;
    },
    updateActivityEvent: async (args, context, responseKey, referenceKey, model) => {
        const activityEventId = args.input.id;
        const Participants = args.input.Participants;
        delete args.input.id;
        delete args.input.Participants;
        const activityEventObj = await model.ActivityEvent.findOne({
            include: [{
                model: model.ActivityEventParticipant,
                as: 'Participants',
                required: false,
                where: {
                    is_deleted: 0
                }
            }],
            where: {
                id: activityEventId,
                is_deleted: 0
            }
        });
        if (activityEventObj) {
            args.input.updated_by = context.user.id;
            Object.keys(args.input).forEach((e) => {
                activityEventObj[e] = args.input[e];
            });
            await activityEventObj.save();
            if (Participants && Participants.length) {
                const participantIdList = Participants.map(participantObj => participantObj.participant_id);
                await model.ActivityEventParticipant.update({
                    deleted_at: new Date(),
                    is_deleted: 1
                }, {
                        where: {
                            is_deleted: 0,
                            [referenceKey]: activityEventObj.id,
                            participant_id: {
                                [Op.notIn]: participantIdList
                            }
                        }
                    });
                const participantObjList = participantIdList.map(id => {
                    return model.ActivityEventParticipant.findOrCreate({
                        where: {
                            is_deleted: 0,
                            [referenceKey]: activityEventObj.id,
                            participant_id: id
                        }
                    });
                });
                activityEventObj.Participants = await Promise.all(participantObjList);
                activityEventObj.Participants = activityEventObj.Participants.map(participant => participant[0]);
            } else {
                await model.ActivityEventParticipant.update({
                    deleted_at: new Date(),
                    is_deleted: 1
                }, {
                        where: {
                            is_deleted: 0,
                            [referenceKey]: activityEventObj.id
                        }
                    });
            }
        } else {
            throw new Error(constant.DOES_NOT_EXIST);
        }
        return {
            [responseKey]: activityEventObj,
            message: constant.SUCCESS
        }
    },

    assignCrmCampaignsToModel: async (obj, args, context, info) => {
        arrErrors = commonValidation.validateCampaignAssignmentInput(args.input); // validation for Lead input data
        //arrErrors.error = null;
        if (arrErrors.error != null) {
            throw new Error(arrErrors.error.details[0].message);
        } else {
            try {
                const objCampaignAssignment = await model.CampaignLink.bulkCreate(args.input);

                objCampaignAssignment.message = "Campaigns assigned successfully!";
                return objCampaignAssignment;

            } catch (err) {
                throw new Error(err);
            }
        }
    }, // end of  assignCrmCampaignsToModel resolver

    updateCrmCampaignStatusForModel: async (obj, args, context, info) => {
        arrErrors = commonValidation.validateCampaignAssignmentInput(args.input); // validation for Lead input data
        //arrErrors.error = null;
        if (arrErrors.error != null) {
            throw new Error(arrErrors.error.details[0].message);
        } else {
            try {
                let objCampaignAssignment = {};
                args.input.forEach(async obj => {
                    objCampaignAssignment = await model.CampaignLink.update({
                        id_crm_campaign_status_master: obj.id_crm_campaign_status_master
                    }, {
                            where: {
                                model_name: obj.model_name,
                                model_id: obj.model_id,
                                id_crm_campaign: obj.id_crm_campaign
                            }
                        });
                });

                objCampaignAssignment.message = "Campaign member status updated successfully!";
                return objCampaignAssignment;

            } catch (err) {
                throw new Error(err);
            }
        }
    } // end of  updateCrmCampaignStatusForModel resolver
}