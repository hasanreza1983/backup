/*
 * This Resolver File belongs to the CrmModelNote type
 * Hasan Reza 2018-03-28;
 *
 */
const model = require('../../models');
const validation = require('../../validation/modelNoteValidation');
const constant = require('../../lib/constant');
const common = require('../../lib/commonResolver');

const axios = require('axios');
const { fileStorageServerLink } = require('../../config/index').microservicesLinks;

let message = '';
module.exports = {
    Query: {
        getAllCrmNotesByModel: async (obj, args, context, info) => {
            let created_by = '';
            if (context.user.id) {
                created_by = context.user.id;
            }
            let filter = {
                include: [{ model: model.ModelNoteAttachment }],
                where: {
                    model_name: args.input.model_name,
                    model_id: args.input.model_id,
                    created_by: created_by,
                    is_deleted: 0
                }
            };
            const objModel = await model.ModelNote.findAll(filter);

            objModel.ModelNotes = objModel;

            // start of Minio operation
            let miniosFileIds = [];
            objModel.map((objModelNote, index) => {
                for (let [key, attachment] of Object.entries(objModelNote.ModelNoteAttachments)) {
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

            objModel.map((objModelNote, index) => {
                for (let [key, attachment] of Object.entries(objModelNote.dataValues.ModelNoteAttachments)) {
                    objModel.ModelNotes[index].ModelNoteAttachments[key].minio_file_id = attachment.dataValues.minio_file_id;
                    objModel.ModelNotes[index].ModelNoteAttachments[key].minio_file_url = arrFileIds[attachment.dataValues.minio_file_id];
                }
            });
            // End of Minio operation

            return objModel;

        }, // end of getAllCrmModelNote resolver

    }, // end of query

    Mutation: {
        createCrmModelNote: async (obj, args, context, info) => {
            // Prepare array to validate fields
            let objModelNote = [];
            let arrErrors = [];
            let responseStatus = [];

            let created_by = '';
            if (context.user.id) {
                args.input.created_by = context.user.id;
                created_by = context.user.id;
            }

            arrErrors = validation.validateCreateInput(args.input); // validation for CrmModelNote input data
            // arrErrors.error = null;
            if (arrErrors.error != null) {
                throw new Error(arrErrors.error.details[0].message);
            } else {

                const objModelNote = await model.ModelNote.create(args.input, {
                    include: [
                        { model: model.ModelNoteAttachment }
                    ]
                });

                objModelNote.ModelNote = objModelNote;
                objModelNote.message = "The create was successful";
                return objModelNote;

            }
        }, // end of createCrmModelNote resolver

        updateCrmModelNote: async (obj, args, context, info) => {

            // Prepare array to validate fields
            let objModelNote = [];
            let arrErrors = [];
            let responseStatus = [];

            let created_by = '';
            if (context.user.id) {
                args.input.updated_by = context.user.id;
                created_by = context.user.id;
            }
            arrErrors = validation.validateUpdateInput(args.input); // validation for CrmModelNote input data
            // arrErrors.error = null;
            if (arrErrors.error != null) {
                throw new Error(arrErrors.error.details[0].message);
            } else {
                const objModelNote = await model.ModelNote.findOne({
                    where: {
                        id: args.input.id,
                        model_name: args.input.model_name,
                        model_id: args.input.model_id,
                        created_by: created_by,
                        is_deleted: 0
                    }
                });
                if (objModelNote) {

                    let isUpdated = await model.ModelNote.update(args.input, {
                        where: {
                            id: args.input.id,
                            model_name: args.input.model_name,
                            model_id: args.input.model_id,
                            created_by: created_by,
                            is_deleted: 0
                        }
                    });

                    if (isUpdated) {
                        let isCreated = args.input.ModelNoteAttachments.forEach(async (obj) => {
                            let filter = {
                                where: {
                                    id_crm_model_note: args.input.id,
                                    minio_file_id: obj.minio_file_id,
                                    created_by: created_by
                                },
                                defaults: obj
                            };
                            const objModelNoteAttachments = await model.ModelNoteAttachment.findOrCreate(filter)
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
            // delete args.input.ModelNoteAttachments;

            objModelNote.ModelNote = args.input;
            objModelNote.message = message;
            return objModelNote;

        }, // end of  updateCrmModelNote resolver

        deleteCrmModelNote: async (obj, args, context, info) => {
            // Prepare array to validate fields
            let objModelNote = [],
                arrErrors = [],
                responseStatus = [],
                created_by = '',
                deleted_by = '',
                message = '';

            if (context.user.id) {
                created_by = context.user.id;
                deleted_by = context.user.id;
            }

            arrErrors = validation.validateDeleteInput(args.input); // validation for CrmModelNote input data
            // arrErrors.error = null;

            if (arrErrors.error != null) {
                throw new Error(arrErrors.error.details[0].message);
            } else {

                const objModelNote = await model.ModelNote.findOne({
                    where: {
                        id: args.input.id,
                        model_name: args.input.model_name,
                        model_id: args.input.model_id,
                        created_by: created_by,
                        is_deleted: 0
                    }
                })
                if (objModelNote) {

                    let isCrmModelNoteSoftDeleted = await model.ModelNote.update({
                        deleted_at: new Date(),
                        is_deleted: 1,
                        deleted_by: deleted_by
                    }, {
                            where: {
                                id: args.input.id,
                                model_name: args.input.model_name,
                                model_id: args.input.model_id,
                                created_by: created_by,
                                is_deleted: 0
                            }
                        });

                    if (isCrmModelNoteSoftDeleted) {
                        {
                            let isUpdated = await model.ModelNoteAttachment.update({
                                deleted_at: new Date(),
                                is_deleted: 1,
                                deleted_by: deleted_by

                            }, {
                                    where: {
                                        id_crm_model_note: args.input.id,
                                        created_by: created_by,
                                        is_deleted: 0
                                    }
                                });

                            //const objDeleteMinio = await common.deleteMinioFileById(miniosFileIds);
                            // if (objDeleteMinio.message) {  

                            //  }
                        }
                        message = "The delete was successful with the ID " + args.id;
                    } else {
                        throw new Error(" CrmModelNote ID does not exist");
                    }
                }
            }
            objModelNote.ModelNote = objModelNote;
            objModelNote.message = message;
            return objModelNote;

        } // end of  deleteCrmModelNoteById resolver
    } // end of mutation
}