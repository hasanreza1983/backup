/*
 * This Resolver File belongs to the CompanyOwnershipMaster type
 * Hasan Reza 2018-03-30;
 *
 */

const model = require('../../models');

module.exports = {
    Query: {
        getCrmCompanyOwnershipMasterList: async (obj, args, context, info) => {
            const objCompanyOwnershipMaster = await model.CompanyOwnershipMaster.findAll();
            return objCompanyOwnershipMaster;
        }
    }
}