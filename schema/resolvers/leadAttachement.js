/*
 * This Resolver File belongs to the CrmLeadAttachement type
 * Hasan Reza 2018-03-28;
 *
 */
const model = require('../../models');
const validation = require('../../validation/leadAttachementValidation');
const constant = require('../../lib/constant');
const common = require('../../lib/commonResolver');
const modleInclude = [{ model: model.LeadAttachementAttachement }];

const axios = require('axios');
const { fileStorageServerLink } = require('../../config/index').microservicesLinks;

let message = '';
module.exports = {
    Query: {
        getAllCrmLeadAttachementsByLead: async (obj, args, context, info) => {
            let created_by = '';
            if (context.user.id) {
                created_by = context.user.id;
            }
            const objLeadAttachements = await model.LeadAttachement.findAll({
                where: {
                    id_crm_lead: args.id,
                    created_by: created_by,
                    is_deleted: 0
                }
            });

            // start of Minio operation
            let miniosFileIds = [];
            for (let [key, attachment] of Object.entries(objLeadAttachements)) {
                miniosFileIds.push(attachment.dataValues.minio_file_id);
            }

            let arrFileIds = [];
            // sending request to file storage API to get file url                  
            if (process.env.FILE_STORAGE_MANAGER_SERVICE_HOST && process.env.FILE_STORAGE_MANAGER_SERVICE_PORT) {
                const attachmentFilesUrl = await axios.post(fileStorageServerLink + 'files-get', {
                    files: miniosFileIds
                });
                // check errors
                if (attachmentFilesUrl.data.errors.length > 0) {
                    throw new Error(attachmentFilesUrl.data.errors);
                }
                arrFileIds = attachmentFilesUrl.data.fileIds;
            }

            objLeadAttachements.forEach(obj => {
                obj.minio_file_url = arrFileIds[obj.minio_file_id];
            });
            // End of Minio operation
            return {
                LeadAttachements: objLeadAttachements,
                message: constant.SUCCESS
            };

        }, // end of getAllCrmLeadAttachement resolver

    }, // end of query

    Mutation: {
        createCrmLeadAttachement: async (obj, args, context, info) => {

            // Prepare array to validate fields
            let objLeadAttachement = [];
            let arrErrors = [];
            let responseStatus = [];

            let created_by = '';
            if (context.user.id) {
                created_by = context.user.id;
            }

            arrErrors = validation.validateCreateInput(args.input); // validation for CrmLeadAttachement input data
            //arrErrors.error = null;
            if (arrErrors.error != null) {
                throw new Error(arrErrors.error.details[0].message);
            } else {
                try {
                    await Promise.all(args.input.LeadAttachements.map(async (leadAttachement, i) => {
                        if (leadAttachement.id) {
                            args.input.LeadAttachements.splice(i, 1);
                        } else {
                            leadAttachement.id_crm_lead = args.input.id_crm_lead;
                            leadAttachement.created_by = created_by;
                        }
                    }));

                    model.LeadAttachement.bulkCreate(args.input.LeadAttachements, { individualHooks: true })
                    objLeadAttachement.message = "Attachements saved successfully!";
                    return objLeadAttachement;

                } catch (err) {
                    objLeadAttachement.message = err.message;
                    return objLeadAttachement;
                }
            }
        }, // end of createCrmLeadAttachement resolver

        deleteCrmLeadAttachementById: async (obj, args, context, info) => {
            // Prepare array to validate fields
            let objLeadAttachement = [];
            let arrErrors = [];
            let responseStatus = [];

            let created_by = '';
            if (context.user.id) {
                created_by = context.user.id;
            }
            arrErrors = validation.validateDeleteInput(args.input); // validation for CrmLeadAttachement input data
            // arrErrors.error = null;
            if (arrErrors.error != null) {
                throw new Error(arrErrors.error.details[0].message);
            } else {
                const objLeadAttachement = await model.LeadAttachement.findOne({
                    where: {
                        id: args.input.id,
                        id_crm_lead: args.input.id_crm_lead,
                        created_by: created_by,
                        is_deleted: 0
                    }
                })

                if (objLeadAttachement) {
                    let isCrmLeadAttachementSoftDeleted = await model.LeadAttachement.update({
                        deleted_at: new Date(),
                        is_deleted: 1
                    },
                        {
                            where: {
                                id: args.input.id,
                                id_crm_lead: args.input.id_crm_lead,
                                created_by: created_by,
                                is_deleted: 0
                            }
                        });

                    if (isCrmLeadAttachementSoftDeleted) {
                        //const objDeleteMinio = await common.deleteMinioFileById(args.input.minio_file_id);
                        message = '';
                       // if (objDeleteMinio.message) {
                            message = "The delete was successful";
                      //  }
                    }
                } else {
                    throw new Error(" CrmLeadAttachement ID does not exist");
                }
            }
            objLeadAttachement.LeadAttachement = objLeadAttachement;
            objLeadAttachement.message = message;
            return objLeadAttachement;

        } // end of  deleteCrmLeadAttachementById resolver
    } // end of mutation
}