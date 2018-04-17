/*
 * This Resolver File belongs to the CampaignTypeMaster type
 * Hasan Reza 2018-03-30;
 *
 */

const model = require('../../models');

module.exports = {
    Query: {
        getCrmCampaignTypeMasterList: async (obj, args, context, info) => {
            const objCampaignTypeMaster = await model.CampaignTypeMaster.findAll();
            return objCampaignTypeMaster;
        }
    }
}