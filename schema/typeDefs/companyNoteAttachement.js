
/*
 * This file is a part of the type CrmCompanyNoteAttachement
 * Hasan Reza 2018-03-30;
 *
 */

module.exports = `
type CrmCompanyNoteAttachement {
	id: Int
	id_crm_company_note: Int
	minio_file_id: String
	minio_file_url: String
}

input CrmCompanyNoteAttachementInput {
	id: Int
	id_crm_company_note: Int
	minio_file_id: String
	minio_file_url: String
	is_removed: Boolean = "false",
}
`;