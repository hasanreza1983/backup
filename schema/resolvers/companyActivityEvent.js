/*
 * This Resolver File belongs to the CompanyActivityEvent type
 * Arif Khan 2018-04-06;
 *
 */

const model = require('../../models');
const constant = require('../../lib/constant');
const common = require('../../lib/commonResolver');
const activityEventValidation = require('../../validation/activityEventValidation');

const modelIncludes = [{
    model: model.CompanyActivityEventParticipant,
    as: 'Participants',
    required: false,
    where: {
        is_deleted: 0
    }
}];

module.exports = {
    Query: {
        getCrmCompanyActivityEventById: async (obj, args, context, info) => {
            return await common.getCrmModelById(args.id, model.CompanyActivityEvent, modelIncludes, 'CompanyActivityEvent');
        },
        getCrmCompanyActivityEventListByPage: async (obj, args, context, info) => {
            return await common.getCrmModelListByPage(args, model.CompanyActivityEvent, modelIncludes, 'CompanyActivityEvents');
        }
    },
    Mutation: {
        createCrmCompanyActivityEvent: async (obj, args, context, info) => {
            const errors = activityEventValidation.validateCreateActivityEvent(args.input);
            if (errors.error) {
                throw new Error(errors.error.details[0].message);
            }
            args.input.created_by = context.user.id;
            const companyActivityEventObj = await model.CompanyActivityEvent.create(args.input, {
                include: modelIncludes
            });
            return {
                CompanyActivityEvent: companyActivityEventObj,
                message: constant.SUCCESS
            }
        },
        updateCrmCompanyActivityEvent: async (obj, args, context, info) => {
            const errors = activityEventValidation.validateEditActivityEvent(args.input);
            if (errors.error) {
                throw new Error(errors.error.details[0].message);
            }
            return await common.updateActivityEvent(args, context, 'CompanyActivityEvent', 'id_crm_company_activity_event', {
                ActivityEvent: model.CompanyActivityEvent,
                ActivityEventParticipant: model.CompanyActivityEventParticipant
            });
        },
        deleteCrmCompanyActivityEventById: async (obj, args, context, info) => {
            return await common.deleteModelById(args.id, model.CompanyActivityEvent, context.user.id);
        }
    }
}