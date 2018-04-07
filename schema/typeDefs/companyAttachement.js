
/*
 * This file is a part of the type CrmCompanyAttachement
 * Hasan Reza 2018-03-28;
 *
 */

module.exports = `
type CrmCompanyAttachement {
	id: Int
	id_crm_company: Int
	minio_file_id: String
	minio_file_url: String
	created_at: Int
	updated_at: Int   
	created_by: Int
	updated_by: Int
	
}
input CrmCompanyAttachementInput {
	id: Int
	id_crm_company: Int
	minio_file_id: String	
}
input CrmCompanyAttachementsInput {	
	id_crm_company: Int
	CompanyAttachements: [CrmCompanyAttachementInput]		
}

type CrmCompanyAttachementOutput {   
   CompanyAttachements: [CrmCompanyAttachement]
   message: String
}


type Query {
   	getAllCrmCompanyAttachementsByCompany(id: Int! whereConditions:  String = "" ): CrmCompanyAttachementOutput
}

type Mutation {
    createCrmCompanyAttachement(input: CrmCompanyAttachementsInput!): CrmCompanyAttachementOutput   
    deleteCrmCompanyAttachementById(input: CrmCompanyAttachementInput!): CrmCompanyAttachementOutput
}
`;