/*
 * This Resolver File belongs to the CrmModelNote type
 * Hasan Reza 2018-03-28;
 *
 */
const axios = require('axios');

const model = require('../../models');
const constant = require('../../lib/constant');
const common = require('../../lib/commonResolver');
const modelNoteValidation = require('../../validation/modelNoteValidation');
const fileStorageServerLink = require('../../config/index').microservicesLinks.fileStorageServerLink;

module.exports = {
    Query: {
        getAllCrmNotesByModel: async (obj, args, context, info) => {
            const arrErrors = modelNoteValidation.validateGetInput(args.input); // validation for CrmModelNote input data
            if (arrErrors.error) {
                throw new Error(arrErrors.error.details[0].message);
            }
            const filter = {
                include: [{
                    model: model.ModelNoteAttachment
                }],
                where: {
                    model_name: args.input.model_name,
                    model_id: args.input.model_id,
                    is_deleted: 0
                }
            };
            const objModel = await model.ModelNote.findAll(filter);

            objModel.ModelNotes = objModel;

            // start of Minio operation
            //TODO:optimize
            const miniosFileIds = [];
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
            //TODO:optimize
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
            const arrErrors = modelNoteValidation.validateCreateInput(args.input); // validation for CrmModelNote input data
            if (arrErrors.error) {
                throw new Error(arrErrors.error.details[0].message);
            }
            args.input.created_by = context.user.id;
            const objModelNote = await model.ModelNote.create(args.input, {
                include: [{
                    model: model.ModelNoteAttachment
                }]
            });
            objModelNote.ModelNote = objModelNote;
            objModelNote.message = constant.SUCCESS;
            return objModelNote;
        }, // end of createCrmModelNote resolver

        updateCrmModelNote: async (obj, args, context, info) => {
            const arrErrors = modelNoteValidation.validateUpdateInput(args.input); // validation for CrmModelNote input data
            if (arrErrors.error) {
                throw new Error(arrErrors.error.details[0].message);
            }
            args.input.updated_by = context.user.id;
            const newData = [];
            const miniosFileIds = [];
            args.input.ModelNoteAttachments.forEach(attachment => {
                if (attachment.is_removed) {
                    miniosFileIds.push(attachment.minio_file_i);
                } else {
                    newData.push({
                        minio_file_id: attachment.minio_file_id,
                        id_crm_model_note: args.id,
                        created_by: context.user.id
                    });
                }
            });
            //const objDeleteMinio = await common.deleteMinioFileById(miniosFileIds);
            // if (objDeleteMinio.message) {  
            await Promise.all([
                model.ModelNote.update(args.input, {
                    where: {
                        id: args.id,
                        is_deleted: 0
                    }
                }),
                model.ModelNoteAttachment.update({
                    deleted_at: new Date(),
                    is_deleted: 1,
                    deleted_by: context.user.id
                }, {
                    where: {
                        minio_file_id: miniosFileIds,
                        id_crm_model_note: args.id,
                        is_deleted: 0
                    }
                }),
                model.ModelNoteAttachment.bulkCreate(newData)
            ]);
            //  }
            return {
                message: constant.SUCCESS
            };
        }, // end of  updateCrmModelNote resolver

        deleteCrmModelNote: async (obj, args, context, info) => {
            const objModelNote = await model.ModelNote.findOne({
                include: [{
                    model: model.ModelNoteAttachment
                }],
                where: {
                    id: args.id,
                    is_deleted: 0
                }
            })
            if (objModelNote) {
                const deleteOption = {
                    deleted_at: new Date(),
                    is_deleted: 1,
                    deleted_by: context.user.id
                };
                const miniosFileIds = [];
                objModelNote.ModelNoteAttachments.forEach(attachment => {
                    miniosFileIds.push(attachment.dataValues.minio_file_id);
                });
                //const objDeleteMinio = await common.deleteMinioFileById(miniosFileIds);
                // if (objDeleteMinio.message) {  
                await Promise.all([model.ModelNote.update(deleteOption, {
                    where: {
                        id: args.id,
                        is_deleted: 0
                    }
                }), model.ModelNoteAttachment.update(deleteOption, {
                    where: {
                        id_crm_model_note: args.id,
                        is_deleted: 0
                    }
                })]);
                //  }
            } else {
                throw new Error(constant.DOES_NOT_EXIST);
            }
            return {
                message: constant.SUCCESS
            };
        } // end of  deleteCrmModelNoteById resolver
    } // end of mutation
}