/*
 * This Resolver File belongs to the IndustryMaster type
 * Hasan Reza 2018-03-30;
 *
 */

const model = require('../../models');

module.exports = {
    Query: {
        getCrmIndustryMasterList: async (obj, args, context, info) => {
            const objIndustryMaster = await model.IndustryMaster.findAll();
            return objIndustryMaster;
        }
    }
}