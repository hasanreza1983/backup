
/*
 * This file is a part of the type CrmAddress
 * Hasan Reza 2018-03-14;
 *
 */

module.exports=`
type CrmAddress {
	id: Int
	address_type: String
	street: String
	city: Int
	city_name: String
	state_province: Int
	state_province_name: String
	zip_code: String
	country: Int
	country_name: String
}

input CrmAddressInput {
	id: Int
	address_type: String
	street: String
	city: Int
	state_province: Int
	zip_code: String
	country: Int
}
`;