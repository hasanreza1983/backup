
/*
 * This file is a part of the type CrmCampaignTypeMaster
 * Hasan Reza 2018-04-05;
 *
 */

module.exports=`
type CrmCampaignTypeMaster {
	id: Int,
	campaign_type: String,
	weight: Boolean
}
input CrmCampaignTypeMasterInput {
	id: Int,
	campaign_type: String,
	weight: Boolean
}

type CrmCampaignTypeMasterOutput {
   CrmCampaignTypeMaster: CrmCampaignTypeMaster,
   message: String
}

type CrmCampaignTypeMasterListOutput {
  CrmCampaignTypeMasters: [CrmCampaignTypeMaster]
  pageInfo : PageInfo
  message: String
}

type Query {
    getCrmCampaignTypeMasterById(id: Int!): CrmCampaignTypeMasterOutput
    getCrmCampaignTypeMasterListByPage(input: PageInfoInput): CrmCampaignTypeMasterListOutput
    getAllCrmCampaignTypeMaster(whereConditions:  String = "" ): CrmCampaignTypeMasterListOutput
}

type Mutation {
    createCrmCampaignTypeMaster(input: CrmCampaignTypeMasterInput!): CrmCampaignTypeMasterOutput
    updateCrmCampaignTypeMaster(input: CrmCampaignTypeMasterInput!): CrmCampaignTypeMasterOutput
    deleteCrmCampaignTypeMasterById(id: Int!): CrmCampaignTypeMasterOutput
}

`;