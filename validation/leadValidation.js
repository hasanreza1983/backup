/*
* This validation file is for type CrmLead resolver
* Make Schema to validate CrmLead User Inputs
* Hasan Reza 2018-03-13;
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
	owner: Joi.number().integer().required(),
	company_name: Joi.string().required(),
	id_crm_lead_status_master: Joi.number().integer(),
	id_crm_rating_master: Joi.number().integer().allow(null).optional(),
	no_of_employees: Joi.number().integer().allow(null).optional(),
	annual_revenue: Joi.number().integer().allow(null).optional(),
	id_crm_industry_master: Joi.number().integer().allow(null).optional(),
	id_crm_pipeline_stage: Joi.number().integer(),
	//owner: Joi.number().integer().required(),
	created_by: Joi.number().integer().required(),

	LeadContactParent: Joi.object().keys({
		salutation: Joi.string().allow(null).optional(),
		first_name: Joi.string().required(),
		last_name: Joi.string().required(),
		title: Joi.string().allow(null).optional(),
		designation: Joi.string().allow(null).optional(),
		phone: Joi.string().allow(null).optional(),
		mobile: Joi.string().allow(null).optional(),
		email: Joi.string().email().allow(null).optional(),
		secondary_email: Joi.string().email().allow(null).optional(),
		fax: Joi.string().allow(null).optional(),
		website: Joi.string().allow(null).optional(),
		skype_url: Joi.string().allow(null).optional(),
		twitter_url: Joi.string().allow(null).optional(),
		linkedin_url: Joi.string().allow(null).optional(),
		facebook_url: Joi.string().allow(null).optional(),
		description: Joi.string().allow(null).optional(),
		id_crm_lead_source_master: Joi.number().integer().required()
	}),

	Addresses: Joi.array().items(Joi.object().keys({
		address_type: Joi.string().valid('Default', 'Mailing', 'Billing', 'Shipping', 'Others'),
		street: Joi.string().allow(null).optional(),
		city: Joi.number().integer().allow(null).optional(),
		state_province: Joi.number().integer().allow(null).optional(),
		country: Joi.number().integer().allow(null).optional(),
		zip_code: Joi.string().allow(null).optional()
	}))
});

// function to validate schemaCreate
const validateCreateInput = (inputArguments) => {
	return Joi.validate(inputArguments, schemaCreateInput, {
		abortEarly: true
	});
}

let schemaUpdateInput = Joi.object().keys({
	id: Joi.number().integer().required(),
	owner: Joi.number().integer().required(),
	company_name: Joi.string().required(),
	id_crm_lead_status_master: Joi.number().integer(),
	id_crm_rating_master: Joi.number().integer().allow(null).optional(),
	no_of_employees: Joi.number().integer().allow(null).optional(),
	annual_revenue: Joi.number().integer().allow(null).optional(),
	id_crm_industry_master: Joi.number().integer().allow(null).optional(),
	id_crm_pipeline_stage: Joi.number().integer(),
	updated_by: Joi.number().integer().required(),
	LeadContactParent: Joi.object().keys({
		id: Joi.number().integer().optional(),
		salutation: Joi.string().allow(null).optional(),
		first_name: Joi.string().required(),
		last_name: Joi.string().required(),
		title: Joi.string().allow(null).optional(),
		designation: Joi.string().allow(null).optional(),
		phone: Joi.string().allow(null).optional(),
		mobile: Joi.string().allow(null).optional(),
		email: Joi.string().email().allow(null).optional(),
		secondary_email: Joi.string().email().allow(null).optional(),
		fax: Joi.string().allow(null).optional(),
		website: Joi.string().allow(null).optional(),
		skype_url: Joi.string().allow(null).optional(),
		twitter_url: Joi.string().allow(null).optional(),
		linkedin_url: Joi.string().allow(null).optional(),
		facebook_url: Joi.string().allow(null).optional(),
		description: Joi.string().allow(null).optional(),
		id_crm_lead_source_master: Joi.number().integer().required()
	}),

	Addresses: Joi.array().items(Joi.object().keys({
		id: Joi.number().integer().optional(),
		address_type: Joi.string().valid('Default', 'Mailing', 'Billing', 'Shipping', 'Others'),
		street: Joi.string().allow(null).optional(),
		city: Joi.number().integer().allow(null).optional(),
		state_province: Joi.number().integer().allow(null).optional(),
		country: Joi.number().integer().allow(null).optional(),
		zip_code: Joi.string().allow(null).optional()
	}))
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