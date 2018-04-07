
/*
 * This file is a part of the type CrmRecurrenceYearlyDetail
 * Arif Khan 2018-03-23;
 *
 */

module.exports = `
type CrmRecurrenceYearlyDetail {
    recur_every_year: Int
    yearly_option: String
    yearly_on_month: String
    yearly_on_month_day: Int
    yearly_week: String
    yearly_day_of_week: String
    yearly_of_every_month: String
}
input CrmRecurrenceYearlyDetailInput {
	recur_every_year: Int
    yearly_option: String
    yearly_on_month: String
    yearly_on_month_day: Int
    yearly_week: String
    yearly_day_of_week: String
    yearly_of_every_month: String
}

`;