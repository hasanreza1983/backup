/*
* This validation file is for type CrmProduct resolver
* Make Schema to validate CrmProduct User Inputs
* Hasan Reza 2018-04-17;
*
*/
const Joi = require('joi');

let schemaIDInput = Joi.object().keys({
	id: Joi.number().required()
});
// function to validate schemaID
const validateIDInput = (inputID) => {
	return Joi.validate({ id: inputID }, schemaIDInput, {
		abortEarly: true
	});
}

let schemaCreateInput = Joi.object().keys({
	id: Joi.any().when('updated_by', { is: null, then: Joi.optional(), otherwise: Joi.number().integer().required() }),
	owner: Joi.number().integer().allow(null).optional(),
	product_name: Joi.string().allow(null).optional(),
	product_code: Joi.string().allow(null).optional(),
	product_sku: Joi.string().required(),
	product_display_url: Joi.string().allow(null).optional(),
	description: Joi.string().allow(null).optional(),
	updated_by: Joi.number().integer().allow(null).optional()
});


// function to validate schemaCreate
const validateCreateInput = (inputArguments) => {
	return Joi.validate(inputArguments, schemaCreateInput, {
		abortEarly: true
	});
}

let schemaUpdateInput = Joi.object().keys({
	id: Joi.number().integer().required(),
	owner: Joi.number().integer().allow(null).optional(),
	product_name: Joi.string().allow(null).optional(),
	product_code: Joi.string().allow(null).optional(),
	product_sku: Joi.string().required(),
	product_display_url: Joi.string().allow(null).optional(),
	description: Joi.string().allow(null).optional()
});

// function to validate schemaUpdate
const validateUpdateInput = (inputArguments) => {
	return Joi.validate(inputArguments, schemaUpdateInput, {
		abortEarly: true
	});
}

module.exports = {
	validateIDInput,
	validateCreateInput,
	validateUpdateInput
}