/*
 * This Resolver File belongs to the RatingMaster type
 * Hasan Reza 2018-03-30;
 *
 */

const model = require('../../models');

module.exports = {
    Query: {
        getCrmRatingMasterList: async (obj, args, context, info) => {
            const objRatingMaster = await model.RatingMaster.findAll();
            return objRatingMaster;
        }
    }
}