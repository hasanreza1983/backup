module.exports = `
type CrmCompanyOwnershipMaster {
	id: Int
	company_ownership: String
    weight: Int
}
type Query {
    getCrmCompanyOwnershipMasterList: [CrmCompanyOwnershipMaster]
}
`;