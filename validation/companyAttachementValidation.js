/*
* This validation file is for type CrmCompanyAttachmentAttachement resolver
* Make Schema to validate CrmCompanyAttachmentAttachement User Inputs
* Hasan Reza 2018-03-28;
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
	id_crm_company: Joi.number().integer().required(),
	CompanyAttachements: Joi.array().items(Joi.object().keys({
		minio_file_id: Joi.string()
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
	id_crm_company: Joi.number().integer().required(),
	CompanyAttachements: Joi.array().items(Joi.object().keys({
		minio_file_id: Joi.string()
	}))
});

// function to validate schemaUpdate
const validateUpdateInput = (inputArguments) => {
	return Joi.validate(inputArguments, schemaUpdateInput, {
		abortEarly: true
	});
}
let schemaDeleteInput = Joi.object().keys({
	id: Joi.number().integer().required(),
	id_crm_company: Joi.number().integer().required(),
	minio_file_id: Joi.string()	
});

// function to validate schemaDelete
const validateDeleteInput = (inputArguments) => {
	return Joi.validate(inputArguments, schemaDeleteInput, {
		abortEarly: true
	});
}

module.exports = {
	validateIDInput,
	validateCreateInput,
	validateUpdateInput,
	validateDeleteInput
}