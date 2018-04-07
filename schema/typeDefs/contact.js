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
    is_deleted: Boolean
	created_at: Int
	updated_at: Int
    deleted_at: Int
    created_by: Int
	updated_by: Int
    deleted_by: Int
	LeadContactParent: CrmLeadContactParent
	Company: CrmCompany
	Assistant: CrmContact
    ReportsTo: CrmContact
	PipelineStage: CrmPipelineStage
	Addresses: [CrmAddress]
	Campaigns: [CrmCampaign]
}

input CreateCrmContactInput {
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
input EditCrmContactInput {
	id: Int!
	owner: Int
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
	LeadContactParent: CrmLeadContactParentInput
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
    createCrmContact(input: CreateCrmContactInput!): CrmContactOutput
    updateCrmContact(input: EditCrmContactInput!): CrmContactOutput
	deleteCrmContactById(id: [Int!]!): CrmDeleteListOutput
}
`;