const Joi = require('joi');

/********************************************** Starts: Validation schema  ***************************************************/
// Schema to validate create & update activity event
const schemaInput = Joi.object().keys({
    owner: Joi.number().required(),
    subject: Joi.string().min(1).max(255).required(),
    location: Joi.string().allow(null).optional(),
    event_start_time: Joi.date().required(),
    event_end_time: Joi.date().allow(null).optional(),
    description: Joi.string().allow(null).optional(),
    Participants: Joi.array().items(Joi.object({
        participant_id: Joi.number().required()
    })),
    ActivityEventLinks: Joi.array().items(Joi.object({
        model_name: Joi.string().required().valid('Campaign', 'Lead', 'Contact', 'Company', 'Deal'),
        model_id: Joi.number().required().min(1)
    })),
});

// function to validate schema schemaInput
const validateInput = (inputArguments) => {
	return Joi.validate(inputArguments, schemaInput, {
		abortEarly: true
	});
}
module.exports = {
	validateInput
}
