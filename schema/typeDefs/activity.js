/*
 * This file is a part of the type CrmActivity
 * Arif Khan 2018-04-12;
 *
 */

module.exports = `
type CrmActivity {
    id: Int
    owner: Int
    activity_type: String
    subject: String
    company_name: String
    contact_name: String
    status: Int
    due_date: String
}
type CrmActivityModel {
    id: Int
    owner: Int
    activity_type: String
    subject: String
    schedule_date: String
}
input CrmDeleteActivity {
    Task: [Int]
    Event: [Int]
    Call: [Int]
}
type CrmActivityListOutput {
    result: [CrmActivity]
    pageInfo : PageInfo
    message: String
}
type CrmActivityModelListOutput {
    result: [CrmActivityModel]
    totalCounts : Int
    message: String
}
type Query {
    getCrmActivityListByModel(input: ModelInput): CrmActivityModelListOutput
    getCrmActivityListByPage(input: PageInfoInput): CrmActivityListOutput
}

`;