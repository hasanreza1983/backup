module.exports = `
type CrmCompany {
	id: Int
	owner: Int
	id_crm_company_status_master: Int
	company_name: String
	registration_number: String
	company_email: String
	phone: String
	fax: String
	website: String
	skype_url: String
	twitter_url: String
	linkedin_url: String
	facebook_url: String
	id_crm_company_type_master: Int
    id_crm_industry_master: Int
	id_crm_company_ownership_master: Int
	no_of_employees: Int
	annual_revenue: Int
	description: String
	created_at: Int
	updated_at: Int
    created_by: Int
	updated_by: Int
	Addresses: [CrmAddress]
	CompanyOwnershipMaster: CrmCompanyOwnershipMaster
	CompanyStatusMaster: CrmCompanyStatusMaster
	CompanyTypeMaster: CrmCompanyTypeMaster
	IndustryMaster: CrmIndustryMaster
}

input CreateCrmCompanyInput {
	owner: Int!
    id_crm_company_status_master: Int!
	company_name: String!
	registration_number: String
	company_email: String
	phone: String
	fax: String
	website: String
	skype_url: String
	twitter_url: String
	linkedin_url: String
	facebook_url: String
	id_crm_company_type_master: Int
    id_crm_industry_master: Int
	id_crm_company_ownership_master: Int
	no_of_employees: Int
	annual_revenue: Int
	description: String
	Addresses: [CrmAddressInput]
}
input EditCrmCompanyInput {
	id: Int!
	owner: Int
    id_crm_company_status_master: Int
	company_name: String
	registration_number: String
	company_email: String
	phone: String
	fax: String
	website: String
	skype_url: String
	twitter_url: String
	linkedin_url: String
	facebook_url: String
	id_crm_company_type_master: Int
    id_crm_industry_master: Int
	id_crm_company_ownership_master: Int
	no_of_employees: Int
	annual_revenue: Int
	description: String
	Addresses: [CrmAddressInput]
}
type CrmCompanyOutput {
    Company: CrmCompany
    message: String
}
type CrmCompanyListOutput {
    Companies: [CrmCompany]
    pageInfo : PageInfo
    message: String
}
type Query {
    getCrmCompanyById(id: Int!): CrmCompanyOutput
	getCrmCompanyListByPage(input: PageInfoInput): CrmCompanyListOutput
	getCrmCompanyList: CrmCommonListOutput
}
type Mutation {
    createCrmCompany(input: CreateCrmCompanyInput!): CrmCompanyOutput
    updateCrmCompany(input: EditCrmCompanyInput!): CrmCompanyOutput
	deleteCrmCompanyById(id: [Int!]!): CrmDeleteListOutput
}
`;