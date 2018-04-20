/*
 * This Resolver File belongs to the Lead type
 * Hasan Reza 2018-03-13;
 *
 */

const model = require('../../models');
const leadValidation = require('../../validation/leadValidation');

const constant = require('../../lib/constant');
const common = require('../../lib/commonResolver');
module.exports = {
    Query: {
        getCrmLeadById: async (obj, args, context, info) => {
            const response = await common.getCrmModelById(args.id, model.Lead, [{
                model: model.Address,
                as: 'Addresses',
                required: false
            },
            {
                model: model.IndustryMaster
            },
            {
                model: model.LeadContactParent,
                include: [{
                    model: model.LeadSourceMaster
                },],
            },
            {
                model: model.LeadStatusMaster
            },
            {
                model: model.PipelineStage
            },
            {
                model: model.RatingMaster
            }
            ], 'Lead');
            response.Lead.Addresses = await common.addAddressName(response.Lead.Addresses);
            return response;
        }, // end of getLeadById resolver

        getCrmLeadCampaigns: async (obj, args, context, info) => {
            const response = await common.getCrmModelById(args.id, model.Lead, [{
                model: model.Campaign,
                include: [{
                    model: model.CampaignTypeMaster
                }]
            }], 'Lead');
            return response;

        }, // end of getCrmLeadCampaigns resolver

        getCrmLeadListByPage: async (obj, args, context, info) => {
            let response = await common.getCrmModelListByPage(args, model.Lead, [{
                model: model.Address,
                as: 'Addresses',
                required: false
            },
            {
                model: model.IndustryMaster
            },
            {
                model: model.LeadContactParent,
                include: [{
                    model: model.LeadSourceMaster
                }],
            },
            {
                model: model.LeadStatusMaster
            },
            {
                model: model.PipelineStage
            },
            {
                model: model.RatingMaster
            }
            ], 'Leads');
            let Addresses = [];
            response.Leads.forEach(lead => {
                Addresses = Addresses.concat(lead.Addresses);
            })
            await common.addAddressName(Addresses);
            return response;

        } // end of getAllLeadList resolver

    }, // end of query

    Mutation: {
        createCrmLead: async (obj, args, context, info) => {
            const arrErrors = leadValidation.validateInput(args.input); // validation for Lead input data
            if (arrErrors.error) {
                throw new Error(arrErrors.error.details[0].message);
            }
            try {
                args.input.created_by = context.user.id;
                const objLead = await model.Lead.create(args.input, {
                    include: [{
                        model: model.LeadContactParent
                    },
                    {
                        model: model.Address,
                        as: 'Addresses',
                        required: false
                    }
                    ]
                });
                objLead.Lead = objLead;
                objLead.message = constant.SUCCESS;
                return objLead;
            } catch (err) {
                throw err;
            }
        }, // end of createLead resolver

        updateCrmLead: async (obj, args, context, info) => {
            // Prepare array to validate fields
            const arrErrors = leadValidation.validateInput(args.input); // validation for Lead input data
            if (arrErrors.error) {
                throw new Error(arrErrors.error.details[0].message);
            }
            const Addresses = args.input.Addresses;
            delete args.input.Addresses;
            let filter = {
                include: [{
                    model: model.LeadContactParent
                }],
                where: {
                    id: args.id,
                    is_deleted: 0
                }
            };
            const objLead = await model.Lead.findOne(filter);
            if (objLead) {
                args.input.updated_by = context.user.id;
                if (args.input.LeadContactParent) {
                    Object.keys(args.input.LeadContactParent).forEach((e) => {
                        objLead.LeadContactParent[e] = args.input.LeadContactParent[e];
                    });
                    delete args.input.LeadContactParent;
                }
                if (Addresses && Addresses.length) {
                    await common.updateModelAddress(Addresses, model, objLead);
                }
                Object.keys(args.input).forEach((e) => {
                    objLead[e] = args.input[e];
                });
                await Promise.all([objLead.LeadContactParent.save(), objLead.save()]);
            } else {
                throw new Error(constant.DOES_NOT_EXIST);
            }
            return {
                message: constant.SUCCESS
            };
        }, // end of  updateLead resolver

        deleteCrmLeadById: async (obj, args, context, info) => {
            return await common.deleteModelById(args.id, model.Lead, context.user.id);
        }, // end of  deleteLeadById resolver

        convertCrmLeadById: async (obj, args, context, info) => {
            try {

                let objLead = await common.getCrmModelById(args.id, model.Lead, [{
                    model: model.Address,
                    as: 'Addresses',
                    attributes: ['id'],
                    required: false
                },
                {
                    model: model.LeadContactParent,
                    attributes: ['phone', 'description']
                }
                ], 'Lead');
                objLead = objLead.Lead

                if (objLead) {
                    const objContactInput = {
                        'owner': objLead.owner,
                        'id_crm_lead_contact_parent': objLead.id_crm_lead_contact_parent,
                        'id_crm_pipeline_stage': objLead.id_crm_pipeline_stage,
                        'created_by': objLead.created_by,
                    }
                    const objCompanyInput = {
                        'owner': objLead.owner,
                        'company_name': objLead.company_name,
                        'phone': objLead.LeadContactParent.phone,
                        'fax': objLead.fax,
                        'website': objLead.website,
                        'skype_url': objLead.skype_url,
                        'twitter_url': objLead.twitter_url,
                        'linkedin_url': objLead.linkedin_url,
                        'facebook_url': objLead.facebook_url,
                        'id_crm_industry_master': objLead.id_crm_industry_master,
                        'no_of_employees': objLead.no_of_employees,
                        'annual_revenue': objLead.annual_revenue,
                        'description': objLead.LeadContactParent.description,
                        'created_by': objLead.created_by,
                        Contacts: [objContactInput]
                    }
                    const objCompany = await model.Company.create(objCompanyInput, {
                        include: model.Contact
                    });
                    const addressObjList = [];
                    objLead.Addresses.forEach(address => {
                        addressObjList.push(model.CompanyAddress.create({
                            id_crm_address: address.id,
                            id_crm_company: objCompany.dataValues.id
                        }));
                        addressObjList.push(model.ContactAddress.create({
                            id_crm_address: address.id,
                            id_crm_contact: objCompany.dataValues.Contacts[0].dataValues.id
                        }));
                    });

                    await Promise.all(addressObjList);
                    const objArgsDealInput = args.input.Deal;

                    if (objArgsDealInput) {
                        const objDealInput = {
                            owner: objLead.owner,
                            id_crm_contact: objCompany.dataValues.Contacts[0].dataValues.id,
                            id_crm_company: objCompany.dataValues.id,
                            deal_name: objArgsDealInput.deal_name,
                            deal_closing_date: objArgsDealInput.deal_closing_date,
                            deal_amount: objArgsDealInput.deal_amount,
                            expected_revenue: objArgsDealInput.expected_revenue,
                            id_crm_lead_source_master: objLead.LeadContactParent.id_crm_lead_source_master,
                            id_crm_campaign: objArgsDealInput.id_crm_campaign,
                            id_crm_pipeline_stage: objArgsDealInput.id_crm_pipeline_stage,
                            created_by: objLead.owner
                        }
                        const objDeal = await model.Deal.create(objDealInput);
                    }
                }
            } catch (error) {
                throw error;
            }
        }, // end of convertCrmLeadById resolver
    } // end of mutation
}