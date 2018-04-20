/*
* This validation file is for type CrmCampaign resolver
* Make Schema to validate CrmCampaign User Inputs
* Hasan Reza 2018-04-05;
*
*/
const Joi = require('joi');

const schemaInput = Joi.object().keys({
	owner: Joi.number().integer().required(),
	id_crm_campaign_type_master: Joi.number().integer().allow(null).optional(),
	campaign_name: Joi.string().max(100).required(),
	campaign_status: Joi.string().valid('planning', 'active', 'inactive', 'complete').allow(null).optional(),
	start_date: Joi.date().allow(null).optional(),
	end_date: Joi.date().allow(null).optional(),
	expected_revenue: Joi.number().precision(2).allow(null).optional(),
	budgeted_cost: Joi.number().precision(2).allow(null).optional(),
	actual_cost: Joi.number().precision(2).allow(null).optional(),
	description: Joi.string().allow(null).optional(),
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