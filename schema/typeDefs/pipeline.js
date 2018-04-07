
/*
 * This file is a part of the type CrmPipeline
 * Hasan Reza 2018-03-13;
 *
 */

module.exports = `
type CrmPipeline {
	id: Boolean,
	pipeline_name: String,
	is_active: Boolean
}
input CrmPipelineInput {
	id: Boolean,
	pipeline_name: String,
	is_active: Boolean
}

type CrmPipelineOutput {
   CrmPipeline: CrmPipeline,
   message: String
}

type CrmPipelineListOutput {
  CrmPipelines: [CrmPipeline]
  pageInfo : PageInfo
  message: String
}

type Query {
    getCrmPipelineById(id: Int!): [CrmPipelineOutput]
    getCrmPipelineListByPage(input: PageInfoInput): [CrmPipelineListOutput]    
}

type Mutation {
    createCrmPipeline(input: CrmPipelineInput!): [CrmPipelineOutput]
    updateCrmPipeline(input: CrmPipelineInput!): [CrmPipelineOutput]
    deleteCrmPipelineById(id: Int!): [CrmPipelineOutput]
}

`;