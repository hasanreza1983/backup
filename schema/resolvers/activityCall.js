/*
 * This Resolver File belongs to the ActivityCall type
 * Arif Khan 2018-04-16;
 *
 */

const model = require('../../models');
const constant = require('../../lib/constant');
const common = require('../../lib/commonResolver');
const activityCallValidation = require('../../validation/activityCallValidation');

const modelIncludes = [
    {
        model: model.ActivityCallLink,
        required: false,
    }
];

module.exports = {
    Query: {
        getCrmActivityCallById: async (obj, args, context, info) => {
            return await common.getCrmModelById(args.id, model.ActivityCall, modelIncludes);
        }
    },
    Mutation: {
        createCrmActivityCall: async (obj, args, context, info) => {
            const errors = activityCallValidation(args.input);
            if (errors.error) {
                throw new Error(errors.error.details[0].message);
            }
            args.input.created_by = context.user.id;
            const companyActivityCallObj = await model.ActivityCall.create(args.input, {
                include: modelIncludes
            });
            return {
                result: companyActivityCallObj,
                message: constant.SUCCESS
            }
        },
        updateCrmActivityCall: async (obj, args, context, info) => {
            const errors = activityCallValidation(args.input);
            if (errors.error) {
                throw new Error(errors.error.details[0].message);
            }
            const result = await model.ActivityCall.update(args.input, {
                where: {
                    id: args.id,
                    is_deleted: 0
                }
            });
            return {
                message: constant.SUCCESS
            };
        },
        deleteCrmActivityCallById: async (obj, args, context, info) => {
            return await common.deleteModelById(args.id, model.ActivityCall, context.user.id);
        }
    }
}