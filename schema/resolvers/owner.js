/*
 * This Resolver File belongs to the auth service user
 * Hasan Reza 2018-03-30;
 *
 */

const model = require('../../models');

module.exports = {
    Query: {
        getCrmOwner: async (obj, args, context, info) => {
            return [
                {
                    id: 1,
                    name: "Krishna"
                },
                {
                    id: 786,
                    name: "Arif Khan"
                },
                {
                    id: 3,
                    name: "Ankit Gupta"
                },
                {
                    id: 4,
                    name: "Kaushal Solanki"
                },
                {
                    id: 5,
                    name: "Hasan"
                }
            ];
        }
    }
}