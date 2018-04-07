/*
 * This Resolver File belongs to the ContactActivityTask type
 * Arif Khan 2018-04-05;
 *
 */

const model = require('../../models');
const constant = require('../../lib/constant');
const common = require('../../lib/commonResolver');
const activityTaskValidation = require('../../validation/activityTaskValidation');

const modelIncludes = [{
        model: model.ContactRecurrenceDaily,
        as: 'daily',
        required: false,
        where: {
            is_deleted: 0
        }
    },
    {
        model: model.ContactRecurrenceMonthly,
        as: 'monthly',
        required: false,
        where: {
            is_deleted: 0
        }
    },
    {
        model: model.ContactRecurrenceWeekly,
        as: 'weekly',
        required: false,
        where: {
            is_deleted: 0
        }
    },
    {
        model: model.ContactRecurrenceYearly,
        as: 'yearly',
        required: false,
        where: {
            is_deleted: 0
        }
    }
];

module.exports = {
    Query: {
        getCrmContactActivityTaskById: async (obj, args, context, info) => {
            return await common.getCrmModelById(args.id, model.ContactActivityTask, modelIncludes, 'ContactActivityTask');
        },
        getCrmContactActivityTaskListByPage: async (obj, args, context, info) => {
            return await common.getCrmModelListByPage(args, model.ContactActivityTask, modelIncludes, 'ContactActivityTasks');
        }
    },
    Mutation: {
        createCrmContactActivityTask: async (obj, args, context, info) => {
            return await common.createActivityTask(args, context, 'ContactActivityTask', {
                ActivityTask: model.ContactActivityTask,
                RecurrenceDaily: model.ContactRecurrenceDaily,
                RecurrenceMonthly: model.ContactRecurrenceMonthly,
                RecurrenceWeekly: model.ContactRecurrenceWeekly,
                RecurrenceYearly: model.ContactRecurrenceYearly
            });
        },
        updateCrmContactActivityTask: async (obj, args, context, info) => {
            return await common.updateActivityTask(args, context, 'ContactActivityTask', modelIncludes, 'id_crm_contact_activity_task', {
                ActivityTask: model.ContactActivityTask,
                RecurrenceDaily: model.ContactRecurrenceDaily,
                RecurrenceMonthly: model.ContactRecurrenceMonthly,
                RecurrenceWeekly: model.ContactRecurrenceWeekly,
                RecurrenceYearly: model.ContactRecurrenceYearly
            });
        },
        deleteCrmContactActivityTaskById: async (obj, args, context, info) => {
            return await common.deleteModelById(args.id, model.ContactActivityTask, context.user.id);
        }
    }
}