/*
 * This file is a part of the type CrmLeadActivityTask
 * Arif Khan 2018-04-05;
 *
 */

module.exports = `
type CrmLeadActivityTask {
	id: Int
    id_crm_lead: Int
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
input CreateCrmLeadActivityTaskInput {
    id_crm_lead: Int!
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
input EditCrmLeadActivityTaskInput {
    id: Int!
    id_crm_lead: Int
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
type CrmLeadActivityTaskOutput {
    LeadActivityTask: CrmLeadActivityTask
    message: String
}
type CrmLeadActivityTaskListOutput {
    LeadActivityTasks: [CrmLeadActivityTask]
    pageInfo : PageInfo
    message: String
}
type Query {
    getCrmLeadActivityTaskById(id: Int!): CrmLeadActivityTaskOutput
    getCrmLeadActivityTaskListByPage(input: PageInfoInput): CrmLeadActivityTaskListOutput
}
type Mutation {
    createCrmLeadActivityTask(input: CreateCrmLeadActivityTaskInput!): CrmLeadActivityTaskOutput
    updateCrmLeadActivityTask(input: EditCrmLeadActivityTaskInput!): CrmLeadActivityTaskOutput
    deleteCrmLeadActivityTaskById(id: [Int!]!): CrmDeleteListOutput
}

`;