/*
 * This Resolver File belongs to the CrmLeadNote type
 * Hasan Reza 2018-03-28;
 *
 */
const model = require('../../models');
const validation = require('../../validation/leadNoteValidation');
const constant = require('../../lib/constant');
const common = require('../../lib/commonResolver');
const modleInclude = [{ model: model.LeadNoteAttachement }];

const axios = require('axios');
const { fileStorageServerLink } = require('../../config/index').microservicesLinks;

let message = '';
module.exports = {
    Query: {

        getAllCrmNotesByLead: async (obj, args, context, info) => {

            let created_by = '';
            if (context.user.id) {
                created_by = context.user.id;
            }
            const lead = await common.getCrmModelById(args.id, model.Lead,
                [
                    {
                        model: model.LeadNote, where: {
                            is_deleted: 0
                        },
                        include: model.LeadNoteAttachement, where: {
                            is_deleted: 0
                        }
                    }
                ], 'Leads');

            lead.LeadNotes = lead.Leads.dataValues.LeadNotes;

            // start of Minio operation
            let miniosFileIds = [];
            lead.LeadNotes.map((leadNote, index) => {
                for (let [key, attachment] of Object.entries(lead.LeadNotes[index].LeadNoteAttachements)) {
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

            lead.LeadNotes.map((leadNote, index) => {
                for (let [key, attachment] of Object.entries(lead.LeadNotes[index].LeadNoteAttachements)) {
                    lead.LeadNotes[index].LeadNoteAttachements[key].minio_file_url = arrFileIds[attachment.dataValues.minio_file_id];
                }
            });

            // End of Minio operation
            return lead;

        }, // end of getAllCrmLeadNote resolver

    }, // end of query

    Mutation: {
        createCrmLeadNote: async (obj, args, context, info) => {
            // Prepare array to validate fields
            let objLeadNote = [];
            let arrErrors = [];
            let responseStatus = [];

            let created_by = '';
            if (context.user.id) {
                args.input.created_by = context.user.id;
                created_by = context.user.id;
            }

            arrErrors = validation.validateCreateInput(args.input); // validation for CrmLeadNote input data
            // arrErrors.error = null;
            if (arrErrors.error != null) {
                throw new Error(arrErrors.error.details[0].message);
            } else {

                let filter = {
                    include: [{ model: model.LeadNoteAttachement }],
                    where: {
                        id: args.input.id,
                        created_by: created_by,
                        is_deleted: 0
                    },
                    defaults: args.input
                };

                const objLeadNote = await model.LeadNote.findOrCreate(filter)
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

                objLeadNote.LeadNote = objLeadNote;
                objLeadNote.message = message;
                return objLeadNote;

            }
        }, // end of createCrmLeadNote resolver

        updateCrmLeadNote: async (obj, args, context, info) => {

            // Prepare array to validate fields
            let objLeadNote = [];
            let arrErrors = [];
            let responseStatus = [];

            let created_by = '';
            if (context.user.id) {
                args.input.updated_by = context.user.id;
                created_by = context.user.id;
            }
            arrErrors = validation.validateUpdateInput(args.input); // validation for CrmLeadNote input data
            // arrErrors.error = null;
            if (arrErrors.error != null) {
                throw new Error(arrErrors.error.details[0].message);
            } else {
                const objLeadNote = await model.LeadNote.findOne({
                    where: {
                        id: args.input.id,
                        id_crm_lead: args.input.id_crm_lead,
                        created_by: created_by,
                        is_deleted: 0
                    }
                });
                if (objLeadNote) {

                    let isUpdated = await model.LeadNote.update(args.input, {
                        where: {
                            id: args.input.id,
                            created_by: created_by,
                            is_deleted: 0
                        }
                    });

                    if (isUpdated) {
                        let isCreated = args.input.LeadNoteAttachements.forEach(async (obj) => {
                            let filter = {
                                where: {
                                    id_crm_lead_note: args.input.id,
                                    minio_file_id: obj.minio_file_id,
                                    created_by: created_by
                                },
                                defaults: obj
                            };
                            const objLeadNoteAttachements = await model.LeadNoteAttachement.findOrCreate(filter)
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
            // delete args.input.LeadNoteAttachements;

            objLeadNote.LeadNote = args.input;
            objLeadNote.message = message;
            return objLeadNote;

        }, // end of  updateCrmLeadNote resolver

        deleteCrmLeadNoteById: async (obj, args, context, info) => {
            // Prepare array to validate fields
            let objLeadNote = [];
            let arrErrors = [];
            let responseStatus = [];

            let created_by = '';
            if (context.user.id) {
                created_by = context.user.id;
            }

            arrErrors = validation.validateDeleteInput(args.input); // validation for CrmLeadNote input data
            // arrErrors.error = null;

            if (arrErrors.error != null) {
                throw new Error(arrErrors.error.details[0].message);
            } else {

                const objLeadNote = await model.LeadNote.findOne({
                    where: {
                        id: args.input.id,
                        id_crm_lead: args.input.id_crm_lead,
                        created_by: created_by,
                        is_deleted: 0
                    }
                })
                if (objLeadNote) {

                    /////Minio FileIds from Tables///////////////
                    /*
                    const lead = await common.getCrmModelById(args.input.id_crm_lead, model.Lead, [{
                        model: model.LeadNote,
                        include: model.LeadNoteAttachement
                    }
                    ], 'Leads');

                    lead.LeadNotes = lead.Leads.dataValues.LeadNotes;

                    // start of Minio operation
                    let miniosFileIds = [];
                    lead.LeadNotes.map((leadNote, index) => {
                        for (let [key, attachment] of Object.entries(lead.LeadNotes[index].LeadNoteAttachements)) {
                            miniosFileIds.push(attachment.dataValues.minio_file_id);
                        }
                    });

                    console.log(miniosFileIds);
                   */

                    ////////////////////////////////////////////

                    let isCrmLeadNoteSoftDeleted = await model.LeadNote.update({
                        deleted_at: new Date(),
                        is_deleted: 1
                    }, {
                            where: {
                                id: args.input.id,
                                id_crm_lead: args.input.id_crm_lead,
                                created_by: created_by,
                                is_deleted: 0
                            }
                        });

                    if (isCrmLeadNoteSoftDeleted) {

                        //const objDeleteMinio = await common.deleteMinioFileById(miniosFileIds);
                        message = '';
                        // if (objDeleteMinio.message) {  
                        message = "The delete was successful with the ID " + args.id;
                        //  }
                    }
                } else {
                    throw new Error(" CrmLeadNote ID does not exist");
                }
            }
            objLeadNote.LeadNote = objLeadNote;
            objLeadNote.message = message;
            return objLeadNote;

        } // end of  deleteCrmLeadNoteById resolver
    } // end of mutation
}