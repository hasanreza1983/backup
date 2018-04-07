
/*
 * This file is a part of the type CrmPipeline
 * Hasan Reza 2018-03-13;
 *
 */

module.exports = `
type CrmOwner {
	id: Int
	name: String
}
type Query {
    getCrmOwner: [CrmOwner]    
}

`;