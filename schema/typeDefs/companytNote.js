
/*
 * This file is a part of the type CrmCompanyNote
 * Hasan Reza 2018-03-28;
 *
 */

module.exports = `
type CrmCompanyNote {
	id: Int
	id_crm_company: Int 
  note_title: String
  note_description: String
  created_at: String
  updated_at: String   
  created_by: Int
  updated_by: Int
  CompanyNoteAttachements : [CrmCompanyNoteAttachement]
}

input CrmCompanyNoteInput {
	id: Int
	id_crm_company: Int 
  note_title: String
  note_description: String
  CompanyNoteAttachements : [CrmCompanyNoteAttachementInput]
}

type CrmCompanyNoteOutput {
   CompanyNote: CrmCompanyNote
   message: String
}

type CrmCompanyNoteListOutput {
  CompanyNotes: [CrmCompanyNote]
  pageInfo : PageInfo
  message: String
}

type Query {
    getCrmCompanyNoteById(id: Int!): CrmCompanyNoteOutput
    getCrmCompanyNoteListByPage( input: PageInfoInput): [CrmCompanyNoteListOutput]
    getAllCrmNotesByCompany(id: Int! whereConditions:  String = "" ): CrmCompanyNoteListOutput
}

type Mutation {
    createCrmCompanyNote(input: CrmCompanyNoteInput!): CrmCompanyNoteOutput
    updateCrmCompanyNote(input: CrmCompanyNoteInput!): CrmCompanyNoteOutput
    deleteCrmCompanyNoteById( input: CrmCompanyNoteInput!): CrmCompanyNoteOutput
}
`;