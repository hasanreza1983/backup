/*
* This validation file contains common method for all resolver
* Make Schema to validate User Inputs
* Hasan Reza 2018-03-13;
*
*/
const Joi = require('joi');

let schemaCampaignAssignmentInput = Joi.array().items(Joi.object().keys({
	model_name: Joi.string().valid('Lead', 'Contact'),
	model_id: Joi.number().integer().required(),
	id_crm_campaign: Joi.number().integer().required(),
	id_crm_campaign_status_master: Joi.number().integer().required()
}));

// function to validate schemaCampaignAssignmentInput
const validateCampaignAssignmentInput = (inputArguments) => {
	return Joi.validate(inputArguments, schemaCampaignAssignmentInput, {
		abortEarly: true
	});
}
module.exports = {
	validateCampaignAssignmentInput
}