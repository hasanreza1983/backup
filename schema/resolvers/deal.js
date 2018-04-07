/*
 * This Resolver File belongs to the CrmDeal type
 * Hasan Reza 2018-04-05;
 *
 */
const model = require('../../models');
const validation = require('../../validation/dealValidation');
const common = require('../../lib/commonResolver');
const Op = model.Sequelize.Op;
const ownerList = require('../resolvers/owner');
let message = '';
module.exports = {
    Query: {
        getCrmDealById: async (obj, args, context, info) => {
            const response = await common.getCrmModelById(args.id, model.Deal, [
                { model: model.Campaign },
                { model: model.Company },
                {
                    model: model.Contact,
                    include: [
                        { model: model.LeadContactParent }
                    ]
                },
                { model: model.LeadSourceMaster },
                { model: model.PipelineStage }
            ], 'Deal');
            return response;

        }, // end of getCrmDealById resolver

        getAllCrmDeal: async (obj, args, context, info) => {
            let where = {};
            let whereConditions = args.whereConditions + "";  // Mixed Conditions for the query in JSON string

            if (whereConditions) {
                whereConditions = JSON.stringify(whereConditions);
                whereConditions = whereConditions.replace(/"/g, '');
                whereConditions = whereConditions.replace(/'/g, '"');
                whereConditions = JSON.parse(whereConditions);
                where = Object.assign({}, where, whereConditions);
            }
            let filterFindAll = {
                where: where
            };
            const objDeals = await model.Deal.findAll(filterFindAll);  // End of model query
            objDeals.Deals = objDeals;

            if (objDeals) {
                objDeals.CrmDeals = objDeals;
                objDeals.message = "The whole selection was successful";
                return objDeals;
            } else {
                throw new Error("No Deal data exists");
            }
        }, // end of getAllCrmDeal resolver

        getCrmDealListByPage: async (obj, args, context, info) => {

            const response = await common.getCrmModelListByPage(args, model.Deal, [
                { model: model.Campaign },
                { model: model.Company },
                {
                    model: model.Contact,
                    include: [
                        { model: model.LeadContactParent }
                    ]
                },
                { model: model.LeadSourceMaster },
                { model: model.PipelineStage }
            ], 'Deals');
            return response;
        } // end of getAllCrmDealList resolver

    }, // end of query

    Mutation: {
        createCrmDeal: async (obj, args, context, info) => {
            // Prepare array to validate fields
            let objDeal = [];
            let arrErrors = [];
            let responseStatus = [];

            let owner = '';
            if (context.user.id) {
                owner = context.user.id;
                args.input.created_by = context.user.id;
                args.input.owner = context.user.id;
            }
            arrErrors = validation.validateCreateInput(args.input); // validation for CrmDeal input data
            // arrErrors.error = null;
            if (arrErrors.error != null) {
                throw new Error(arrErrors.error.details[0].message);
            } else {
                let filter = {
                    include: [
                        { model: model.Campaign },
                        { model: model.Company },
                        { model: model.Contact, required: false },
                        { model: model.LeadSourceMaster },
                        { model: model.PipelineStage }],
                    where: {
                        id: args.input.id,

                        is_deleted: 0
                    },
                    defaults: args.input
                };
                const objDeal = await model.Deal.findOrCreate(filter)
                    .spread((result, is_created) => {
                        if (is_created) {
                            message = "The create was successful";
                            return result.dataValues;
                        } else {
                            return result.updateAttributes(args.input).then(function (updated) {
                                message = "The update was successful";
                                return updated;
                            });
                        }
                    });

                objDeal.Deal = objDeal;
                objDeal.message = message;
                return objDeal;
            }
        }, // end of createDeal resolver

        updateCrmDeal: async (obj, args, context, info) => {
            // Prepare array to validate fields
            let objDeal = [];
            let arrErrors = [];
            let responseStatus = [];

            let owner = '';
            if (context.user.id) {
                owner = context.user.id;
                args.input.updated_by = context.user.id;
                args.input.owner = context.user.id;
            }

            arrErrors = validation.validateUpdateInput(args.input); // validation for Deal input data
            // arrErrors.error = null;
            if (arrErrors.error != null) {
                throw new Error(arrErrors.error.details[0].message);
            } else {
                const objDeal = await model.Deal.findOne({
                    where: {
                        id: args.input.id,
                        is_deleted: 0
                    }
                });
                if (objDeal) {
                    let isUpdated = await model.Deal.update(args.input, {
                        where: {
                            id: args.input.id,
                            is_deleted: 0
                        }
                    });
                    if (isUpdated) {

                        message = "The update was successful with ID " + args.input.id;
                    }
                } else {
                    throw new Error("ID does not exist!");
                }
            }

            objDeal.Deal = objDeal;
            objDeal.message = message;
            return objDeal;

        }, // end of  updateCrmDeal resolver

        deleteCrmDealById: async (obj, args, context, info) => {
            return await common.deleteModelById(args.id, model.Deal, context.user.id);
        } // end of  deleteCrmDealById resolver
    } // end of mutation
}