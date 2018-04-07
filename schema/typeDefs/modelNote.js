
/*
 * This file is a part of the type ModelNote
 * Hasan Reza 2018-04-12;
 *
 */

module.exports=`
type CrmModelNote {
	id: Int
	model_name: String
	model_id: Int
	note_title: String
    note_description: String
    ModelNoteAttachements : [CrmModelNoteAttachment]
}
input CrmModelNoteInput {
	id: Int
	model_name: String
	model_id: Int
	note_title: String
    note_description: String
    ModelNoteAttachements : [CrmModelNoteAttachmentInput]
}

input CrmModelNotesGetInput {
	id: Int
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
    getCrmModelNoteById(id: Int!): CrmModelNoteOutput
    getCrmModelNoteListByPage(input: PageInfoInput): CrmModelNoteListOutput
    getAllCrmNotesByModel(input: CrmModelNotesGetInput! ): CrmModelNoteListOutput
}

type Mutation {
    createCrmModelNote(input: CrmModelNoteInput!): CrmModelNoteOutput
    updateCrmModelNote(input: CrmModelNoteInput!): CrmModelNoteOutput
    deleteCrmModelNoteById(id: Int!): CrmModelNoteOutput
}

`;