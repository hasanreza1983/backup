
/*
 * This file is a part of the type CrmContactAttachement
 * Hasan Reza 2018-03-28;
 *
 */

module.exports = `
type CrmContactAttachement {
	id: Int
	id_crm_contact: Int
	minio_file_id: String
	minio_file_url: String
	created_at: Int
	updated_at: Int   
	created_by: Int
	updated_by: Int
	
}
input CrmContactAttachementInput {
	id: Int
	id_crm_contact: Int
	minio_file_id: String	
}
input CrmContactAttachementsInput {	
	id_crm_contact: Int
	ContactAttachements: [CrmContactAttachementInput]		
}

type CrmContactAttachementOutput {   
   ContactAttachements: [CrmContactAttachement]
   message: String
}


type Query {
   	getAllCrmContactAttachementsByContact(id: Int! whereConditions:  String = "" ): CrmContactAttachementOutput
}

type Mutation {
    createCrmContactAttachement(input: CrmContactAttachementsInput!): CrmContactAttachementOutput   
    deleteCrmContactAttachementById(input: CrmContactAttachementInput!): CrmContactAttachementOutput
}
`;