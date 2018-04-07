const Joi = require('joi');

/********************************************** Starts: Validation schema  ***************************************************/
// Schema to validate create activity event
const schemaCreateActivityEvent = Joi.object().keys({
    id_crm_company: Joi.number().optional(),
    id_crm_contact: Joi.number().optional(),
    id_crm_lead: Joi.number().optional(),
    owner: Joi.number().allow(null).optional(),
    title: Joi.string().min(1).max(255).required(),
    location: Joi.string().allow(null).optional(),
    event_start_time: Joi.date().required(),
    event_end_time: Joi.date().allow(null).optional(),
    description: Joi.string().allow(null).optional(),
    Participants: Joi.array().items(Joi.object({
        participant_id: Joi.number().required()
    }))
});

// Schema to validate update activity event
const schemaEditCreateActivityEvent = Joi.object().keys({
    id: Joi.number().required(),
    id_crm_company: Joi.number().optional(),
    id_crm_contact: Joi.number().optional(),
    id_crm_lead: Joi.number().optional(),
    owner: Joi.number().allow(null).optional(),
    title: Joi.string().min(1).max(255).optional(),
    location: Joi.string().allow(null).optional(),
    event_start_time: Joi.date().optional(),
    event_end_time: Joi.date().allow(null).optional(),
    description: Joi.string().allow(null).optional(),
    Participants: Joi.array().items(Joi.object({
        participant_id: Joi.number().required()
    }))
});

// function to validate schema schemaCreateActivityEvent
const validateCreateActivityEvent = (input) => {
    return Joi.validate(input, schemaCreateActivityEvent, {abortEarly: true});
}
// function to validate schema schemaEditCreateActivityEvent
const validateEditActivityEvent = (input) => {
    return Joi.validate(input, schemaEditCreateActivityEvent, {abortEarly: true});
}

module.exports = {
    validateCreateActivityEvent,
    validateEditActivityEvent
}
