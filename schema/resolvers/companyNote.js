/*
 * This Resolver File belongs to the CrmCompanyNote type
 * Hasan Reza 2018-03-28;
 *
 */
const model = require('../../models');
const validation = require('../../validation/companyNoteValidation');
const constant = require('../../lib/constant');
const common = require('../../lib/commonResolver');
const modleInclude = [{ model: model.CompanyNoteAttachement }];

const axios = require('axios');
const { fileStorageServerLink } = require('../../config/index').microservicesLinks;

let message = '';
module.exports = {
    Query: {

        getAllCrmNotesByCompany: async (obj, args, context, info) => {

            let created_by = '';
            if (context.user.id) {
                created_by = context.user.id;
            }
            const company = await common.getCrmModelById(args.id, model.Company, [{
                model: model.CompanyNote,
                include: model.CompanyNoteAttachement
            }
            ], 'Companys');

            company.CompanyNotes = company.Companys.dataValues.CompanyNotes;

            // start of Minio operation
            let miniosFileIds = [];
            company.CompanyNotes.map((companyNote, index) => {
                for (let [key, attachment] of Object.entries(company.CompanyNotes[index].CompanyNoteAttachements)) {
                    miniosFileIds.push(attachment.dataValues.minio_file_id);
                }
            });

            let arrFileIds = [];
            // sending request to file storage API to get file url                  
            if (process.env.FILE_STORAGE_MANAGER_SERVICE_HOST && process.env.FILE_STORAGE_MANAGER_SERVICE_PORT) {
                let attachmentFilesUrl = await axios.post(fileStorageServerLink + 'files-get', {
                    files: miniosFileIds
                });

                // check errors
                if (attachmentFilesUrl.data.errors.length > 0) {
                    throw new Error(attachmentFilesUrl.data.errors);
                }
                arrFileIds = attachmentFilesUrl.data.fileIds;
            }

            company.CompanyNotes.map((companyNote, index) => {
                for (let [key, attachment] of Object.entries(company.CompanyNotes[index].CompanyNoteAttachements)) {
                    company.CompanyNotes[index].CompanyNoteAttachements[key].minio_file_url = arrFileIds[attachment.dataValues.minio_file_id];
                }
            });

            // End of Minio operation
            return company;

        }, // end of getAllCrmCompanyNote resolver

    }, // end of query

    Mutation: {
        createCrmCompanyNote: async (obj, args, context, info) => {
            // Prepare array to validate fields
            let objCompanyNote = [];
            let arrErrors = [];
            let responseStatus = [];

            let created_by = '';
            if (context.user.id) {
                args.input.created_by = context.user.id;
                created_by = context.user.id;
            }

            arrErrors = validation.validateCreateInput(args.input); // validation for CrmCompanyNote input data
            // arrErrors.error = null;
            if (arrErrors.error != null) {
                throw new Error(arrErrors.error.details[0].message);
            } else {

                let filter = {
                    include: [{ model: model.CompanyNoteAttachement }],
                    where: {
                        id: args.input.id,
                        created_by: created_by,
                        is_deleted: 0
                    },
                    defaults: args.input
                };

                const objCompanyNote = await model.CompanyNote.findOrCreate(filter)
                    .spread((result, is_created) => {
                        if (is_created) {
                            message = "The note is created successfully";
                            return result.dataValues;
                        } else {
                            return result.updateAttributes(args.input).then(function (updated) {
                                message = "The update was successful";
                                return updated;
                            });
                        }
                    });

                objCompanyNote.CompanyNote = objCompanyNote;
                objCompanyNote.message = message;
                return objCompanyNote;

            }
        }, // end of createCrmCompanyNote resolver

        updateCrmCompanyNote: async (obj, args, context, info) => {

            // Prepare array to validate fields
            let objCompanyNote = [];
            let arrErrors = [];
            let responseStatus = [];

            let created_by = '';
            if (context.user.id) {
                args.input.updated_by = context.user.id;
                created_by = context.user.id;
            }
            arrErrors = validation.validateUpdateInput(args.input); // validation for CrmCompanyNote input data
            // arrErrors.error = null;
            if (arrErrors.error != null) {
                throw new Error(arrErrors.error.details[0].message);
            } else {
                const objCompanyNote = await model.CompanyNote.findOne({
                    where: {
                        id: args.input.id,
                        id_crm_company: args.input.id_crm_company,
                        created_by: created_by,
                        is_deleted: 0
                    }
                });
                if (objCompanyNote) {
                    let isUpdated = await model.CompanyNote.update(args.input, {
                        where: {
                            id: args.input.id,
                            updated_by: created_by,
                            is_deleted: 0
                        }
                    });

                    if (isUpdated) {
                        let isCreated = args.input.CompanyNoteAttachements.forEach(async (obj) => {
                            let filter = {
                                where: {
                                    id_crm_company_note: args.input.id,
                                    minio_file_id: obj.minio_file_id,
                                    created_by: created_by
                                },
                                defaults: obj
                            };
                            const objCompanyNoteAttachements = await model.CompanyNoteAttachement.findOrCreate(filter)
                                .spread((result, is_created) => {
                                    if (is_created) {
                                        return result.dataValues;
                                    } else {
                                        return result.updateAttributes(obj).then(function (updated) {
                                            return updated;
                                        });
                                    }
                                });

                            if (obj.is_removed) { }

                        });
                        message = "The update was successful with ID " + args.input.id;
                    }
                } else {
                    throw new Error("ID does not exist!");
                }
            }
            // delete args.input.CompanyNoteAttachements;

            objCompanyNote.CompanyNote = args.input;
            objCompanyNote.message = message;
            return objCompanyNote;

        }, // end of  updateCrmCompanyNote resolver

        deleteCrmCompanyNoteById: async (obj, args, context, info) => {
            // Prepare array to validate fields
            let objCompanyNote = [];
            let arrErrors = [];
            let responseStatus = [];

            let created_by = '';
            if (context.user.id) {
                created_by = context.user.id;
            }

            arrErrors = validation.validateDeleteInput(args.input); // validation for CrmCompanyNote input data
            // arrErrors.error = null;

            if (arrErrors.error != null) {
                throw new Error(arrErrors.error.details[0].message);
            } else {

                const objCompanyNote = await model.CompanyNote.findOne({
                    where: {
                        id: args.input.id,
                        id_crm_company: args.input.id_crm_company,
                        created_by: created_by,
                        is_deleted: 0
                    }
                })
                if (objCompanyNote) {

                    /////Minio FileIds from Tables///////////////
                    /*
                    const company = await common.getCrmModelById(args.input.id_crm_company, model.Company, [{
                        model: model.CompanyNote,
                        include: model.CompanyNoteAttachement
                    }
                    ], 'Companys');

                    company.CompanyNotes = company.Companys.dataValues.CompanyNotes;

                    // start of Minio operation
                    let miniosFileIds = [];
                    company.CompanyNotes.map((companyNote, index) => {
                        for (let [key, attachment] of Object.entries(company.CompanyNotes[index].CompanyNoteAttachements)) {
                            miniosFileIds.push(attachment.dataValues.minio_file_id);
                        }
                    });

                    console.log(miniosFileIds);
                   */

                    ////////////////////////////////////////////

                    let isCrmCompanyNoteSoftDeleted = await model.CompanyNote.update({
                        deleted_at: new Date(),
                        is_deleted: 1
                    }, {
                            where: {
                                id: args.input.id,
                                id_crm_company: args.input.id_crm_company,
                                created_by: created_by,
                                is_deleted: 0
                            }
                        });

                    if (isCrmCompanyNoteSoftDeleted) {

                        //const objDeleteMinio = await common.deleteMinioFileById(miniosFileIds);
                        message = '';
                        // if (objDeleteMinio.message) {  
                        message = "The delete was successful with the ID " + args.id;
                        //  }
                    }
                } else {
                    throw new Error(" CrmCompanyNote ID does not exist");
                }
            }
            objCompanyNote.CompanyNote = objCompanyNote;
            objCompanyNote.message = message;
            return objCompanyNote;

        } // end of  deleteCrmCompanyNoteById resolver
    } // end of mutation
}