
/*
 * This file is a part of the type CrmRatingMaster
 * Hasan Reza 2018-03-13;
 *
 */

module.exports = `
type CrmRatingMaster {
	id: Int,
	rating: String,
	weight: Int
}

type Query {
    getCrmRatingMasterList: [CrmRatingMaster]   
}
`;