const Joi = require('joi');

/********************************************** Starts: Validation schema  ***************************************************/
// Schema to validate create & update activity call
const schemaActivityCall = Joi.object().keys({
    owner: Joi.number().min(1).required(),
    subject: Joi.string().min(1).max(255).required(),
    call_type: Joi.string().valid('inbound','outbound').allow(null).optional(),
    call_details: Joi.string().valid('current','completed', 'schedule').required(),
    call_start_time: Joi.date().allow(null).optional(),
    call_duration: Joi.number().allow(null).optional(),
    result: Joi.string().allow(null).optional(),
    description: Joi.string().allow(null).optional(),
    ActivityCallLinks: Joi.array().items(Joi.object({
        model_name: Joi.string().valid('Campaign', 'Lead', 'Contact', 'Company', 'Deal').required(),
        model_id: Joi.number().min(1).required()
    }))
});


// function to validate schema schemaActivityCall
module.exports = (input) => {
    return Joi.validate(input, schemaActivityCall, {abortEarly: true});
}
