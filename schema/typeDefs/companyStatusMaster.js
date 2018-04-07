module.exports = `
type CrmCompanyStatusMaster {
	id: Int
	company_status: String
    weight: Int
}
type Query {
    getCrmCompanyStatusMasterList: [CrmCompanyStatusMaster]
}
`;