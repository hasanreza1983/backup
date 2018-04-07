/*
 * This Resolver File belongs to the CrmCompanyAttachement type
 * Hasan Reza 2018-03-28;
 *
 */
const model = require('../../models');
const validation = require('../../validation/companyAttachementValidation');
const constant = require('../../lib/constant');
const common = require('../../lib/commonResolver');
const modleInclude = [{ model: model.CompanyAttachementAttachement }];

const axios = require('axios');
const { fileStorageServerLink } = require('../../config/index').microservicesLinks;

let message = '';
module.exports = {
    Query: {
        getAllCrmCompanyAttachementsByCompany: async (obj, args, context, info) => {
            let created_by = '';
            if (context.user.id) {
                created_by = context.user.id;
            }
            const objCompanyAttachements = await model.CompanyAttachement.findAll({
                where: {
                    id_crm_company: args.id,
                    created_by: created_by,
                    is_deleted: 0
                }
            });

            // start of Minio operation
            let miniosFileIds = [];
            for (let [key, attachment] of Object.entries(objCompanyAttachements)) {
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

            objCompanyAttachements.forEach(obj => {
                obj.minio_file_url = arrFileIds[obj.minio_file_id];
            });
            // End of Minio operation
            return {
                CompanyAttachements: objCompanyAttachements,
                message: constant.SUCCESS
            };

        }, // end of getAllCrmCompanyAttachement resolver

    }, // end of query

    Mutation: {
        createCrmCompanyAttachement: async (obj, args, context, info) => {

            // Prepare array to validate fields
            let objCompanyAttachement = [];
            let arrErrors = [];
            let responseStatus = [];

            let created_by = '';
            if (context.user.id) {
                created_by = context.user.id;
            }

            arrErrors = validation.validateCreateInput(args.input); // validation for CrmCompanyAttachement input data
            //arrErrors.error = null;
            if (arrErrors.error != null) {
                throw new Error(arrErrors.error.details[0].message);
            } else {
                try {
                    await Promise.all(args.input.CompanyAttachements.map(async (companyAttachement, i) => {
                        if (companyAttachement.id) {
                            args.input.CompanyAttachements.splice(i, 1);
                        } else {
                            companyAttachement.id_crm_company = args.input.id_crm_company;
                            companyAttachement.created_by = created_by;
                        }
                    }));

                    model.CompanyAttachement.bulkCreate(args.input.CompanyAttachements, { individualHooks: true })
                    objCompanyAttachement.message = "Attachements saved successfully!";
                    return objCompanyAttachement;

                } catch (err) {
                    objCompanyAttachement.message = err.message;
                    return objCompanyAttachement;
                }
            }
        }, // end of createCrmCompanyAttachement resolver

        deleteCrmCompanyAttachementById: async (obj, args, context, info) => {
            // Prepare array to validate fields
            let objCompanyAttachement = [];
            let arrErrors = [];
            let responseStatus = [];

            let created_by = '';
            if (context.user.id) {
                created_by = context.user.id;
            }
            arrErrors = validation.validateDeleteInput(args.input); // validation for CrmCompanyAttachement input data
            // arrErrors.error = null;
            if (arrErrors.error != null) {
                throw new Error(arrErrors.error.details[0].message);
            } else {
                const objCompanyAttachement = await model.CompanyAttachement.findOne({
                    where: {
                        id: args.input.id,
                        id_crm_company: args.input.id_crm_company,
                        created_by: created_by,
                        is_deleted: 0
                    }
                })

                if (objCompanyAttachement) {
                    let isCrmCompanyAttachementSoftDeleted = await model.CompanyAttachement.update({
                        deleted_at: new Date(),
                        is_deleted: 1
                    },
                        {
                            where: {
                                id: args.input.id,
                                id_crm_company: args.input.id_crm_company,
                                created_by: created_by,
                                is_deleted: 0
                            }
                        });

                    if (isCrmCompanyAttachementSoftDeleted) {
                        //const objDeleteMinio = await common.deleteMinioFileById(args.input.minio_file_id);
                        message = '';
                       // if (objDeleteMinio.message) {
                            message = "The delete was successful";
                      //  }
                    }
                } else {
                    throw new Error(" CrmCompanyAttachement ID does not exist");
                }
            }
            objCompanyAttachement.CompanyAttachement = objCompanyAttachement;
            objCompanyAttachement.message = message;
            return objCompanyAttachement;

        } // end of  deleteCrmCompanyAttachementById resolver
    } // end of mutation
}