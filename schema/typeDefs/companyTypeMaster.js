module.exports = `
type CrmCompanyTypeMaster {
	id: Int
	company_type: String
    weight: Int
}
type Query {
    getCrmCompanyTypeMasterList: [CrmCompanyTypeMaster]
}
`;