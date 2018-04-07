/*
 * This file is a part of the type CrmRecurrenceMonthlyDetail
 * Arif Khan 2018-03-23;
 *
 */

module.exports = `
type CrmRecurrenceMonthlyDetail {
    monthly_option: String
    monthly_day: Int
    monthly_every_month: Int
    monthly_week: String
    monthly_day_of_week: String
    monthly_of_every_month: Int
}
input CrmRecurrenceMonthlyDetailInput {
    monthly_option: String
    monthly_day: Int
    monthly_every_month: Int
    monthly_week: String
    monthly_day_of_week: String
    monthly_of_every_month: Int
}

`;