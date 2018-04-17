/*
 * This Resolver File belongs to the CrmProduct type
 * Hasan Reza 2018-04-17;
 *
 */

const model = require('../../models');
const validation = require('../../validation/productValidation');
const Op = model.Sequelize.Op;
let message = '';
module.exports = {
    Query: {
        getCrmProductById: async (obj, args, context, info) => {

            let arrErrors = [];
            arrErrors = validation.validateIDInput(args.id); // validation for CrmProduct input data
            // arrErrors.error = null;
            if (arrErrors.error != null) {
                throw new Error(arrErrors.error.details[0].message);
            } else {

                let filter = {

                    where: {
                        id: args.id,

                        is_deleted: 0
                    },
                    offset: 0,
                    limit: 1
                };

                const objCrmProduct = await model.Product.findOne(filter); // End of model query
                if (objCrmProduct) {
                    objCrmProduct.CrmProduct = objCrmProduct;
                    objCrmProduct.message = "The selection was successful with the ID " + args.id;
                    return objCrmProduct;
                } else {
                    throw new Error(" CrmProduct ID does not exist");
                }

            } // End of else block
        }, // end of getCrmProductById resolver

        getAllCrmProduct: async (obj, args, context, info) => {

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

            const objCrmProducts = await model.Product.findAll(filterFindAll);  // End of model query

            objCrmProducts.CrmProducts = objCrmProducts;

            if (objCrmProducts) {
                objCrmProducts.CrmProducts = objCrmProducts;
                objCrmProducts.message = "The whole selection was successful";
                return objCrmProducts;
            } else {
                throw new Error("No CrmProduct data exists");
            }
        }, // end of getAllCrmProduct resolver

        getCrmProductListByPage: async (obj, args, context, info) => {

            let where = {
                is_deleted: 0
            };

            let currentPage = args.input.currentPage; // current page to get records from
            let pageSize = args.input.pageSize; // number of records per page

            let sortField = args.input.sortField + "";  // field to sort on
            let sortDirection = args.input.sortDirection + ""; // field to sort by ['ASC', 'DESC']
            let filterField = args.input.filterField + "";  // field to filter on
            let filterValue = args.input.filterValue + "";  // value to be filtered

            if (filterField && filterValue) {
                where[filterField] = { like: '%' + filterValue + '%' }
            }

            let whereConditions = args.input.whereConditions + "";  // Mixed Conditions for the query in JSON string

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
            const totalCounts = await model.Product.findAndCountAll(filterFindAll);

            let totalPages = Math.ceil(totalCounts.count / pageSize);
            let offset = pageSize * (currentPage - 1);

            let filter = {

                attributes: ["id", "owner", "product_name", "product_code", "product_sku", "product_display_url", "description", "is_active"],
                where: where,
                paranoid: false, // query and loads the soft deleted records
                limit: pageSize,
                offset: offset,
                order: [
                    [sortField, sortDirection]
                ]
            };

            const objCrmProducts = await model.Product.findAll(filter);  // End of model query

            objCrmProducts.CrmProducts = objCrmProducts;

            objCrmProducts.pageInfo = {
                totalCounts: Math.ceil(totalCounts.count),
                totalPages: totalPages,
                currentPage: currentPage,
                pageSize: pageSize,
                sortField: sortField,
                sortDirection: sortDirection,
                filterField: filterField,
                filterValue: filterValue,
                whereConditions: JSON.stringify(whereConditions)
            };

            return objCrmProducts;

        } // end of getAllCrmProductList resolver

    }, // end of query

    Mutation: {
        createCrmProduct: async (obj, args, context, info) => {
            // Prepare array to validate fields
            let objCrmProduct = [];
            let arrErrors = [];
            let responseStatus = [];

            if (context.user.id) {
                args.input.updated_by = null;
            }

            arrErrors = validation.validateCreateInput(args.input); // validation for CrmProduct input data
            // arrErrors.error = null;
            if (arrErrors.error != null) {
                throw new Error(arrErrors.error.details[0].message);
            } else {

                args.input.created_by = context.user.id;

                let filter = {
                    where: {
                        id: args.input.id,
                        is_deleted: 0
                    },
                    defaults: args.input
                };

                const objCrmProduct = await model.Product.findOrCreate(filter)
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

                objCrmProduct.CrmProduct = objCrmProduct;
                objCrmProduct.message = message;
                return objCrmProduct;

            }
        }, // end of createCrmProduct resolver

        updateCrmProduct: async (obj, args, context, info) => {

            // Prepare array to validate fields
          
            let objCrmProduct = [];
            let arrErrors = [];
            let responseStatus = [];

            if (context.user.id) {
                args.input.updated_by = context.user.id;
            }

            arrErrors = validation.validateUpdateInput(args.input); // validation for CrmProduct input data
            // arrErrors.error = null;
            if (arrErrors.error != null) {
                throw new Error(arrErrors.error.details[0].message);
            } else {
                const objCrmProduct = await model.Product.findOne({
                    where: {
                        id: args.input.id,
                        is_deleted: 0
                    }
                });
                if (objCrmProduct) {
                    let isUpdated = await model.Product.update(args.input, {
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

            objCrmProduct.CrmProduct = objCrmProduct;
            objCrmProduct.message = message;
            return objCrmProduct;

        }, // end of  updateCrmProduct resolver

        deleteCrmProductById: async (obj, args, context, info) => {
            // Prepare array to validate fields
            let objCrmProduct = [];
            let arrErrors = [];
            let responseStatus = [];

            arrErrors = validation.validateIDInput(args.id); // validation for CrmProduct input data
            //arrErrors.error = null;

            if (arrErrors.error != null) {
                throw new Error(arrErrors.error.details[0].message);
            } else {

                const objCrmProduct = await model.Product.findOne({
                    where: {
                        id: args.id,

                        is_deleted: 0
                    }
                })
                if (objCrmProduct) {

                    let isCrmProductSoftDeleted = await model.Product.update({

                        deleted_at: new Date(),
                        is_deleted: 1
                    }, {
                            where: {
                                id: args.id,

                                is_deleted: 0
                            }
                        });

                    if (isCrmProductSoftDeleted) {

                        message = "The delete was successful with the ID " + args.id;
                    }
                } else {
                    throw new Error(" CrmProduct ID does not exist");
                }
            }
            objCrmProduct.CrmProduct = objCrmProduct;
            objCrmProduct.message = message;
            return objCrmProduct;
        } // end of  deleteCrmProductById resolver
    } // end of mutation
}