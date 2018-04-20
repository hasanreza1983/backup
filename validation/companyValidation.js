const Joi = require('joi');
const { schemaAddresses } = require('./commonSchema');

/********************************************** Starts: Validation schema  ***************************************************/
// Schema to validate create & update company
const schemaInput = Joi.object().keys({
	owner: Joi.number().min(1).required(),
	id_crm_company_status_master: Joi.number().min(1).allow(null).optional(),
	company_name: Joi.string().min(1).max(100).required(),
	registration_number: Joi.string().max(50).allow(null).optional(),
	company_email: Joi.string().max(50).allow(null).optional(),
	phone: Joi.string().max(20).allow(null).optional(),
	fax: Joi.string().max(50).allow(null).optional(),
	website: Joi.string().max(100).allow(null).optional(),
	skype_url: Joi.string().max(100).allow(null).optional(),
	twitter_url: Joi.string().max(100).allow(null).optional(),
	linkedin_url: Joi.string().max(100).allow(null).optional(),
	facebook_url: Joi.string().max(100).allow(null).optional(),
	twitter_url: Joi.string().max(100).allow(null).optional(),
	twitter_url: Joi.string().max(100).allow(null).optional(),
	id_crm_company_type_master: Joi.number().min(1).allow(null).optional(),
	id_crm_industry_master: Joi.number().min(1).allow(null).optional(),
	id_crm_company_ownership_master: Joi.number().min(1).allow(null).optional(),
	no_of_employees: Joi.number().min(0).allow(null).optional(),
	annual_revenue: Joi.number().min(0).allow(null).optional(),
	description: Joi.string().allow(null).optional(),
	Addresses: schemaAddresses
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
