/*
 * This Resolver File belongs to the ActivityEvent type
 * Arif Khan 2018-04-06;
 *
 */

const model = require('../../models');
const constant = require('../../lib/constant');
const common = require('../../lib/commonResolver');
const activityEventValidation = require('../../validation/activityEventValidation');

const Op = model.Sequelize.Op;
const modelIncludes = [{
        model: model.ActivityEventParticipant,
        as: 'Participants',
        required: false,
        where: {
            is_deleted: 0
        }
    },
    {
        model: model.ActivityEventLink,
        required: false,
    }
];

module.exports = {
    Query: {
        getCrmActivityEventById: async (obj, args, context, info) => {
            return await common.getCrmModelById(args.id, model.ActivityEvent, modelIncludes);
        }
    },
    Mutation: {
        createCrmActivityEvent: async (obj, args, context, info) => {
            const errors = activityEventValidation(args.input);
            if (errors.error) {
                throw new Error(errors.error.details[0].message);
            }
            args.input.created_by = context.user.id;
            const companyActivityEventObj = await model.ActivityEvent.create(args.input, {
                include: modelIncludes
            });
            return {
                result: companyActivityEventObj,
                message: constant.SUCCESS
            }
        },
        updateCrmActivityEvent: async (obj, args, context, info) => {
            const errors = activityEventValidation(args.input);
            if (errors.error) {
                throw new Error(errors.error.details[0].message);
            }
            const Participants = args.input.Participants;
            delete args.input.Participants;
            const activityEventObj = await model.ActivityEvent.findOne({
                where: {
                    id: args.id,
                    is_deleted: 0
                }
            });
            if (activityEventObj) {
                args.input.updated_by = context.user.id;
                Object.keys(args.input).forEach((e) => {
                    activityEventObj[e] = args.input[e];
                });
                await activityEventObj.save();
                if (Participants && Participants.length) {
                    const participantIdList = Participants.map(participantObj => participantObj.participant_id);
                    await model.ActivityEventParticipant.update({
                        deleted_at: new Date(),
                        is_deleted: 1
                    },
                    {
                        where: {
                            is_deleted: 0,
                            id_crm_activity_event: activityEventObj.id,
                            participant_id: {
                                [Op.notIn]: participantIdList
                            }
                        }
                    });
                    const participantObjList = participantIdList.map(id => {
                        return model.ActivityEventParticipant.findOrCreate({
                            where: {
                                is_deleted: 0,
                                id_crm_activity_event: activityEventObj.id,
                                participant_id: id
                            }
                        });
                    });
                    await Promise.all(participantObjList);
                } else {
                    await model.ActivityEventParticipant.update({
                        deleted_at: new Date(),
                        is_deleted: 1
                    }, {
                        where: {
                            is_deleted: 0,
                            id_crm_activity_event: activityEventObj.id
                        }
                    });
                }
            } else {
                throw new Error(constant.DOES_NOT_EXIST);
            }
            return {
                message: constant.SUCCESS
            };
        },
        deleteCrmActivityEventById: async (obj, args, context, info) => {
            return await common.deleteModelById(args.id, model.ActivityEvent, context.user.id);
        }
    }
}