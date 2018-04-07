/*
 * This file is a part of the type CrmDealPipelineHistory
 * Hasan Reza 2018-04-05;
 *
 */
module.exports = `
type CrmDealPipelineHistory {
	id: Int
	id_crm_deal: Int
	id_crm_pipeline_stage: Boolean
	amount: Float
	expected_revenue: String
	closing_date: String
	stage_duration: String
	created_by: Int
	updated_by: Int
	deleted_by: Int
}
input CrmDealPipelineHistoryInput {
	id: Int
	id_crm_deal: Int
	id_crm_pipeline_stage: Boolean
	amount: Float
	expected_revenue: String
	closing_date: String
	stage_duration: String
	created_by: Int
	updated_by: Int
	deleted_by: Int
}
type CrmDealPipelineHistoryOutput {
   CrmDealPipelineHistory: CrmDealPipelineHistory
   message: String
}
type CrmDealPipelineHistoryListOutput {
  CrmDealPipelineHistorys: [CrmDealPipelineHistory]
  pageInfo : PageInfo
  message: String
}
type Query {
    getCrmDealPipelineHistoryById(id: Int!): CrmDealPipelineHistoryOutput
    getCrmDealPipelineHistoryListByPage(input: PageInfoInput): CrmDealPipelineHistoryListOutput
    getAllCrmDealPipelineHistory(whereConditions:  String = "" ): CrmDealPipelineHistoryListOutput
}
type Mutation {
    createCrmDealPipelineHistory(input: CrmDealPipelineHistoryInput!): CrmDealPipelineHistoryOutput
    updateCrmDealPipelineHistory(input: CrmDealPipelineHistoryInput!): CrmDealPipelineHistoryOutput
    deleteCrmDealPipelineHistoryById(id: Int!): CrmDealPipelineHistoryOutput
}
`;