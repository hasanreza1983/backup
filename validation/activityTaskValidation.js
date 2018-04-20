const Joi = require('joi');

/********************************************** Starts: Validation schema  ***************************************************/
// Schema to validate create & update activity task
const schemaInput = Joi.object().keys({
    owner: Joi.number().required(),
    subject: Joi.string().min(1).max(255),
    due_date: Joi.date(),
    id_crm_task_status_master: Joi.number().integer().allow(null).optional(),
    recurrence_type: Joi.string().required().valid('daily','weekly','monthly','yearly','none'),
    ActivityTaskLinks: Joi.array().items(Joi.object({
        model_name: Joi.string().required().valid('Campaign', 'Lead', 'Contact', 'Company', 'Deal'),
        model_id: Joi.number().required().min(1)
    })).required(),
    Daily: Joi.when('recurrence_type', {
        is: 'daily',
        then: Joi.array().items(Joi.object({
            daily_option: Joi.string().required().valid('daily', 'weekly'),
            daily_day_no: Joi.number().required().min(1).max(99)
        })).length(1).required(),
        otherwise: Joi.optional()
    }),
    Weekly: Joi.when('recurrence_type', {
        is: 'weekly',
        then: Joi.array().items(Joi.object({
            recur_every_week: Joi.number().required().min(1).max(99),
            weekly_monday: Joi.boolean().required(),
            weekly_tuesday: Joi.boolean().required(),
            weekly_wednesday: Joi.boolean().required(),
            weekly_thursday: Joi.boolean().required(),
            weekly_friday: Joi.boolean().required(),
            weekly_saturday: Joi.boolean().required(),
            weekly_sunday: Joi.boolean().required()
        })).length(1).required(),
        otherwise: Joi.optional()
    }),
    Monthly: Joi.when('recurrence_type', {
        is: 'monthly',
        then: Joi.array().items(Joi.object({
            monthly_option: Joi.string().required().valid('day', 'weekly'),
            monthly_day: Joi.number().min(1).max(31).allow(null).optional(),
            monthly_every_month: Joi.number().min(1).max(99).allow(null).optional(),
            monthly_week: Joi.string().valid('first', 'second', 'third', 'fourth', 'last').allow(null).optional(),
            monthly_day_of_week: Joi.string().valid('day', 'weekday', 'weekend day', 'sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday').allow(null).optional(),
            monthly_of_every_month: Joi.number().min(1).max(99).allow(null).optional(),
        })).length(1).required(),
        otherwise: Joi.optional()
    }),
    Yearly: Joi.when('recurrence_type', {
        is: 'yearly',
        then: Joi.array().items(Joi.object({
            recur_every_year: Joi.number().required().min(1).max(99),
            yearly_option: Joi.string().required().valid('monthly', 'weekly'),
            yearly_on_month: Joi.string().valid('january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december').allow(null).optional(),
            yearly_on_month_day: Joi.number().min(1).max(31).allow(null).optional(),
            yearly_week: Joi.string().valid('first', 'second', 'third', 'fourth', 'last').allow(null).optional(),
            yearly_day_of_week: Joi.string().valid('day', 'weekday', 'weekend day', 'sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday').allow(null).optional(),
            yearly_of_every_month: Joi.string().valid('january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december').allow(null).optional()
        })).length(1).required(),
        otherwise: Joi.optional()
    }),
    end_date_option: Joi.number().valid(1, 2, 3),
    end_after_occurence: Joi.number().allow(null).optional().min(1).max(999),
    recurrence_end_date: Joi.date().allow(null).optional()
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
