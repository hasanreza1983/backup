/*
 * This Resolver File belongs to the Lead type
 * Hasan Reza 2018-03-13;
 *
 */

const model = require('../../models');
const validation = require('../../validation/leadValidation');

const constant = require('../../lib/constant');
const common = require('../../lib/commonResolver');
module.exports = {
    Query: {
        getCrmLeadById: async (obj, args, context, info) => {
            const response = await common.getCrmModelById(args.id, model.Lead, [
                { model: model.Address, as: 'Addresses', required: false },
                { model: model.IndustryMaster },
                {
                    model: model.LeadContactParent,
                    include: [
                        {
                            model: model.LeadSourceMaster
                        },
                    ],
                },
                { model: model.LeadStatusMaster },
                { model: model.PipelineStage },
                { model: model.RatingMaster }
            ], 'Lead');
            response.Lead.Addresses = await common.addAddressName(response.Lead.Addresses);
            return response;
        }, // end of getLeadById resolver

        getCrmLeadCampaigns: async (obj, args, context, info) => {
            const response = await common.getCrmModelById(args.id, model.Lead, [
                {
                    model: model.Campaign,
                    include: [{
                        model: model.CampaignTypeMaster
                    }]
                }
            ], 'Lead');
            return response;

        }, // end of getCrmLeadCampaigns resolver

        getCrmLeadListByPage: async (obj, args, context, info) => {
            let response = await common.getCrmModelListByPage(args, model.Lead, [
                { model: model.Address, as: 'Addresses', required: false },
                { model: model.IndustryMaster },
                {
                    model: model.LeadContactParent,
                    include: [
                        {
                            model: model.LeadSourceMaster
                        }
                    ],
                },
                { model: model.LeadStatusMaster },
                { model: model.PipelineStage },
                { model: model.RatingMaster }
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
            // Prepare array to validate fields
            let objLead = [];
            let arrErrors = [];

            let owner = '';
            if (context.user.id) {
                owner = context.user.id;
                args.input.created_by = context.user.id;
                args.input.owner = context.user.id;
            }

            arrErrors = validation.validateCreateInput(args.input); // validation for Lead input data
            //arrErrors.error = null;
            if (arrErrors.error != null) {
                throw new Error(arrErrors.error.details[0].message);
            } else {
                try {
                    const objLead = await model.Lead.create(args.input, {
                        include: [
                            { model: model.LeadContactParent },
                            { model: model.Address, as: 'Addresses', required: false }
                        ]
                    });

                    objLead.Lead = objLead;
                    objLead.message = "Lead created successfully";
                    return objLead;

                } catch (err) {
                    objLead.message = err.message;
                    return objLead;
                }

            }
        }, // end of createLead resolver

        updateCrmLead: async (obj, args, context, info) => {
            // Prepare array to validate fields
            let objLead = [];
            let arrErrors = [];
            let owner = '';

            if (context.user.id) {
                args.input.updated_by = context.user.id;
                owner = context.user.id;
            }
            arrErrors = validation.validateUpdateInput(args.input); // validation for Lead input data
            // arrErrors.error = null;

            if (arrErrors.error != null) {
                throw new Error(arrErrors.error.details[0].message);
            } else {

                const crmLeadId = args.input.id;
                const Addresses = args.input.Addresses;
                delete args.input.id;
                delete args.input.Addresses;

                let filter = {
                    include: [
                        { model: model.LeadContactParent },
                        {
                            model: model.Address,
                            as: 'Addresses',
                            required: false
                        }
                    ],
                    where: {
                        id: crmLeadId,
                        owner: owner,
                        is_deleted: 0
                    }
                };
                if (!args.input.owner) {
                    args.input.owner = context.user.id;
                }

                objLead = await model.Lead.findOne(filter);
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
                    objLead.Addresses = await objLead.getAddresses();
                } else {
                    throw new Error(constant.DOES_NOT_EXIST);
                }
            }
            objLead.Lead = objLead;
            objLead.message = constant.SUCCESS;
            return objLead;

        }, // end of  updateLead resolver

        deleteCrmLeadById: async (obj, args, context, info) => {
            return await common.deleteModelById(args.id, model.Lead, context.user.id);
        }, // end of  deleteLeadById resolver

        assignCrmCampaignsToModel: async (obj, args, context, info) => {
            const response = await common.assignCrmCampaignsToModel(obj, args, context, info);
            return response;
        }, // end of  assignCrmCampaignsToModel resolver

        unAssignCrmCampaignsToModel: async (obj, args, context, info) => {
            const response = await common.unAssignCrmCampaignsToModel(obj, args, context, info);
            return response;
        }, // end of unAssignCrmCampaignsToModel resolver

        updateCrmCampaignStatusForModel: async (obj, args, context, info) => {

            const response = await common.updateCrmCampaignStatusForModel(obj, args, context, info);
            return response;
        }, // end of  assignCrmCampaignsToModel resolver

        convertCrmLeadById: async (obj, args, context, info) => {

            let arrErrors = [];
            arrErrors = validation.validateIDInput(args.id); // validation for CrmDeal input data
            // arrErrors.error = null;
            if (arrErrors.error != null) {
                throw new Error(arrErrors.error.details[0].message);
            } else {
                try {

                    let objLead = await common.getCrmModelById(args.id, model.Lead, [
                        { model: model.Address, as: 'Addresses', attributes: ['id'], required: false },
                        { model: model.LeadContactParent, attributes: ['phone', 'description'] }
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
                        const companyObj = await model.Company.create(objCompanyInput, {
                            include: model.Contact
                        });
                        const addressObjList = [];
                        objLead.Addresses.forEach(address => {
                            addressObjList.push(model.CompanyAddress.create({
                                id_crm_address: address.id,
                                id_crm_company: companyObj.dataValues.id
                            }));
                            addressObjList.push(model.ContactAddress.create({
                                id_crm_address: address.id,
                                id_crm_contact: companyObj.dataValues.Contacts[0].dataValues.id
                            }));
                        });

                        await Promise.all(addressObjList);
                    }

                } catch (error) {
                    throw error;
                }
            }
            // return response;
        }, // end of convertCrmLeadById resolver

    } // end of mutation
}