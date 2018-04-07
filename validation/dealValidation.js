/*
* This validation file is for type CrmDeal resolver
* Make Schema to validate CrmDeal User Inputs
* Hasan Reza 2018-04-05;
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
	owner: Joi.number().integer(),
	id_crm_contact: Joi.number().integer().required(),
	id_crm_company: Joi.number().integer().required(),
	deal_name: Joi.string().required(),
	deal_type: Joi.string().valid('none', 'existing_business', 'new_business'),
	deal_closing_date: Joi.date().required(),
	deal_amount: Joi.string().required(),
	expected_revenue: Joi.string().required(),
	id_crm_lead_source_master: Joi.number().integer(),
	id_crm_campaign: Joi.number().integer(),
	id_crm_pipeline_stage: Joi.number().integer(),
	next_step: Joi.string(),
	description: Joi.string(),
	created_by: Joi.number().integer().required()

});

// function to validate schemaCreate
const validateCreateInput = (inputArguments) => {
	return Joi.validate(inputArguments, schemaCreateInput, {
		abortEarly: true
	});
}
let schemaUpdateInput = Joi.object().keys({
	id: Joi.number().integer().required(),
	owner: Joi.number().integer(),
	id_crm_contact: Joi.number().integer().required(),
	id_crm_company: Joi.number().integer().required(),
	deal_name: Joi.string().required(),
	deal_type: Joi.string().valid('none', 'existing_business', 'new_business'),
	deal_closing_date: Joi.date().required(),
	deal_amount: Joi.string().required(),
	expected_revenue: Joi.string().required(),
	id_crm_lead_source_master: Joi.number().integer(),
	id_crm_campaign: Joi.number().integer(),
	id_crm_pipeline_stage: Joi.number().integer(),
	next_step: Joi.string(),
	description: Joi.string(),
	updated_by: Joi.number().integer().required()
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