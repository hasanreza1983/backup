/*
 * This file is a part of the type CrmActivityCall
 * Arif Khan 2018-04-16;
 *
 */

module.exports = `
type CrmActivityCall {
	id: Int
    owner: Int
	subject: String
    call_type: String
    call_details: String
    call_start_time: String
    call_duration: Int
    result: String
	description: String
	created_at: String
	updated_at: String
    created_by: Int
    updated_by: Int
    ActivityCallLinks: [ModelOutput]
}
input CrmActivityCallInput {
    owner: Int!
	subject: String!
    call_type: String
    call_details: String!
    call_start_time: String
    call_duration: Int
    result: String
	description: String
    ActivityCallLinks: [ModelInput!]!
}
type CrmActivityCallOutput {
    result: CrmActivityCall
    message: String
}
type Query {
    getCrmActivityCallById(id: Int!): CrmActivityCallOutput
}
type Mutation {
    createCrmActivityCall(input: CrmActivityCallInput!): CrmActivityCallOutput
    updateCrmActivityCall(id: Int!, input: CrmActivityCallInput!): CrmDefaultOutput
    deleteCrmActivityCallById(id: [Int!]!): CrmDefaultOutput
}

`;