/*
 * This file is a part of the type CrmDeal
 * Hasan Reza 2018-04-05;
 *
 */
module.exports=`
type CrmDeal {
	id: Int
	owner: Int
	id_crm_contact: Int
	id_crm_company: Int
	deal_name: String
	deal_type: String
	deal_closing_date: String
	deal_amount: String
	expected_revenue: String
	id_crm_lead_source_master: Int
	id_crm_campaign: Int
	id_crm_pipeline_stage: Int
	next_step: String
	description: String
	Campaign: CrmCampaign
	Company: CrmCompany
	Contact: CrmContact
	LeadSourceMaster: CrmLeadSourceMaster
	PipelineStage: CrmPipelineStage
	OwnerList: [CrmOwner]	
}
input CrmDealInput {
	owner: Int!
	id_crm_contact: Int
	id_crm_company: Int
	deal_name: String!
	deal_type: String
	deal_closing_date: String
	deal_amount: String
	expected_revenue: String
	id_crm_lead_source_master: Int
	id_crm_campaign: Int
	id_crm_pipeline_stage: Int
	next_step: String
	description: String	
}
type CrmDealOutput {
   Deal: CrmDeal
   message: String
}
type CrmDealListOutput {
  Deals: [CrmDeal]
  pageInfo : PageInfo
  message: String
}
type Query {
    getCrmDealById(id: Int!): CrmDealOutput
    getCrmDealListByPage(input: PageInfoInput): CrmDealListOutput
}
type Mutation {
    createCrmDeal(input: CrmDealInput!): CrmDealOutput
    updateCrmDeal(id: Int!, input: CrmDealInput!): CrmDefaultOutput
    deleteCrmDealById(id: [Int!]!): CrmDefaultOutput
}
`;