/*
* This validation file is for type CrmLead resolver
* Make Schema to validate CrmLead User Inputs
* Hasan Reza 2018-03-13;
*
*/
const Joi = require('joi');
const { schemaAddresses, schemaLeadContactParent } = require('./commonSchema');

const schemaInput = Joi.object().keys({
	owner: Joi.number().integer().required(),
	company_name: Joi.string().max(255).required(),
	id_crm_lead_status_master: Joi.number().integer().allow(null).optional(),
	id_crm_rating_master: Joi.number().integer().allow(null).optional(),
	no_of_employees: Joi.number().integer().allow(null).optional(),
	annual_revenue: Joi.number().precision(2).allow(null).optional(),
	id_crm_industry_master: Joi.number().integer().allow(null).optional(),
	id_crm_pipeline_stage: Joi.number().integer().allow(null).optional(),
	fax: Joi.string().allow(null).optional(),
	website: Joi.string().allow(null).optional(),
	skype_url: Joi.string().allow(null).optional(),
	twitter_url: Joi.string().allow(null).optional(),
	linkedin_url: Joi.string().allow(null).optional(),
	facebook_url: Joi.string().allow(null).optional(),
	LeadContactParent: schemaLeadContactParent,
	Addresses: schemaAddresses
});
// function to validate schemaInput
const validateInput = (inputArguments) => {
	return Joi.validate(inputArguments, schemaInput, {
		abortEarly: true
	});
}
module.exports = {
	validateInput
}