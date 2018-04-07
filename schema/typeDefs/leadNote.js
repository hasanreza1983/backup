
/*
 * This file is a part of the type CrmLeadNote
 * Hasan Reza 2018-03-28;
 *
 */

module.exports = `
type CrmLeadNote {
	id: Int
	id_crm_lead: Int 
  note_title: String
  note_description: String
  created_at: String
  updated_at: String   
  created_by: Int
  updated_by: Int
  LeadNoteAttachements : [CrmLeadNoteAttachement]
}

input CrmLeadNoteInput {
	id: Int
	id_crm_lead: Int 
  note_title: String
  note_description: String
  LeadNoteAttachements : [CrmLeadNoteAttachementInput]
}

type CrmLeadNoteOutput {
   LeadNote: CrmLeadNote
   message: String
}

type CrmLeadNoteListOutput {
  LeadNotes: [CrmLeadNote]
  pageInfo : PageInfo
  message: String
}

type Query {
    getCrmLeadNoteById(id: Int!): CrmLeadNoteOutput
    getCrmLeadNoteListByPage( input: PageInfoInput): [CrmLeadNoteListOutput]
    getAllCrmNotesByLead(id: Int! whereConditions:  String = "" ): CrmLeadNoteListOutput
}

type Mutation {
    createCrmLeadNote(input: CrmLeadNoteInput!): CrmLeadNoteOutput
    updateCrmLeadNote(input: CrmLeadNoteInput!): CrmLeadNoteOutput
    deleteCrmLeadNoteById( input: CrmLeadNoteInput!): CrmLeadNoteOutput
}
`;