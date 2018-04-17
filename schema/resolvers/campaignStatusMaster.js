/*
 * This Resolver File belongs to the CampaignStatusMaster Status
 * Hasan Reza 2018-03-30;
 *
 */
const model = require('../../models');
module.exports = {
    Query: {
        getCrmCampaignStatusMasterList: async (obj, args, context, info) => {
            const objCampaignStatusMaster = await model.CampaignStatusMaster.findAll();
            return objCampaignStatusMaster;
        }
    }
}