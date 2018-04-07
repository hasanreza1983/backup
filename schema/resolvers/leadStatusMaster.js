/*
 * This Resolver File belongs to the LeadStatusMaster type
 * Hasan Reza 2018-03-30;
 *
 */

const model = require('../../models');

module.exports = {
    Query: {
        getCrmLeadStatusMasterList: async (obj, args, context, info) => {
            const objLeadStatusMaster = await model.LeadStatusMaster.findAll();
            return objLeadStatusMaster;
        }
    }
}