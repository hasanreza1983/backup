/*
 * This Resolver File belongs to the LeadActivityTask type
 * Arif Khan 2018-03-14;
 *
 */

const model = require('../../models');
const constant = require('../../lib/constant');
const common = require('../../lib/commonResolver');
const activityTaskValidation = require('../../validation/activityTaskValidation');

const modelIncludes = [{
        model: model.LeadRecurrenceDaily,
        as: 'daily',
        required: false,
        where: {
            is_deleted: 0
        }
    },
    {
        model: model.LeadRecurrenceMonthly,
        as: 'monthly',
        required: false,
        where: {
            is_deleted: 0
        }
    },
    {
        model: model.LeadRecurrenceWeekly,
        as: 'weekly',
        required: false,
        where: {
            is_deleted: 0
        }
    },
    {
        model: model.LeadRecurrenceYearly,
        as: 'yearly',
        required: false,
        where: {
            is_deleted: 0
        }
    }
];

module.exports = {
    Query: {
        getCrmLeadActivityTaskById: async (obj, args, context, info) => {
            return await common.getCrmModelById(args.id, model.LeadActivityTask, modelIncludes, 'LeadActivityTask');
        },
        getCrmLeadActivityTaskListByPage: async (obj, args, context, info) => {
            return await common.getCrmModelListByPage(args, model.LeadActivityTask, modelIncludes, 'LeadActivityTasks');
        }
    },
    Mutation: {
        createCrmLeadActivityTask: async (obj, args, context, info) => {
            return await common.createActivityTask(args, context, 'LeadActivityTask', {
                ActivityTask: model.LeadActivityTask,
                RecurrenceDaily: model.LeadRecurrenceDaily,
                RecurrenceMonthly: model.LeadRecurrenceMonthly,
                RecurrenceWeekly: model.LeadRecurrenceWeekly,
                RecurrenceYearly: model.LeadRecurrenceYearly
            });
        },
        updateCrmLeadActivityTask: async (obj, args, context, info) => {
            return await common.updateActivityTask(args, context, 'LeadActivityTask', modelIncludes, 'id_crm_lead_activity_task', {
                ActivityTask: model.LeadActivityTask,
                RecurrenceDaily: model.LeadRecurrenceDaily,
                RecurrenceMonthly: model.LeadRecurrenceMonthly,
                RecurrenceWeekly: model.LeadRecurrenceWeekly,
                RecurrenceYearly: model.LeadRecurrenceYearly
            });
        },
        deleteCrmLeadActivityTaskById: async (obj, args, context, info) => {
            return await common.deleteModelById(args.id, model.LeadActivityTask, context.user.id);
        }
    }
}