
/*
 * This file is a part of the type CrmCampaignTypeMaster
 * Hasan Reza 2018-04-05;
 *
 */
module.exports = `
type CrmCampaignTypeMaster {
    id: Int
    campaign_type: String
    weight: Boolean
}

type Query {
    getCrmCampaignTypeMasterList: [CrmCampaignTypeMaster]
}
`;