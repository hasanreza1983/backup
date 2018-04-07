
/*
 * This file is a part of the type ModelAttachment
 * Hasan Reza 2018-04-12;
 *
 */

module.exports = `
type CrmModelAttachment {
	id: Int
	model_name: String
	model_id: Int
    minio_file_id: String
    minio_file_url: String
    created_at: String
	created_by: Int	
}
input CrmModelAttachmentInput {
    id: Int
    minio_file_id: String    
}

input CrmModelAttachmentsInput {	
	model_name: String
	model_id: Int
	ModelAttachments: [CrmModelAttachmentInput]		
}


type CrmModelAttachmentOutput {
   ModelAttachment: CrmModelAttachment
   message: String
}

type CrmModelAttachmentListOutput {
  ModelAttachments: [CrmModelAttachment]
  pageInfo : PageInfo
  message: String
}

type Query {   
    getCrmModelAttachmentList(input: CrmModelAttachmentsInput!): CrmModelAttachmentListOutput   
}
type Mutation {
    createCrmModelAttachment(input: CrmModelAttachmentsInput!): CrmModelAttachmentOutput    
    deleteCrmModelAttachmentById(input: CrmModelAttachmentInput!): CrmModelAttachmentOutput
}

`;