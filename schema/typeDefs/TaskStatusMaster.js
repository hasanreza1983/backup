module.exports = `
type CrmTaskStatusMaster {
	id: Int
	task_status: String
    weight: Int
}
type Query {
    getCrmTaskStatusMasterList: [CrmTaskStatusMaster]
}
`;