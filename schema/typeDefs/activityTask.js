/*
 * This file is a part of the type CrmActivityTask
 * Arif Khan 2018-03-23;
 *
 */

module.exports = `
type CrmActivityTask {
	id: Int
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
    ActivityTaskLinks: [ModelOutput]
    Daily: [CrmRecurrenceDailyDetail]
    Monthly: [CrmRecurrenceMonthlyDetail]
    Weekly: [CrmRecurrenceWeeklyDetail]
    Yearly: [CrmRecurrenceYearlyDetail]
}
input CreateCrmActivityTaskInput {
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
    ActivityTaskLinks: [ModelInput!]!
    Daily: [CrmRecurrenceDailyDetailInput]
    Monthly: [CrmRecurrenceMonthlyDetailInput]
    Weekly: [CrmRecurrenceWeeklyDetailInput]
    Yearly: [CrmRecurrenceYearlyDetailInput]
}
input EditCrmActivityTaskInput {
    id: Int!
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
    ActivityTaskLinks: [ModelInput]
    Daily: [CrmRecurrenceDailyDetailInput]
    Monthly: [CrmRecurrenceMonthlyDetailInput]
    Weekly: [CrmRecurrenceWeeklyDetailInput]
    Yearly: [CrmRecurrenceYearlyDetailInput]
}
type CrmActivityTaskOutput {
    result: CrmActivityTask
    message: String
}
type CrmActivityTaskListOutput {
    result: [CrmActivityTask]
    pageInfo : PageInfo
    message: String
}
type Query {
    getCrmActivityTaskById(id: Int!): CrmActivityTaskOutput
    getCrmActivityTaskListByPage(input: PageInfoInput): CrmActivityTaskListOutput
}
type Mutation {
    createCrmActivityTask(input: CreateCrmActivityTaskInput!): CrmDefaultOutput
    updateCrmActivityTask(input: EditCrmActivityTaskInput!): CrmDefaultOutput
    deleteCrmActivityTaskById(id: [Int!]!): CrmDefaultOutput
}

`;