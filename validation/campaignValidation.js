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
	return Joi.validate({ id: inputID }, schemaIDInput, {
		abortEarly: true
	});
}
let schemaCreateInput = Joi.object().keys({
	owner: Joi.number().integer().allow(null).optional(),
	id_crm_campaign_type_master: Joi.number().integer().allow(null).optional(),
	campaign_name: Joi.string().required(),
	campaign_status: Joi.string().valid('planning', 'active', 'inactive', 'complete').allow(null).optional(),
	start_date: Joi.date().allow(null).optional(),
	end_date: Joi.date().allow(null).optional(),
	expected_revenue: Joi.number().precision(2).allow(null).optional(),
	budgeted_cost: Joi.number().precision(2).allow(null).optional(),
	actual_cost: Joi.number().precision(2).allow(null).optional(),
	description: Joi.string().allow(null).optional(),
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
	owner: Joi.number().integer().allow(null).optional(),
	id_crm_campaign_type_master: Joi.number().integer().allow(null).optional(),
	campaign_name: Joi.string().required(),
	campaign_status: Joi.string().valid('planning', 'active', 'inactive', 'complete').allow(null).optional(),
	start_date: Joi.date().allow(null).optional(),
	end_date: Joi.date().allow(null).optional(),
	expected_revenue: Joi.number().precision(2).allow(null).optional(),
	budgeted_cost: Joi.number().precision(2).allow(null).optional(),
	actual_cost: Joi.number().precision(2).allow(null).optional(),
	description: Joi.string().allow(null).optional(),
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