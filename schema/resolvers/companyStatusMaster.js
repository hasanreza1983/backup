/*
 * This Resolver File belongs to the CompanyStatusMaster type
 * Hasan Reza 2018-03-30;
 *
 */

const model = require('../../models');

module.exports = {
    Query: {
        getCrmCompanyStatusMasterList: async (obj, args, context, info) => {
            const objCompanyStatusMaster = await model.CompanyStatusMaster.findAll();
            return objCompanyStatusMaster;
        }
    }
}