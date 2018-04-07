
/*
 * This file is a part of the type CrmLeadAttachement
 * Hasan Reza 2018-03-28;
 *
 */

module.exports = `
type CrmLeadAttachement {
	id: Int
	id_crm_lead: Int
	minio_file_id: String
	minio_file_url: String
	created_at: Int
	updated_at: Int   
	created_by: Int
	updated_by: Int
	
}
input CrmLeadAttachementInput {
	id: Int
	id_crm_lead: Int
	minio_file_id: String	
}
input CrmLeadAttachementsInput {	
	id_crm_lead: Int
	LeadAttachements: [CrmLeadAttachementInput]		
}

type CrmLeadAttachementOutput {   
   LeadAttachements: [CrmLeadAttachement]
   message: String
}


type Query {
   	getAllCrmLeadAttachementsByLead(id: Int! whereConditions:  String = "" ): CrmLeadAttachementOutput
}

type Mutation {
    createCrmLeadAttachement(input: CrmLeadAttachementsInput!): CrmLeadAttachementOutput   
    deleteCrmLeadAttachementById(input: CrmLeadAttachementInput!): CrmLeadAttachementOutput
}
`;