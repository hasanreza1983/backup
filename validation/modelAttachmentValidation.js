/*
 * This validation file is for type modelAttachmentAttachment resolver
 * Make Schema to validate modelAttachmentAttachment User Inputs
 * Hasan Reza 2018-03-28;
 *
 */
const Joi = require('joi');

const schemaInput = Joi.object().keys({
	model_name: Joi.string().valid('Lead', 'Contact', 'Company', 'Deal', 'Campaign').required(),
	model_id: Joi.number().integer().required(),
	ModelAttachments: Joi.array().items(Joi.object().keys({
		minio_file_id: Joi.string().required()
	}))
});
// function to validate schema
const validateInput = (inputArguments) => {
	return Joi.validate(inputArguments, schemaInput, {
		abortEarly: true
	});
}
module.exports = {
	validateInput
}