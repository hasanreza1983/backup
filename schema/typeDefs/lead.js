
/*
 * This file is a part of the type CrmLead
 * Hasan Reza 2018-03-13;
 *
 */

module.exports = `

type CrmLead {
	id: Int
	owner: Int
	id_crm_lead_contact_parent: Int
	company_name: String
	id_crm_lead_status_master: Int
	id_crm_rating_master: Int
	no_of_employees: Int
	annual_revenue: Int
	id_crm_industry_master: Int
	id_crm_pipeline_stage:  Int
	fax: String
	website: String
	skype_url: String
	twitter_url: String
	linkedin_url: String
	facebook_url: String
	is_lead_converted: Boolean
	created_by: Int
	updated_by: Int
	deleted_by: Int
	IndustryMaster: CrmIndustryMaster
	LeadContactParent: CrmLeadContactParent
	LeadStatusMaster: CrmLeadStatusMaster
	PipelineStage: CrmPipelineStage
	RatingMaster: CrmRatingMaster
	Addresses: [CrmAddress]
	Campaigns: [CrmCampaign]

}
input CrmLeadInput {
	id: Int
	owner: Int
	company_name: String
	id_crm_lead_status_master: Int
	id_crm_rating_master: Int
	no_of_employees: Int
	annual_revenue: Int
	id_crm_industry_master: Int
	id_crm_pipeline_stage:  Int
	fax: String
	website: String
	skype_url: String
	twitter_url: String
	linkedin_url: String
	facebook_url: String
	id_crm_lead_contact_parent: Int
	LeadContactParent: CrmLeadContactParentInput
	Addresses: [CrmAddressInput]	
}

type CrmLeadOutput {
   Lead: CrmLead
   message: String
}

type CrmLeadListOutput {
  Leads: [CrmLead]
  pageInfo : PageInfo
  message: String
}

type Query {
    getCrmLeadById(id: Int!): CrmLeadOutput
	getCrmLeadListByPage(input: PageInfoInput): CrmLeadListOutput   
	getCrmLeadCampaigns(id: Int!): CrmLeadOutput 
}

type Mutation {
    createCrmLead(input: CrmLeadInput!): CrmLeadOutput
    updateCrmLead(input: CrmLeadInput!): CrmLeadOutput
	deleteCrmLeadById(id: [Int!]!): CrmDeleteListOutput	
	convertCrmLeadById(id: Int!): CrmLeadOutput
}
`;