/*
 * This Resolver File belongs to the ActivityTask type
 * Arif Khan 2018-03-14;
 *
 */

const model = require('../../models');
const constant = require('../../lib/constant');
const common = require('../../lib/commonResolver');
const activityTaskValidation = require('../../validation/activityTaskValidation');

const modelIncludes = [{
        model: model.RecurrenceDaily,
        as: 'Daily',
        required: false,
        where: {
            is_deleted: 0
        }
    },
    {
        model: model.RecurrenceMonthly,
        as: 'Monthly',
        required: false,
        where: {
            is_deleted: 0
        }
    },
    {
        model: model.RecurrenceWeekly,
        as: 'Weekly',
        required: false,
        where: {
            is_deleted: 0
        }
    },
    {
        model: model.RecurrenceYearly,
        as: 'Yearly',
        required: false,
        where: {
            is_deleted: 0
        }
    },
    {
        model: model.ActivityTaskLink,
        required: false,
    }
];

module.exports = {
    Query: {
        getCrmActivityTaskById: async (obj, args, context, info) => {
            return await common.getCrmModelById(args.id, model.ActivityTask, modelIncludes);
        }
    },
    Mutation: {
        createCrmActivityTask: async (obj, args, context, info) => {
            const errors = activityTaskValidation.validateCreateActivityTask(args.input);
            if (errors.error) {
                throw new Error(errors.error.details[0].message);
            }
            args.input.created_by = context.user.id;
            const modelIncludes = [{
                model: model.ActivityTaskLink
            }];
            switch (args.input.recurrence_type) {
                case 'daily':
                    modelIncludes.push({
                        model: model.RecurrenceDaily,
                        as: 'Daily',
                        required: false
                    });
                    break;
                case 'monthly':
                    modelIncludes.push({
                        model: model.RecurrenceMonthly,
                        as: 'Monthly',
                        required: false
                    });
                    break;
                case 'weekly':
                    modelIncludes.push({
                        model: model.RecurrenceWeekly,
                        as: 'Weekly',
                        required: false
                    });
                    break;
                case 'yearly':
                    modelIncludes.push({
                        model: model.RecurrenceYearly,
                        as: 'Yearly',
                        required: false
                    });
                    break;
            }
            const activityTaskObj = await model.ActivityTask.create(args.input, {
                include: modelIncludes
            });
            return {
                message: constant.SUCCESS
            };
        },
        updateCrmActivityTask: async (obj, args, context, info) => {
            const errors = activityTaskValidation.validateEditActivityTask(args.input);
            if (errors.error) {
                throw new Error(errors.error.details[0].message);
            }
            const activityTaskId = args.input.id;
            delete args.input.id;
            const activityTaskObj = await model.ActivityTask.findOne({
                where: {
                    id: activityTaskId,
                    is_deleted: 0
                }
            });
            if (activityTaskObj) {
                const modelIncludes = [];
                const deleteOption = {
                    deleted_at: new Date(),
                    is_deleted: 1
                };
                const deleteCondition = {
                    where: {
                        is_deleted: 0,
                        id_crm_activity_task: activityTaskObj.id
                    }
                };
                switch (activityTaskObj.recurrence_type) {
                    case 'daily':
                        await model.RecurrenceDaily.update(deleteOption, deleteCondition);
                        break;
                    case 'monthly':
                        await model.RecurrenceMonthly.update(deleteOption, deleteCondition);
                        break;
                    case 'weekly':
                        await model.RecurrenceWeekly.update(deleteOption, deleteCondition);
                        break;
                    case 'yearly':
                        await model.RecurrenceYearly.update(deleteOption, deleteCondition);
                        break;
                }
                switch (args.input.recurrence_type) {
                    case 'daily':
                        args.input.Daily[0].id_crm_activity_task = activityTaskObj.id;
                        args.input.Daily[0] = await model.RecurrenceDaily.create(args.input.Daily[0]);
                        break;
                    case 'monthly':
                        args.input.Monthly[0].id_crm_activity_task = activityTaskObj.id;
                        args.input.Monthly[0] = await model.RecurrenceMonthly.create(args.input.Monthly[0]);
                        break;
                    case 'weekly':
                        args.input.Weekly[0].id_crm_activity_task = activityTaskObj.id;
                        args.input.Weekly[0] = await model.RecurrenceWeekly.create(args.input.Weekly[0]);
                        break;
                    case 'yearly':
                        args.input.Yearly[0].id_crm_activity_task = activityTaskObj.id;
                        args.input.Yearly[0] = await model.RecurrenceYearly.create(args.input.Yearly[0]);
                        break;
                }
                args.input.updated_by = context.user.id;
                Object.keys(args.input).forEach((e) => {
                    activityTaskObj[e] = args.input[e];
                });
                await model.ActivityTaskLink.destroy({
                    where: {
                        id_crm_activity_task: activityTaskObj.id
                    }
                })
                args.input.ActivityTaskLinks.forEach(activityTaskLink => {
                    if (activityTaskLink) {
                        activityTaskLink.id_crm_activity_task = activityTaskObj.id;
                    }
                });
                await model.ActivityTaskLink.bulkCreate(args.input.ActivityTaskLinks);
                await activityTaskObj.save();
            } else {
                throw new Error(constant.DOES_NOT_EXIST);
            }
            return {
                message: constant.SUCCESS
            };
        },
        deleteCrmActivityTaskById: async (obj, args, context, info) => {
            return await common.deleteModelById(args.id, model.ActivityTask, context.user.id);
        }
    }
}