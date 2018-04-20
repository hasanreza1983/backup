/*
 * This Resolver File belongs to the Campaign type
 * Hasan Reza 2018-04-05;
 *
 */
const model = require('../../models');
const campaignValidation = require('../../validation/campaignValidation');
const common = require('../../lib/commonResolver');
const constant = require('../../lib/constant');
module.exports = {
    Query: {
        getCrmCampaignById: async (obj, args, context, info) => {
            const response = await common.getCrmModelById(args.id, model.Campaign, [{
                    model: model.Lead,
                    required: false,
                    include: [{
                        model: model.LeadContactParent
                    }]
                },
                {
                    model: model.Contact,
                    required: false,
                    include: [{
                        model: model.LeadContactParent
                    }]
                },
                {
                    model: model.Deal,
                    required: false
                }
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
            const response = await common.getCrmModelListByPage(args, model.Campaign, [{
                model: model.CampaignTypeMaster
            }], 'Campaigns');
            return response;
        } // end of getAllCrmCampaignList resolver
    }, // end of query

    Mutation: {
        createCrmCampaign: async (obj, args, context, info) => {
            const arrErrors = campaignValidation.validateInput(args.input); // validation for CrmCampaign input data
            if (arrErrors.error) {
                throw new Error(arrErrors.error.details[0].message);
            }
            args.input.created_by = context.user.id;
            const objCrmCampaign = await model.Campaign.create(args.input);
            objCrmCampaign.Campaign = objCrmCampaign;
            objCrmCampaign.message = constant.SUCCESS;
            return objCrmCampaign;
        }, // end of createCrmCampaign resolver

        updateCrmCampaign: async (obj, args, context, info) => {
            const arrErrors = campaignValidation.validateInput(args.input); // validation for CrmCampaign input data
            if (arrErrors.error) {
                throw new Error(arrErrors.error.details[0].message);
            }
            args.input.updated_by = context.user.id;
            await model.Campaign.update(args.input, {
                where: {
                    id: args.id,
                    is_deleted: 0
                }
            });
            return {
                message: constant.SUCCESS
            };
        }, // end of  updateCrmCampaign resolver

        deleteCrmCampaignById: async (obj, args, context, info) => {
            return await common.deleteModelById(args.id, model.Campaign, context.user.id);
        } // end of  deleteCrmCampaignById resolver
    } // end of mutation
}