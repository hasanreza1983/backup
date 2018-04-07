
/*
 * This file is a part of the type CrmContactNoteAttachement
 * Hasan Reza 2018-03-30;
 *
 */

module.exports = `
type CrmContactNoteAttachement {
	id: Int
	id_crm_contact_note: Int
	minio_file_id: String
	minio_file_url: String
}

input CrmContactNoteAttachementInput {
	id: Int
	id_crm_contact_note: Int
	minio_file_id: String
	minio_file_url: String
	is_removed: Boolean = "false",
}
`;