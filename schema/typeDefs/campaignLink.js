
/*
 * This file is a part of the type CrmCampaignLink
 * Hasan Reza 2018-04-10;
 *
 */

module.exports=`
type CrmCampaignLink {
	id: Int
	model_name: String
	model_id: Int
	id_crm_campaign: Int
	id_crm_campaign_status_master: Int	
}
input CrmCampaignLinkInput {
	id: Int
	model_name: String
	model_id: Int
	id_crm_campaign: Int
	id_crm_campaign_status_master: Int
}
`;