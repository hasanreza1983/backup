/*
* This validation file is for type CrmCampaign resolver
* Make Schema to validate CrmCampaign User Inputs
* Hasan Reza 2018-04-05;
*
*/
const Joi = require('joi');

let schemaIDInput = Joi.object().keys({
	id: Joi.number().required()
});
// function to validate schemaID
const validateIDInput = (inputID) => {
	return Joi.validate({id: inputID}, schemaIDInput, {
		abortEarly: true
	});
}

let schemaCreateInput = Joi.object().keys({
    owner: Joi.number().integer(),
	id_crm_campaign_type_master: Joi.number().integer(),
	campaign_name: Joi.string(),
	campaign_status: Joi.string().valid('Planning','Active','Inactive','Complete'),
	start_date: Joi.date(),
	end_date: Joi.date(),
	expected_revenue: Joi.string().required(),
	budgeted_cost: Joi.string(),
	actual_cost: Joi.string().required(),
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
	id_crm_campaign_type_master: Joi.number().integer(),
	campaign_name: Joi.string(),
	campaign_status: Joi.string().valid('Planning','Active','Inactive','Complete'),
	start_date: Joi.date(),
	end_date: Joi.date(),
	expected_revenue: Joi.string().required(),
	budgeted_cost: Joi.string(),
	actual_cost: Joi.string().required(),	
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