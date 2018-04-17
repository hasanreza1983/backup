/*
 * This Resolver File belongs to the TaskStatusMaster type
 * Hasan Reza 2018-03-30;
 *
 */

const model = require('../../models');

module.exports = {
    Query: {
        getCrmTaskStatusMasterList: async (obj, args, context, info) => {
            const objTaskStatusMaster = await model.TaskStatusMaster.findAll();
            return objTaskStatusMaster;
        }
    }
}