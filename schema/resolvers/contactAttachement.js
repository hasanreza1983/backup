/*
 * This Resolver File belongs to the CrmContactAttachement type
 * Hasan Reza 2018-03-28;
 *
 */
const model = require('../../models');
const validation = require('../../validation/contactAttachementValidation');
const constant = require('../../lib/constant');
const common = require('../../lib/commonResolver');
const modleInclude = [{ model: model.ContactAttachementAttachement }];

const axios = require('axios');
const { fileStorageServerLink } = require('../../config/index').microservicesLinks;

let message = '';
module.exports = {
    Query: {
        getAllCrmContactAttachementsByContact: async (obj, args, context, info) => {
            let created_by = '';
            if (context.user.id) {
                created_by = context.user.id;
            }
            const objContactAttachements = await model.ContactAttachement.findAll({
                where: {
                    id_crm_contact: args.id,
                    created_by: created_by,
                    is_deleted: 0
                }
            });

            // start of Minio operation
            let miniosFileIds = [];
            for (let [key, attachment] of Object.entries(objContactAttachements)) {
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

            objContactAttachements.forEach(obj => {
                obj.minio_file_url = arrFileIds[obj.minio_file_id];
            });
            // End of Minio operation
            return {
                ContactAttachements: objContactAttachements,
                message: constant.SUCCESS
            };

        }, // end of getAllCrmContactAttachement resolver

    }, // end of query

    Mutation: {
        createCrmContactAttachement: async (obj, args, context, info) => {

            // Prepare array to validate fields
            let objContactAttachement = [];
            let arrErrors = [];
            let responseStatus = [];

            let created_by = '';
            if (context.user.id) {
                created_by = context.user.id;
            }

            arrErrors = validation.validateCreateInput(args.input); // validation for CrmContactAttachement input data
            //arrErrors.error = null;
            if (arrErrors.error != null) {
                throw new Error(arrErrors.error.details[0].message);
            } else {
                try {
                    await Promise.all(args.input.ContactAttachements.map(async (contactAttachement, i) => {
                        if (contactAttachement.id) {
                            args.input.ContactAttachements.splice(i, 1);
                        } else {
                            contactAttachement.id_crm_contact = args.input.id_crm_contact;
                            contactAttachement.created_by = created_by;
                        }
                    }));

                    model.ContactAttachement.bulkCreate(args.input.ContactAttachements, { individualHooks: true })
                    objContactAttachement.message = "Attachements saved successfully!";
                    return objContactAttachement;

                } catch (err) {
                    objContactAttachement.message = err.message;
                    return objContactAttachement;
                }
            }
        }, // end of createCrmContactAttachement resolver

        deleteCrmContactAttachementById: async (obj, args, context, info) => {
            // Prepare array to validate fields
            let objContactAttachement = [];
            let arrErrors = [];
            let responseStatus = [];

            let created_by = '';
            if (context.user.id) {
                created_by = context.user.id;
            }
            arrErrors = validation.validateDeleteInput(args.input); // validation for CrmContactAttachement input data
            // arrErrors.error = null;
            if (arrErrors.error != null) {
                throw new Error(arrErrors.error.details[0].message);
            } else {
                const objContactAttachement = await model.ContactAttachement.findOne({
                    where: {
                        id: args.input.id,
                        id_crm_contact: args.input.id_crm_contact,
                        created_by: created_by,
                        is_deleted: 0
                    }
                })

                if (objContactAttachement) {
                    let isCrmContactAttachementSoftDeleted = await model.ContactAttachement.update({
                        deleted_at: new Date(),
                        is_deleted: 1
                    },
                        {
                            where: {
                                id: args.input.id,
                                id_crm_contact: args.input.id_crm_contact,
                                created_by: created_by,
                                is_deleted: 0
                            }
                        });

                    if (isCrmContactAttachementSoftDeleted) {
                        //const objDeleteMinio = await common.deleteMinioFileById(args.input.minio_file_id);
                        message = '';
                       // if (objDeleteMinio.message) {
                            message = "The delete was successful";
                      //  }
                    }
                } else {
                    throw new Error(" CrmContactAttachement ID does not exist");
                }
            }
            objContactAttachement.ContactAttachement = objContactAttachement;
            objContactAttachement.message = message;
            return objContactAttachement;

        } // end of  deleteCrmContactAttachementById resolver
    } // end of mutation
}