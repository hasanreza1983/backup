/*
 * This Resolver File belongs to the CrmContactNote type
 * Hasan Reza 2018-03-28;
 *
 */
const model = require('../../models');
const validation = require('../../validation/contactNoteValidation');
const constant = require('../../lib/constant');
const common = require('../../lib/commonResolver');
const modleInclude = [{ model: model.ContactNoteAttachement }];

const axios = require('axios');
const { fileStorageServerLink } = require('../../config/index').microservicesLinks;

let message = '';
module.exports = {
    Query: {

        getAllCrmNotesByContact: async (obj, args, context, info) => {

            let created_by = '';
            if (context.user.id) {
                created_by = context.user.id;
            }
            const contact = await common.getCrmModelById(args.id, model.Contact, [{
                model: model.ContactNote,
                include: model.ContactNoteAttachement
            }
            ], 'Contacts');

            contact.ContactNotes = contact.Contacts.dataValues.ContactNotes;

            // start of Minio operation
            let miniosFileIds = [];
            contact.ContactNotes.map((contactNote, index) => {
                for (let [key, attachment] of Object.entries(contact.ContactNotes[index].ContactNoteAttachements)) {
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

            contact.ContactNotes.map((contactNote, index) => {
                for (let [key, attachment] of Object.entries(contact.ContactNotes[index].ContactNoteAttachements)) {
                    contact.ContactNotes[index].ContactNoteAttachements[key].minio_file_url = arrFileIds[attachment.dataValues.minio_file_id];
                }
            });

            // End of Minio operation
            return contact;

        }, // end of getAllCrmContactNote resolver

    }, // end of query

    Mutation: {
        createCrmContactNote: async (obj, args, context, info) => {
            // Prepare array to validate fields
            let objContactNote = [];
            let arrErrors = [];
            let responseStatus = [];

            let created_by = '';
            if (context.user.id) {
                args.input.created_by = context.user.id;
                created_by = context.user.id;
            }

            arrErrors = validation.validateCreateInput(args.input); // validation for CrmContactNote input data
            // arrErrors.error = null;
            if (arrErrors.error != null) {
                throw new Error(arrErrors.error.details[0].message);
            } else {

                let filter = {
                    include: [{ model: model.ContactNoteAttachement }],
                    where: {
                        id: args.input.id,
                        created_by: created_by,
                        is_deleted: 0
                    },
                    defaults: args.input
                };

                const objContactNote = await model.ContactNote.findOrCreate(filter)
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

                objContactNote.ContactNote = objContactNote;
                objContactNote.message = message;
                return objContactNote;

            }
        }, // end of createCrmContactNote resolver

        updateCrmContactNote: async (obj, args, context, info) => {

            // Prepare array to validate fields
            let objContactNote = [];
            let arrErrors = [];
            let responseStatus = [];

            let created_by = '';
            if (context.user.id) {
                args.input.updated_by = context.user.id;
                created_by = context.user.id;
            }
            arrErrors = validation.validateUpdateInput(args.input); // validation for CrmContactNote input data
            // arrErrors.error = null;
            if (arrErrors.error != null) {
                throw new Error(arrErrors.error.details[0].message);
            } else {
                const objContactNote = await model.ContactNote.findOne({
                    where: {
                        id: args.input.id,
                        id_crm_contact: args.input.id_crm_contact,
                        created_by: created_by,
                        is_deleted: 0
                    }
                });
                if (objContactNote) {
                    let isUpdated = await model.ContactNote.update(args.input, {
                        where: {
                            id: args.input.id,
                            updated_by: created_by,
                            is_deleted: 0
                        }
                    });

                    if (isUpdated) {
                        let isCreated = args.input.ContactNoteAttachements.forEach(async (obj) => {
                            let filter = {
                                where: {
                                    id_crm_contact_note: args.input.id,
                                    minio_file_id: obj.minio_file_id,
                                    created_by: created_by
                                },
                                defaults: obj
                            };
                            const objContactNoteAttachements = await model.ContactNoteAttachement.findOrCreate(filter)
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
            // delete args.input.ContactNoteAttachements;

            objContactNote.ContactNote = args.input;
            objContactNote.message = message;
            return objContactNote;

        }, // end of  updateCrmContactNote resolver

        deleteCrmContactNoteById: async (obj, args, context, info) => {
            // Prepare array to validate fields
            let objContactNote = [];
            let arrErrors = [];
            let responseStatus = [];

            let created_by = '';
            if (context.user.id) {
                created_by = context.user.id;
            }

            arrErrors = validation.validateDeleteInput(args.input); // validation for CrmContactNote input data
            // arrErrors.error = null;

            if (arrErrors.error != null) {
                throw new Error(arrErrors.error.details[0].message);
            } else {

                const objContactNote = await model.ContactNote.findOne({
                    where: {
                        id: args.input.id,
                        id_crm_contact: args.input.id_crm_contact,
                        created_by: created_by,
                        is_deleted: 0
                    }
                })
                if (objContactNote) {

                    /////Minio FileIds from Tables///////////////
                    /*
                    const contact = await common.getCrmModelById(args.input.id_crm_contact, model.Contact, [{
                        model: model.ContactNote,
                        include: model.ContactNoteAttachement
                    }
                    ], 'Contacts');

                    contact.ContactNotes = contact.Contacts.dataValues.ContactNotes;

                    // start of Minio operation
                    let miniosFileIds = [];
                    contact.ContactNotes.map((contactNote, index) => {
                        for (let [key, attachment] of Object.entries(contact.ContactNotes[index].ContactNoteAttachements)) {
                            miniosFileIds.push(attachment.dataValues.minio_file_id);
                        }
                    });

                    console.log(miniosFileIds);
                   */

                    ////////////////////////////////////////////

                    let isCrmContactNoteSoftDeleted = await model.ContactNote.update({
                        deleted_at: new Date(),
                        is_deleted: 1
                    }, {
                            where: {
                                id: args.input.id,
                                id_crm_contact: args.input.id_crm_contact,
                                created_by: created_by,
                                is_deleted: 0
                            }
                        });

                    if (isCrmContactNoteSoftDeleted) {

                        //const objDeleteMinio = await common.deleteMinioFileById(miniosFileIds);
                        message = '';
                        // if (objDeleteMinio.message) {  
                        message = "The delete was successful with the ID " + args.id;
                        //  }
                    }
                } else {
                    throw new Error(" CrmContactNote ID does not exist");
                }
            }
            objContactNote.ContactNote = objContactNote;
            objContactNote.message = message;
            return objContactNote;

        } // end of  deleteCrmContactNoteById resolver
    } // end of mutation
}