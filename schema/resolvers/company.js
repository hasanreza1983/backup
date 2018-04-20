/*
 * This Resolver File belongs to the Company type
 * Arif Khan 2018-03-14;
 *
 */

const model = require('../../models');
const constant = require('../../lib/constant');
const common = require('../../lib/commonResolver');
const companyValidation = require('../../validation/companyValidation');

const modelIncludes = [{
        model: model.Address,
        as: 'Addresses',
        required: false
    },
    {
        model: model.CompanyOwnershipMaster,
        required: false
    },
    {
        model: model.CompanyStatusMaster,
        required: false
    },
    {
        model: model.CompanyTypeMaster,
        required: false
    },
    {
        model: model.IndustryMaster,
        required: false
    }
];

module.exports = {
    Query: {
        getCrmCompanyById: async (obj, args, context, info) => {
            const response = await common.getCrmModelById(args.id, model.Company, modelIncludes, 'Company');
            response.Company.Addresses = await common.addAddressName(response.Company.Addresses);
            return response;
        },
        getCrmCompanyListByPage: async (obj, args, context, info) => {
            const response = await common.getCrmModelListByPage(args, model.Company, [{
                    model: model.Address,
                    as: 'Addresses',
                    required: false
                }, {
                    model: model.CompanyOwnershipMaster,
                    required: false
                },
                {
                    model: model.IndustryMaster,
                    required: false
                }
            ], 'Companies');
            let Addresses = [];
            response.Companies.forEach(company => {
                Addresses = Addresses.concat(company.Addresses);
            })
            await common.addAddressName(Addresses);
            return response;
        },
        getCrmCompanyList: async (obj, args, context, info) => {
            let result = await model.Company.findAll({
                where: {
                    is_deleted: 0
                },
                attributes: ['id', ['company_name', 'name']]
            });
            result = JSON.parse(JSON.stringify(result));
            return {
                result,
                message: constant.SUCCESS
            }
        }
    },
    Mutation: {
        createCrmCompany: async (obj, args, context, info) => {
            const errors = companyValidation.validateInput(args.input);
            if (errors.error) {
                throw new Error(errors.error.details[0].message);
            }
            args.input.created_by = context.user.id;
            const companyObj = await model.Company.create(args.input, {
                include: modelIncludes
            });
            return {
                Company: companyObj,
                message: constant.SUCCESS
            }
        },
        updateCrmCompany: async (obj, args, context, info) => {
            const errors = companyValidation.validateInput(args.input);
            if (errors.error) {
                throw new Error(errors.error.details[0].message);
            }
            const Addresses = args.input.Addresses;
            delete args.input.Addresses;
            const companyObj = await model.Company.findOne({
                include: modelIncludes,
                where: {
                    id: args.id,
                    is_deleted: 0
                }
            });
            if (companyObj) {
                args.input.updated_by = context.user.id;
                Object.keys(args.input).forEach((e) => {
                    companyObj[e] = args.input[e];
                });
                if (Addresses && Addresses.length) {
                    await common.updateModelAddress(Addresses, model, companyObj);
                }
                await companyObj.save();
            } else {
                throw new Error(constant.DOES_NOT_EXIST);
            }
            return {
                message: constant.SUCCESS
            }
        },
        deleteCrmCompanyById: async (obj, args, context, info) => {
            return await common.deleteModelById(args.id, model.Company, context.user.id);
        }
    }
}