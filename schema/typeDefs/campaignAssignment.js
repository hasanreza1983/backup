/*
 * The file contains all the common types to be used in all other types.
 * Hasan Reza 2018-03-13;
 *
 */
module.exports = `
input CrmCampaignsAssignInput {
    id: Int
	model_name: String!
    model_id: Int!
    id_crm_campaign_status_master: Int!	
    Campaigns: [Int!]!
}

input CrmCampaignsUnassignInput {
	model_name: String!
    model_id: Int!
    Campaigns: [Int!]!
}

input CrmCampaignAssignAlterInput {
    id_crm_campaign: Int!
	model_name: String!
    model_id: Int! 
    id_crm_campaign_status_master: Int!
}

type Mutation {
    assignCrmCampaignsToModel(input: CrmCampaignsAssignInput!): CrmDefaultOutput
    unAssignCrmCampaignsToModel(input: CrmCampaignsUnassignInput!): CrmDefaultOutput
    updateCrmCampaignStatusForModel(input: CrmCampaignAssignAlterInput!): CrmDefaultOutput
}
`;