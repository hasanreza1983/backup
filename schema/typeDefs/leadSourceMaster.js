/*
 * This file is a part of the type CrmLeadSourceMaster
 * Hasan Reza 2018-03-13;
 *
 */

module.exports=`
type CrmLeadSourceMaster {
	id: Int,
	source: String,
	weight: Int
}
input CrmLeadSourceMasterInput {
	id: Int,
	source: String,
	weight: Int
}
type Query {
    getCrmLeadSourceMasterList: [CrmLeadSourceMaster]
}
`;