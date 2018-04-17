
/*
 * This file is a part of the type CrmProduct
 * Hasan Reza 2018-04-17;
 *
 */

module.exports=`
type CrmProduct {
	id: Int,
	owner: Int,
	product_name: String,
	product_code: String,
	product_sku: String,
	product_display_url: String,
	description: String,
	is_active: Boolean
}
input CrmProductInput {
	id: Int,
	owner: Int,
	product_name: String,
	product_code: String,
	product_sku: String,
	product_display_url: String,
	description: String,
	is_active: Boolean
}

type CrmProductOutput {
   Product: CrmProduct,
   message: String
}

type CrmProductListOutput {
  Products: [CrmProduct]
  pageInfo : PageInfo
  message: String
}

type Query {
    getCrmProductById(id: Int!): CrmProductOutput
    getCrmProductListByPage(input: PageInfoInput): CrmProductListOutput
    getAllCrmProduct(whereConditions:  String = "" ): CrmProductListOutput
}

type Mutation {
    createCrmProduct(input: CrmProductInput!): CrmProductOutput
    updateCrmProduct(input: CrmProductInput!): CrmProductOutput
    deleteCrmProductById(id: Int!): CrmProductOutput
}

`;