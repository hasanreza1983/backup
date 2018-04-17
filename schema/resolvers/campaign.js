/*
 * This Resolver File belongs to the Campaign type
 * Hasan Reza 2018-04-05;
 *
 */
const model = require('../../models');
const validation = require('../../validation/campaignValidation');
const common = require('../../lib/commonResolver');
const constant = require('../../lib/constant');
module.exports = {
    Query: {
        getCrmCampaignById: async (obj, args, context, info) => {
            const response = await common.getCrmModelById(args.id, model.Campaign, [
                {
                    model: model.Lead, required: false,
                    include: [{
                        model: model.LeadContactParent
                    }]
                },
                {
                    model: model.Contact, required: false,
                    include: [{
                        model: model.LeadContactParent
                    }]
                },
                { model: model.Deal, required: false }
            ], 'Campaign');

            return response;

        }, // end of getCrmCampaignById resolver

        getCrmCampaignList: async (obj, args, context, info) => {
            let result = await model.Campaign.findAll({
                where: {
                    is_deleted: 0
                },
                attributes: ['id', ['campaign_name', 'name']]
            });
            result = JSON.parse(JSON.stringify(result));
            return {
                result,
                message: constant.SUCCESS
            }
        },

        getCrmCampaignListByPage: async (obj, args, context, info) => {

            const response = await common.getCrmModelListByPage(args, model.Campaign, [
                { model: model.CampaignTypeMaster }
            ], 'Campaigns');

            return response;

        } // end of getAllCrmCampaignList resolver

    }, // end of query

    Mutation: {
        createCrmCampaign: async (obj, args, context, info) => {
            // Prepare array to validate fields
            let objCrmCampaign = [];
            let arrErrors = [];
            let responseStatus = [];

            let owner = '';
            if (context.user.id) {
                owner = context.user.id;
                args.input.created_by = context.user.id;
                args.input.owner = context.user.id;
            }

            arrErrors = validation.validateCreateInput(args.input); // validation for CrmCampaign input data
            // arrErrors.error = null;
            if (arrErrors.error != null) {
                throw new Error(arrErrors.error.details[0].message);
            } else {

                let filter = {
                    where: {
                        id: args.input.id,
                        is_deleted: 0
                    },
                    defaults: args.input
                };

                const objCrmCampaign = await model.Campaign.findOrCreate(filter)
                    .spread((result, is_created) => {
                        if (is_created) {
                            return result.dataValues;
                        } else {
                            return result.updateAttributes(args.input).then(function (updated) {
                                return updated;
                            });
                        }
                    });

                //  objCrmCampaign.Campaign = objCrmCampaign;
                objCrmCampaign.message = constant.SUCCESS;
                return objCrmCampaign;

            }
        }, // end of createCrmCampaign resolver

        updateCrmCampaign: async (obj, args, context, info) => {

            // Prepare array to validate fields
            let objCrmCampaign = [];
            let arrErrors = [];
            let responseStatus = [];

            let owner = '';
            if (context.user.id) {
                owner = context.user.id;
                args.input.updated_by = context.user.id;
                args.input.owner = context.user.id;
            }

            arrErrors = validation.validateUpdateInput(args.input); // validation for CrmCampaign input data
            // arrErrors.error = null;
            if (arrErrors.error != null) {
                throw new Error(arrErrors.error.details[0].message);
            } else {
                const objCrmCampaign = await model.Campaign.findOne({
                    where: {
                        id: args.input.id,
                        is_deleted: 0
                    }
                });

                if (objCrmCampaign) {
                    let isUpdated = await model.Campaign.update(args.input, {
                        where: {
                            id: args.input.id,
                            is_deleted: 0
                        }
                    });

                } else {
                    throw new Error(constant.DOES_NOT_EXIST);
                }
            }

            //  objCrmCampaign.Campaign = objCrmCampaign;
            objCrmCampaign.message = constant.SUCCESS;
            return objCrmCampaign;

        }, // end of  updateCrmCampaign resolver

        deleteCrmCampaignById: async (obj, args, context, info) => {
            return await common.deleteModelById(args.id, model.Campaign, context.user.id);
        } // end of  deleteCrmCampaignById resolver
    } // end of mutation
}