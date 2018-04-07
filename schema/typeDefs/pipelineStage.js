
/*
 * This file is a part of the type CrmPipelineStage
 * Hasan Reza 2018-03-13;
 *
 */

module.exports = `
type CrmPipelineStage {
	id: Int,
	id_crm_pipeline: Int,
	stage_name: String,
	win_probabality: String,
	weight: Int,
	CrmPipeline: CrmPipeline
}
type Query {
    getCrmPipelineStageList: [CrmPipelineStage]    
}


`;