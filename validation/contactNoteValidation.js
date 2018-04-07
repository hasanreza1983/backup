/*
* This validation file is for type CrmContactNote resolver
* Make Schema to validate CrmContactNote User Inputs
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
	id_crm_contact: Joi.number().integer().required(),
	note_title: Joi.string(),
	note_description: Joi.string().required(),
	created_by: Joi.number().integer().required(),

	ContactNoteAttachements: Joi.array().items(Joi.object().keys({
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
	id_crm_contact: Joi.number().integer().required(),
	note_title: Joi.string(),
	note_description: Joi.string().required(),
	updated_by: Joi.number().integer().required(),

	ContactNoteAttachements: Joi.array().items(Joi.object().keys({
		id: Joi.number().integer(),
		id_crm_contact_note: Joi.number().integer(),
		minio_file_id: Joi.string(),
		minio_file_url: Joi.string(),
		is_removed: Joi.boolean()
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
	id_crm_contact: Joi.number().integer().required()
		
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