/*
 * This Resolver File belongs to the PipelineStage type
 * Hasan Reza 2018-03-30;
 *
 */

const model = require('../../models');

module.exports = {
    Query: {
        getCrmPipelineStageList: async (obj, args, context, info) => {
            const objPipelineStage = await model.PipelineStage.findAll();
            return objPipelineStage;
        }
    }
}