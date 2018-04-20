
/*
 * This file is a part of the type ModelNote
 * Hasan Reza 2018-04-12;
 *
 */

module.exports = `
type CrmModelNote {
	id: Int
	model_name: String
	model_id: Int
	note_title: String
    note_description: String
    created_at: String
    created_by: Int
    updated_at: String
	updated_by: Int
    ModelNoteAttachments : [CrmModelNoteAttachment]
}
input CrmModelNoteInput {
	model_name: String!
	model_id: Int!
	note_title: String
    note_description: String
    ModelNoteAttachments : [CrmModelNoteAttachmentInput]
}

input CrmModelNotesInput {
	model_name: String!
	model_id: Int!
}

type CrmModelNoteOutput {
   ModelNote: CrmModelNote
   message: String
}

type CrmModelNoteListOutput {
  ModelNotes: [CrmModelNote]
  pageInfo : PageInfo
  message: String
}

type Query {
    getAllCrmNotesByModel(input: CrmModelNotesInput! ): CrmModelNoteListOutput
}

type Mutation {
    createCrmModelNote(input: CrmModelNoteInput!): CrmModelNoteOutput
    updateCrmModelNote(id: Int!, input: CrmModelNoteInput!): CrmDefaultOutput
    deleteCrmModelNote(id: Int!): CrmDefaultOutput
}
`;