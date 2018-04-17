/*
 * This file is a part of the type ModelNoteAttachment
 * Hasan Reza 2018-04-12;
 *
 */
module.exports = `
type CrmModelNoteAttachment {
	id: Int
	id_crm_model_note: Int
	minio_file_id: String
	minio_file_url: String
	created_at: String
    created_by: Int 
}

input CrmModelNoteAttachmentInput {
	id: Int
	id_crm_model_note: Int
	minio_file_id: String
	minio_file_url: String
	is_removed: Boolean = "false",
}
`;