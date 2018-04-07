/*
 * This Resolver File belongs to the CompanyTypeMaster type
 * Hasan Reza 2018-03-30;
 *
 */

const model = require('../../models');

module.exports = {
    Query: {
        getCrmCompanyTypeMasterList: async (obj, args, context, info) => {
            const objCompanyTypeMaster = await model.CompanyTypeMaster.findAll();
            return objCompanyTypeMaster;
        }
    }
}