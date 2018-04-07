/*
 * This file is a part of the type CrmContactActivityTask
 * Arif Khan 2018-03-23;
 *
 */

module.exports = `
type CrmContactActivityTask {
	id: Int
    id_crm_contact: Int
	subject: String
    due_date: String
	task_status: String
	recurrence_type: String
	end_date_option: Int
    end_after_occurence: Int
	recurrence_end_date: String
	description: String
	created_at: Int
	updated_at: Int
    created_by: Int
	updated_by: Int
    daily: [CrmRecurrenceDailyDetail]
    monthly: [CrmRecurrenceMonthlyDetail]
    weekly: [CrmRecurrenceWeeklyDetail]
    yearly: [CrmRecurrenceYearlyDetail]
}
input CreateCrmContactActivityTaskInput {
    id_crm_contact: Int!
	subject: String!
    due_date: String!
	task_status: String
	recurrence_type: String!
	end_date_option: Int
    end_after_occurence: Int
	recurrence_end_date: String
	description: String
	created_at: Int
	updated_at: Int
    created_by: Int
	updated_by: Int
    daily: [CrmRecurrenceDailyDetailInput]
    monthly: [CrmRecurrenceMonthlyDetailInput]
    weekly: [CrmRecurrenceWeeklyDetailInput]
    yearly: [CrmRecurrenceYearlyDetailInput]
}
input EditCrmContactActivityTaskInput {
    id: Int!
    id_crm_contact: Int
	subject: String
    due_date: String
	task_status: String
	recurrence_type: String!
	end_date_option: Int
    end_after_occurence: Int
	recurrence_end_date: String
	description: String
	created_at: Int
	updated_at: Int
    created_by: Int
	updated_by: Int
    daily: [CrmRecurrenceDailyDetailInput]
    monthly: [CrmRecurrenceMonthlyDetailInput]
    weekly: [CrmRecurrenceWeeklyDetailInput]
    yearly: [CrmRecurrenceYearlyDetailInput]
}
type CrmContactActivityTaskOutput {
    ContactActivityTask: CrmContactActivityTask
    message: String
}
type CrmContactActivityTaskListOutput {
    ContactActivityTasks: [CrmContactActivityTask]
    pageInfo : PageInfo
    message: String
}
type Query {
    getCrmContactActivityTaskById(id: Int!): CrmContactActivityTaskOutput
    getCrmContactActivityTaskListByPage(input: PageInfoInput): CrmContactActivityTaskListOutput
}
type Mutation {
    createCrmContactActivityTask(input: CreateCrmContactActivityTaskInput!): CrmContactActivityTaskOutput
    updateCrmContactActivityTask(input: EditCrmContactActivityTaskInput!): CrmContactActivityTaskOutput
    deleteCrmContactActivityTaskById(id: [Int!]!): CrmDeleteListOutput
}

`;