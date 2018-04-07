
/*
 * This file is a part of the type CrmLeadNoteAttachement
 * Hasan Reza 2018-03-30;
 *
 */

module.exports = `
type CrmLeadNoteAttachement {
	id: Int
	id_crm_lead_note: Int
	minio_file_id: String
	minio_file_url: String
}

input CrmLeadNoteAttachementInput {
	id: Int
	id_crm_lead_note: Int
	minio_file_id: String
	minio_file_url: String
	is_removed: Boolean = "false",
}
`;