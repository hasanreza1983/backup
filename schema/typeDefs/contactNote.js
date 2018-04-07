
/*
 * This file is a part of the type CrmContactNote
 * Hasan Reza 2018-03-28;
 *
 */

module.exports = `
type CrmContactNote {
	id: Int
	id_crm_contact: Int 
  note_title: String
  note_description: String
  created_at: String
  updated_at: String   
  created_by: Int
  updated_by: Int
  ContactNoteAttachements : [CrmContactNoteAttachement]
}

input CrmContactNoteInput {
	id: Int
	id_crm_contact: Int 
  note_title: String
  note_description: String
  ContactNoteAttachements : [CrmContactNoteAttachementInput]
}

type CrmContactNoteOutput {
   ContactNote: CrmContactNote
   message: String
}

type CrmContactNoteListOutput {
  ContactNotes: [CrmContactNote]
  pageInfo : PageInfo
  message: String
}

type Query {
    getCrmContactNoteById(id: Int!): CrmContactNoteOutput
    getCrmContactNoteListByPage( input: PageInfoInput): [CrmContactNoteListOutput]
    getAllCrmNotesByContact(id: Int! whereConditions:  String = "" ): CrmContactNoteListOutput
}

type Mutation {
    createCrmContactNote(input: CrmContactNoteInput!): CrmContactNoteOutput
    updateCrmContactNote(input: CrmContactNoteInput!): CrmContactNoteOutput
    deleteCrmContactNoteById( input: CrmContactNoteInput!): CrmContactNoteOutput
}
`;