
/*
 * This file is a part of the type CrmIndustryMaster
 * Hasan Reza 2018-03-13;
 *
 */

module.exports=`
type CrmIndustryMaster {
	id: Int,
	industry_name: String,
	weight: Int
}
type Query {
    getCrmIndustryMasterList: [CrmIndustryMaster]    
}

`;