/*
* This validation file contains common method for all resolver
* Make Schema to validate User Inputs
* Hasan Reza 2018-03-13;
*
*/
const Joi = require('joi');

let schemaCampaignAssignmentInput = Joi.object().keys({
	model_name: Joi.string().valid('Lead', 'Contact'),
	model_id: Joi.number().integer().required(),
	id_crm_campaign_status_master: Joi.number().integer().required(),
	Campaigns: Joi.array().items(Joi.number().required())
});

// function to validate schemaCampaignAssignmentInput
const validateCampaignAssignmentInput = (inputArguments) => {
	return Joi.validate(inputArguments, schemaCampaignAssignmentInput, {
		abortEarly: true
	});
}

let schemaCampaignAssignmentUpdateInput = Joi.object().keys({
	id: Joi.number().integer().required(),
	model_name: Joi.string().valid('Lead', 'Contact'),
	model_id: Joi.number().integer().required(),
	id_crm_campaign_status_master: Joi.number().integer().required()	
});

// function to validate schemaCampaignAssignmentUpdateInput
const validateCampaignAssignmentUpdateInput = (inputArguments) => {
	return Joi.validate(inputArguments, schemaCampaignAssignmentUpdateInput, {
		abortEarly: true
	});
}

let schemaCampaignUnAssignmentInput = Joi.object().keys({
	id: Joi.number().integer().required(),
	model_name: Joi.string().valid('Lead', 'Contact'),
	model_id: Joi.number().integer().required()
});

// function to validate schemaCampaignUnAssignmentInput
const validateCampaignUnAssignmentInput = (inputArguments) => {
	return Joi.validate(inputArguments, schemaCampaignUnAssignmentInput, {
		abortEarly: true
	});
}

module.exports = {
	validateCampaignAssignmentInput,
	validateCampaignAssignmentUpdateInput,
	validateCampaignUnAssignmentInput
}
