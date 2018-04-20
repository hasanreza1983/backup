/*
 * This file contains common function used in other resolver
 * Arif Khan 2018-03-28;
 *
 */

const axios = require('axios');
const Sequelize = require('sequelize');

const model = require('.././models');
const constant = require('./constant');
const {
    fileStorageServerLink,
    multiDBApiServerLink
} = require('../config/index').microservicesLinks;

const Op = Sequelize.Op;

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
            result[responseKey || 'result'] = modelObj;
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
        if (args.input.currentPage < 1) {
            args.input.currentPage = 1;
        }
        if (args.input.pageSize < 1) {
            args.input.pageSize = 1;
        }
        const filter = {
            include: include,
            where: whereCondition,
            limit: args.input.pageSize,
            offset: args.input.pageSize * (args.input.currentPage - 1),
            //order: Sequelize.literal(args.input.order)
            order: [args.input.sort]
        };
        console.log('filter ', filter);
        const crmObjList = await model.findAll(filter);
        const result = {
            message: constant.SUCCESS,
            pageInfo: {
                totalCounts: totalCounts.count,
                totalPages: Math.ceil(totalCounts.count / args.input.pageSize),
                currentPage: args.input.currentPage,
                pageSize: args.input.pageSize,
                sort: args.input.sort
            }
        };
        result[responseKey || 'result'] = crmObjList;
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
        if (process.env.FILE_STORAGE_MANAGER_SERVICE_HOST && process.env.FILE_STORAGE_MANAGER_SERVICE_PORT) {
            let attachmentFilesUrl = await axios.post(fileStorageServerLink + 'file-delete', {
                files: miniosFileIds
            });
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
                });
            }
        }
        return Addresses;
    }
}