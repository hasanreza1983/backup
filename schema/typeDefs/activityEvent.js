/*
 * This file is a part of the type CrmActivityEvent
 * Arif Khan 2018-04-06;
 *
 */

module.exports = `
type CrmActivityEvent {
	id: Int
    owner: Int
	subject: String
    location: String
    event_start_time: String
	event_end_time: String
	description: String
	created_at: Int
	updated_at: Int
    created_by: Int
    updated_by: Int
    ActivityEventLinks: [ModelOutput]
    Participants: [CrmActivityEventParticipant]
}
input CrmActivityEventInput {
    owner: Int!
	subject: String!
    location: String
    event_start_time: String!
	event_end_time: String
	description: String
    ActivityEventLinks: [ModelInput!]!
    Participants: [CrmActivityEventParticipantInput]
}
type CrmActivityEventOutput {
    result: CrmActivityEvent
    message: String
}
type Query {
    getCrmActivityEventById(id: Int!): CrmActivityEventOutput
}
type Mutation {
    createCrmActivityEvent(input: CrmActivityEventInput!): CrmActivityEventOutput
    updateCrmActivityEvent(id: Int!, input: CrmActivityEventInput!): CrmDefaultOutput
    deleteCrmActivityEventById(id: [Int!]!): CrmDefaultOutput
}

`;