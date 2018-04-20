const Joi = require('joi');


const schemaLeadContactParent = Joi.object().keys({
	first_name: Joi.string().min(1).max(100).required(),
	last_name: Joi.string().max(100).allow(null).optional(),
	title: Joi.string().max(100).allow(null).optional(),
	designation: Joi.string().max(100).allow(null).optional(),
	phone: Joi.string().max(20).allow(null).optional(),
	mobile: Joi.string().max(20).allow(null).optional(),
	email: Joi.string().max(100).allow(null).optional(),
	secondary_email: Joi.string().max(100).allow(null).optional(),
	description: Joi.string().allow(null).optional(),
	id_crm_lead_source_master: Joi.number().integer().allow(null).optional()
});

const schemaAddresses = Joi.array().items(Joi.object().keys({
	address_type: Joi.string().valid('default', 'mailing', 'billing', 'shipping', 'others').allow(null).optional(),
	street: Joi.string().allow(null).optional(),
	city: Joi.number().integer().allow(null).optional(),
	state_province: Joi.number().integer().allow(null).optional(),
	zip_code: Joi.string().max(10).allow(null).optional(),
	country: Joi.number().integer().allow(null).optional()
}));
module.exports = {
	schemaLeadContactParent,
	schemaAddresses
}