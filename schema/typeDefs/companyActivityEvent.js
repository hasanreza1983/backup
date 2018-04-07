/*
 * This file is a part of the type CrmCompanyActivityEvent
 * Arif Khan 2018-04-06;
 *
 */

module.exports = `
type CrmCompanyActivityEvent {
	id: Int
    id_crm_company: Int
    owner: Int
	title: String
    location: String
    event_start_time: String
	event_end_time: String
	description: String
	created_at: Int
	updated_at: Int
    created_by: Int
	updated_by: Int
    Participants: [CrmActivityEventParticipant]
}
input CreateCrmCompanyActivityEventInput {
    id_crm_company: Int!
    owner: Int!
	title: String!
    location: String
    event_start_time: String!
	event_end_time: String
	description: String
	created_at: Int
	updated_at: Int
    created_by: Int
	updated_by: Int
    Participants: [CrmActivityEventParticipantInput]
}
input EditCrmCompanyActivityEventInput {
    id: Int!
    id_crm_company: Int
    owner: Int
	title: String
    location: String
    event_start_time: String
	event_end_time: String
	description: String
	created_at: Int
	updated_at: Int
    created_by: Int
	updated_by: Int
    Participants: [CrmActivityEventParticipantInput]
}
type CrmCompanyActivityEventOutput {
    CompanyActivityEvent: CrmCompanyActivityEvent
    message: String
}
type CrmCompanyActivityEventListOutput {
    CompanyActivityEvents: [CrmCompanyActivityEvent]
    pageInfo : PageInfo
    message: String
}
type Query {
    getCrmCompanyActivityEventById(id: Int!): CrmCompanyActivityEventOutput
    getCrmCompanyActivityEventListByPage(input: PageInfoInput): CrmCompanyActivityEventListOutput
}
type Mutation {
    createCrmCompanyActivityEvent(input: CreateCrmCompanyActivityEventInput!): CrmCompanyActivityEventOutput
    updateCrmCompanyActivityEvent(input: EditCrmCompanyActivityEventInput!): CrmCompanyActivityEventOutput
    deleteCrmCompanyActivityEventById(id: [Int!]!): CrmDeleteListOutput
}

`;