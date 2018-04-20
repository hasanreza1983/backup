/*
 * The file contains all the common types to be used in all other types.
 * Hasan Reza 2018-03-13;
 *
 */
module.exports = `
type PageInfo {
    totalCounts: Int
    totalPages :Int
    currentPage: Int
    pageSize: Int
    sort: [String]
}
input PageInfoInput {
    currentPage: Int = 1
    pageSize: Int = 10
    filter: String
    sort: [String] = ["created_at", "desc"]
}
type ModelOutput {
    model_id: Int
    model_name: String
}
input ModelInput {
    model_id: Int!
    model_name: String!
}
type CrmCommonOutput {
    id: Int
    name: String
}
type CrmCommonListOutput {
    result: [CrmCommonOutput]
    message: String
}
type CrmDefaultOutput {
    message: String
}
`;