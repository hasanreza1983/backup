/*
 * This validation file is for type CrmModelNote resolver
 * Make Schema to validate CrmModelNote User Inputs
 * Hasan Reza 2018-03-28;
 *
 */
const Joi = require('joi');

const schemaGetInput = Joi.object().keys({
	model_name: Joi.string().valid('Lead', 'Contact', 'Company', 'Deal', 'Campaign').required(),
	model_id: Joi.number().integer().required()
});

const schemaCreateInput = Joi.object().keys({
	model_name: Joi.string().valid('Lead', 'Contact', 'Company', 'Deal', 'Campaign').required(),
	model_id: Joi.number().integer().required(),
	note_title: Joi.string().max(255).allow(null).optional(),
	note_description: Joi.string().allow(null).optional(),
	ModelNoteAttachments: Joi.array().items(Joi.object().keys({
		minio_file_id: Joi.string().max(100).required(),
	})).allow(null).optional()
});

const schemaUpdateInput = Joi.object().keys({
	note_title: Joi.string().max(255).allow(null).optional(),
	note_description: Joi.string().allow(null).optional(),
	ModelNoteAttachments: Joi.array().items(Joi.object().keys({
		minio_file_id: Joi.string().max(100).required(),
		is_removed: Joi.boolean().optional(),
	})).allow(null).optional()
});

// function to validate get notes schema
const validateGetInput = (inputArguments) => {
	return Joi.validate(inputArguments, schemaGetInput, {
		abortEarly: true
	});
}

// function to validate create note schema
const validateCreateInput = (inputArguments) => {
	return Joi.validate(inputArguments, schemaCreateInput, {
		abortEarly: true
	});
}

// function to validate update note schema
const validateUpdateInput = (inputArguments) => {
	return Joi.validate(inputArguments, schemaUpdateInput, {
		abortEarly: true
	});
}

module.exports = {
	validateGetInput,
	validateCreateInput,
	validateUpdateInput
}