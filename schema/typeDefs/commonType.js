/*
 * The file contains all the common types to be used in all other types.
 * Hasan Reza 2018-03-13;
 *
 */
module.exports = `
type PageInfo {
    totalCounts: Int,
    totalPages :Int,
    currentPage: Int,
    pageSize: Int,
    sortField: String,
    sortDirection: String,
    filterField: String,
    filterValue: String,
    whereConditions: String
}
input PageInfoInput {
    currentPage: Int = 1,
    pageSize: Int = 10,
    sortField: String = "created_at",
    sortDirection: String = "DESC",
    filterField: String = "",
    filterValue: String = "" ,
    whereConditions: String = ""
    filter: String
}
type ModelOutput {
    model_id: Int
    model_name: String
}
input ModelInput {
    model_id: Int!
    model_name: String!
}
type CrmCommonOutput {
    id: Int
    name: String
}
type CrmCommonListOutput {
    result: [CrmCommonOutput]
    message: String
}
type CrmDefaultOutput {
    message: String
}
type CrmDeleteListOutput {
    id: [Int],
    message: String
}
input CrmCampaignsAssignInput {
    id: Int
	model_name: String!
    model_id: Int!
    id_crm_campaign_status_master: Int!	
    Campaigns: [Int!]!
}

input CrmCampaignAssignAlterInput {
    id: Int!
	model_name: String!
    model_id: Int! 
    id_crm_campaign_status_master: Int  
}

type Mutation {
    assignCrmCampaignsToModel(input: CrmCampaignsAssignInput!): CrmDefaultOutput
    unAssignCrmCampaignsToModel(input: CrmCampaignAssignAlterInput!): CrmDefaultOutput
    updateCrmCampaignStatusForModel(input: CrmCampaignAssignAlterInput!): CrmDefaultOutput
}
`;