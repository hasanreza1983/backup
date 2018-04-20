/*
 * This Resolver File belongs to the Lead type
 * Hasan Reza 2018-03-13;
 *
 */

const model = require('../../models');
const constant = require('../../lib/constant');
const campaignAssignment = require('../../validation/campaignAssignment');

module.exports = {
    Mutation: {
        assignCrmCampaignsToModel: async (obj, args, context, info) => {
            const arrErrors = campaignAssignment.validateCampaignAssignmentInput(args.input); // validation for Lead input data
            if (arrErrors.error) {
                throw new Error(arrErrors.error.details[0].message);
            }
            const arrObj = [];
            args.input.Campaigns.forEach(campaignId => {
                const objRow = {};
                objRow.id_crm_campaign = campaignId;
                objRow.model_name = args.input.model_name;
                objRow.model_id = args.input.model_id;
                objRow.id_crm_campaign_status_master = args.input.id_crm_campaign_status_master;
                arrObj.push(objRow);
            });
            await model.CampaignLink.bulkCreate(arrObj);
            return {
                message: constant.SUCCESS
            };
        }, // end of  assignCrmCampaignsToModel resolver

        unAssignCrmCampaignsToModel: async (obj, args, context, info) => {
            const arrErrors = campaignAssignment.validateCampaignUnassignmentInput(args.input); // validation for Lead input data
            if (arrErrors.error) {
                throw new Error(arrErrors.error.details[0].message);
            }
            await model.CampaignLink.destroy({
                where: {
                    model_name: args.input.model_name,
                    model_id: args.input.model_id,
                    id_crm_campaign: args.input.Campaigns
                }
            });
            return {
                message: constant.SUCCESS
            };
        }, // end of unAssignCrmCampaignsToModel resolver

        updateCrmCampaignStatusForModel: async (obj, args, context, info) => {
            const arrErrors = campaignAssignment.validateCampaignAssignmentUpdateInput(args.input); // validation for Lead input data
            if (arrErrors.error) {
                throw new Error(arrErrors.error.details[0].message);
            }
            const isCampaignAssignmentUpdated = await model.CampaignLink.update({
                id_crm_campaign_status_master: args.input.id_crm_campaign_status_master
            }, {
                where: {
                    id_crm_campaign: args.input.id_crm_campaign,
                    model_name: args.input.model_name,
                    model_id: args.input.model_id
                }
            });
            return {
                message: constant.SUCCESS
            };
        } // end of  updateCrmCampaignStatusForModel resolver
    } // end of mutation
}