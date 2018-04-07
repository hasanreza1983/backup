
/*
 * This file is a part of the type CrmRecurrenceWeeklyDetail
 * Arif Khan 2018-03-23;
 *
 */

module.exports = `
type CrmRecurrenceWeeklyDetail {
    recur_every_week: Int
    weekly_monday: Boolean
    weekly_tuesday: Boolean
    weekly_wednesday: Boolean
    weekly_thursday: Boolean
    weekly_friday: Boolean
    weekly_saturday: Boolean
    weekly_sunday: Boolean
}
input CrmRecurrenceWeeklyDetailInput {
	recur_every_week: Int
    weekly_monday: Boolean
    weekly_tuesday: Boolean
    weekly_wednesday: Boolean
    weekly_thursday: Boolean
    weekly_friday: Boolean
    weekly_saturday: Boolean
    weekly_sunday: Boolean
}

`;