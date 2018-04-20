const Joi = require('joi');
const { schemaAddresses, schemaLeadContactParent } = require('./commonSchema');

/********************************************** Starts: Validation schema  ***************************************************/
// Schema to validate create & update contact
const schemaInput = Joi.object().keys({
	owner: Joi.number().min(1).required(),
	id_crm_company: Joi.number().min(1).required(),
	home_phone: Joi.string().max(20).allow(null).optional(),
	department: Joi.string().max(100).allow(null).optional(),
	date_of_birth: Joi.date().allow(null).optional(),
	assistant_name: Joi.string().max(50).allow(null).optional(),
	assistant_phone: Joi.string().max(50).allow(null).optional(),
	assistant_parent_id: Joi.number().min(1).allow(null).optional(),
	reports_to_name: Joi.string().max(50).allow(null).optional(),
	reports_to_parent_id: Joi.number().min(1).allow(null).optional(),
	id_crm_pipeline_stage: Joi.number().min(1).allow(null).optional(),
	LeadContactParent: schemaLeadContactParent,
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
