const Joi = require('joi');

/********************************************** Starts: Validation schema  ***************************************************/
// Schema to validate create & update activity task
const schemaCreateActivityTask = Joi.object().keys({
    id_crm_company: Joi.number().optional(),
    id_crm_contact: Joi.number().optional(),
    id_crm_lead: Joi.number().optional(),
    subject: Joi.string().min(1).max(255),
    due_date: Joi.date(),
    task_status: Joi.string().valid('Not Started','Deferred','In Progress','Completed','Waiting on Someone Else'),
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
            monthly_day: Joi.number().optional().min(1).max(31),
            monthly_every_month: Joi.number().optional().min(1).max(99),
            monthly_week: Joi.string().optional().valid('first', 'second', 'third', 'fourth', 'last'),
            monthly_day_of_week: Joi.string().optional().valid('day', 'weekday', 'weekend day', 'sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'),
            monthly_of_every_month: Joi.number().optional().min(1).max(99),
        })).length(1).required(),
        otherwise: Joi.optional()
    }),
    Yearly: Joi.when('recurrence_type', {
        is: 'yearly',
        then: Joi.array().items(Joi.object({
            recur_every_year: Joi.number().required().min(1).max(99),
            yearly_option: Joi.string().required().valid('monthly', 'weekly'),
            yearly_on_month: Joi.string().optional().valid('january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december'),
            yearly_on_month_day: Joi.number().optional().min(1).max(31),
            yearly_week: Joi.string().optional().valid('first', 'second', 'third', 'fourth', 'last'),
            yearly_day_of_week: Joi.string().optional().valid('day', 'weekday', 'weekend day', 'sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'),
            yearly_of_every_month: Joi.string().optional().valid('january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december')
        })).length(1).required(),
        otherwise: Joi.optional()
    }),
    end_date_option: Joi.number().valid(1, 2, 3),
    end_after_occurence: Joi.number().optional().min(1).max(999),
    recurrence_end_date: Joi.date().optional()
});

// Schema to validate update activity task
const schemaEditCreateActivityTask = Joi.object().keys({
    id: Joi.number().required().min(1),
    id_crm_company: Joi.number().optional(),
    id_crm_contact: Joi.number().optional(),
    id_crm_lead: Joi.number().optional(),
    subject: Joi.string().min(1).max(255).optional(),
    due_date: Joi.date().optional(),
    task_status: Joi.string().valid('Not Started','Deferred','In Progress','Completed','Waiting on Someone Else').optional(),
    recurrence_type: Joi.string().required().valid('daily','weekly','monthly','yearly','none').optional(),
    ActivityTaskLinks: Joi.array().items(Joi.object({
        model_name: Joi.string().required().valid('Campaign', 'Lead', 'Contact', 'Company', 'Deal'),
        model_id: Joi.number().required().min(1)
    })),
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
            monthly_day: Joi.number().optional().min(1).max(31),
            monthly_every_month: Joi.number().optional().min(1).max(99),
            monthly_week: Joi.string().optional().valid('first', 'second', 'third', 'fourth', 'last'),
            monthly_day_of_week: Joi.string().optional().valid('day', 'weekday', 'weekend day', 'sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'),
            monthly_of_every_month: Joi.number().optional().min(1).max(99),
        })).length(1).required(),
        otherwise: Joi.optional()
    }),
    Yearly: Joi.when('recurrence_type', {
        is: 'yearly',
        then: Joi.array().items(Joi.object({
            recur_every_year: Joi.number().required().min(1).max(99),
            yearly_option: Joi.string().required().valid('monthly', 'weekly'),
            yearly_on_month: Joi.string().optional().valid('january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december'),
            yearly_on_month_day: Joi.number().optional().min(1).max(31),
            yearly_week: Joi.string().optional().valid('first', 'second', 'third', 'fourth', 'last'),
            yearly_day_of_week: Joi.string().optional().valid('day', 'weekday', 'weekend day', 'sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'),
            yearly_of_every_month: Joi.string().optional().valid('january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december')
        })).length(1).required(),
        otherwise: Joi.optional()
    }),
    end_date_option: Joi.number().valid(1, 2, 3),
    end_after_occurence: Joi.number().optional().min(1).max(999),
    recurrence_end_date: Joi.date().optional()
});

// function to validate schema schemaCreateActivityTask
const validateCreateActivityTask = (input) => {
    return Joi.validate(input, schemaCreateActivityTask, {abortEarly: true});
}
// function to validate schema schemaEditCreateActivityTask
const validateEditActivityTask = (input) => {
    return Joi.validate(input, schemaEditCreateActivityTask, {abortEarly: true});
}

module.exports = {
    validateCreateActivityTask,
    validateEditActivityTask
}
