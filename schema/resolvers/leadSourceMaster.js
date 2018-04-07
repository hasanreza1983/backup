/*
 * This Resolver File belongs to the CrmLeadSourceMaster type
 * Hasan Reza 2018-03-30;
 *
 */

const model = require('../../models');

module.exports = {
    Query: {
        getCrmLeadSourceMasterList: async (obj, args, context, info) => {
            const objCrmLeadSourceMasters = await model.LeadSourceMaster.findAll();
            return objCrmLeadSourceMasters;
        }
    }
}