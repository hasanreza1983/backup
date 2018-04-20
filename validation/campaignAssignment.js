/*
 * This validation file contains common method for all resolver
 * Make Schema to validate User Inputs
 * Hasan Reza 2018-03-13;
 *
 */
const Joi = require('joi');

const schemaCampaignAssignmentInput = Joi.object().keys({
	model_name: Joi.string().valid('Lead', 'Contact').required(),
	model_id: Joi.number().integer().required(),
	id_crm_campaign_status_master: Joi.number().integer().required(),
	Campaigns: Joi.array().items(Joi.number().integer().required()).min(1).required()
});

// function to validate schemaCampaignAssignmentInput
const validateCampaignAssignmentInput = (inputArguments) => {
	return Joi.validate(inputArguments, schemaCampaignAssignmentInput, {
		abortEarly: true
	});
}

const schemaCampaignUnassignmentInput = Joi.object().keys({
	model_name: Joi.string().valid('Lead', 'Contact').required(),
	model_id: Joi.number().integer().required(),
	Campaigns: Joi.array().items(Joi.number().integer().required()).min(1).required()
});

// function to validate schemaCampaignUnassignmentInput
const validateCampaignUnassignmentInput = (inputArguments) => {
	return Joi.validate(inputArguments, schemaCampaignUnassignmentInput, {
		abortEarly: true
	});
}

const schemaCampaignAssignmentUpdateInput = Joi.object().keys({
	id_crm_campaign: Joi.number().integer().required(),
	model_name: Joi.string().valid('Lead', 'Contact').required(),
	model_id: Joi.number().integer().required(),
	id_crm_campaign_status_master: Joi.number().integer().required()
});

// function to validate schemaCampaignAssignmentUpdateInput
const validateCampaignAssignmentUpdateInput = (inputArguments) => {
	return Joi.validate(inputArguments, schemaCampaignAssignmentUpdateInput, {
		abortEarly: true
	});
}

module.exports = {
	validateCampaignAssignmentInput,
	validateCampaignUnassignmentInput,
	validateCampaignAssignmentUpdateInput
}