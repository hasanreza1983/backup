
/*
 * This file is a part of the type CrmCampaignStatusMaster
 * Hasan Reza 2018-04-05;
 *
 */
module.exports = `
type CrmCampaignStatusMaster {
    id: Int
    campaign_status: String
    weight: Boolean
}

type Query {
    getCrmCampaignStatusMasterList: [CrmCampaignStatusMaster]
}
`;