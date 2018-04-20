module.exports = `
type CrmContact {
	id: Int
	owner: Int
    id_crm_lead_contact_parent: Int
    id_crm_company: Int
	home_phone: String
	department: String
	date_of_birth: String
	assistant_name: String
	assistant_parent_id: Int
	assistant_phone: String
	reports_to_name: String
    reports_to_parent_id: Int
    id_crm_pipeline_stage: Int
	created_at: String
	updated_at: String
    created_by: Int
	updated_by: Int
	LeadContactParent: CrmLeadContactParent
	Company: CrmCompany
	Assistant: CrmContact
    ReportsTo: CrmContact
	PipelineStage: CrmPipelineStage
	Addresses: [CrmAddress]
	Campaigns: [CrmCampaign]
}

input CrmContactInput {
	owner: Int!
	id_crm_company: Int!
	home_phone: String
	department: String
	date_of_birth: String
	assistant_name: String
	assistant_parent_id: Int
	assistant_phone: String
    reports_to_name: String
    reports_to_parent_id: Int
    id_crm_pipeline_stage: Int
	LeadContactParent: CrmLeadContactParentInput!
	Addresses: [CrmAddressInput]
}
type CrmContactOutput {
    Contact: CrmContact
    message: String
}
type CrmContactListOutput {
    Contacts: [CrmContact]
    pageInfo : PageInfo
    message: String
}
type Query {
    getCrmContactById(id: Int!): CrmContactOutput
	getCrmContactListByPage(input: PageInfoInput): CrmContactListOutput
	getCrmContactList: CrmCommonListOutput
	getCrmContactCampaigns(id: Int!): CrmContactOutput 
}
type Mutation {
    createCrmContact(input: CrmContactInput!): CrmContactOutput
    updateCrmContact(id: Int!, input: CrmContactInput!): CrmDefaultOutput
	deleteCrmContactById(id: [Int!]!): CrmDefaultOutput
}
`;