
/*
 * This file is a part of the type CrmLeadStatusMaster
 * Hasan Reza 2018-03-13;
 *
 */

module.exports = `
type CrmLeadStatusMaster {
	id: Int,
	status: String,
	weight: Int
}
type Query {
    getCrmLeadStatusMasterList: [CrmLeadStatusMaster]   
}


`;