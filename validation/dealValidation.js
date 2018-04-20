/*
 * This validation file is for type Deal resolver
 * Make Schema to validate Deal User Inputs
 * Hasan Reza 2018-04-05;
 *
 */
const Joi = require('joi');

const schemaInput = Joi.object().keys({
	owner: Joi.number().integer().required(),
	id_crm_contact: Joi.number().integer().allow(null).optional(),
	id_crm_company: Joi.number().integer().allow(null).optional(),
	deal_name: Joi.string().max(100).required(),
	deal_type: Joi.string().valid('none', 'existing_business', 'new_business').allow(null).optional(),
	deal_closing_date: Joi.date().required(),
	deal_amount: Joi.number().precision(2).allow(null).optional(),
	expected_revenue: Joi.number().precision(2).allow(null).optional(),
	id_crm_lead_source_master: Joi.number().integer().allow(null).optional(),
	id_crm_campaign: Joi.number().integer().allow(null).optional(),
	id_crm_pipeline_stage: Joi.number().integer().allow(null).optional(),
	next_step: Joi.string().allow(null).optional(),
	description: Joi.string().allow(null).optional()
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