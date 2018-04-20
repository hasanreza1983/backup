/*
 * This Resolver File belongs to the CrmDeal type
 * Hasan Reza 2018-04-05;
 *
 */
const model = require('../../models');
const constant = require('../../lib/constant');
const common = require('../../lib/commonResolver');
const dealValidation = require('../../validation/dealValidation');

module.exports = {
    Query: {
        getCrmDealById: async (obj, args, context, info) => {
            const response = await common.getCrmModelById(args.id, model.Deal, [{
                    model: model.Campaign
                },
                {
                    model: model.Company
                },
                {
                    model: model.Contact,
                    include: [{
                        model: model.LeadContactParent
                    }]
                },
                {
                    model: model.LeadSourceMaster
                },
                {
                    model: model.PipelineStage
                }
            ], 'Deal');
            return response;

        }, // end of getCrmDealById resolver

        getCrmDealListByPage: async (obj, args, context, info) => {

            const response = await common.getCrmModelListByPage(args, model.Deal, [{
                    model: model.Campaign
                },
                {
                    model: model.Company
                },
                {
                    model: model.Contact,
                    include: [{
                        model: model.LeadContactParent
                    }]
                },
                {
                    model: model.LeadSourceMaster
                },
                {
                    model: model.PipelineStage
                }
            ], 'Deals');
            return response;
        } // end of getAllCrmDealList resolver

    }, // end of query

    Mutation: {
        createCrmDeal: async (obj, args, context, info) => {
            const arrErrors = dealValidation.validateInput(args.input); // validation for CrmDeal input data
            if (arrErrors.error) {
                throw new Error(arrErrors.error.details[0].message);
            }
            args.input.created_by = context.user.id;
            const objDeal = await model.Deal.create(args.input);
            objDeal.Deal = objDeal;
            objDeal.message = constant.SUCCESS;
            return objDeal;
        }, // end of createDeal resolver

        updateCrmDeal: async (obj, args, context, info) => {
            const arrErrors = dealValidation.validateInput(args.input); // validation for Deal input data
            if (arrErrors.error) {
                throw new Error(arrErrors.error.details[0].message);
            }
            args.input.updated_by = context.user.id;
            await model.Deal.update(args.input, {
                where: {
                    id: args.id,
                    is_deleted: 0
                }
            });
            return {
                message: constant.SUCCESS
            };
        }, // end of  updateCrmDeal resolver

        deleteCrmDealById: async (obj, args, context, info) => {
            return await common.deleteModelById(args.id, model.Deal, context.user.id);
        } // end of  deleteCrmDealById resolver
    } // end of mutation
}