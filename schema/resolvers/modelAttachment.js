/*
 * This Resolver File belongs to the CrmModelAttachment type
 * Hasan Reza 2018-03-28;
 *
 */
const model = require('../../models');
const validation = require('../../validation/modelAttachmentValidation');
const constant = require('../../lib/constant');
const common = require('../../lib/commonResolver');
const modleInclude = [{ model: model.ModelAttachmentAttachment }];

const axios = require('axios');
const { fileStorageServerLink } = require('../../config/index').microservicesLinks;

let message = '';
module.exports = {
    Query: {
        getCrmModelAttachmentList: async (obj, args, context, info) => {
            const objModelAttachments = await model.ModelAttachment.findAll({
                where: {
                    model_name: args.input.model_name,
                    model_id: args.input.model_id,
                    is_deleted: 0
                }
            });
            // start of Minio operation
            let miniosFileIds = [];
            for (let [key, attachment] of Object.entries(objModelAttachments)) {
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

            objModelAttachments.forEach(obj => {
                obj.minio_file_url = arrFileIds[obj.minio_file_id];
            });

            // End of Minio operation
            return {
                ModelAttachments: objModelAttachments,
                message: constant.SUCCESS
            };
        }, // end of getAllCrmModelAttachment resolver

    }, // end of query

    Mutation: {
        createCrmModelAttachment: async (obj, args, context, info) => {

            // Prepare array to validate fields
            let objModelAttachment = [];
            let arrErrors = [];
            let responseStatus = [];

            let created_by = '';
            if (context.user.id) {
                created_by = context.user.id;
            }

            arrErrors = validation.validateCreateInput(args.input); // validation for CrmModelAttachment input data
            //arrErrors.error = null;
            if (arrErrors.error != null) {
                throw new Error(arrErrors.error.details[0].message);
            } else {
                try {
                    await Promise.all(args.input.ModelAttachments.map(async (ModelAttachment, i) => {
                        if (ModelAttachment.id) {
                            args.input.ModelAttachments.splice(i, 1);
                        } else {
                            ModelAttachment.model_name = args.input.model_name;
                            ModelAttachment.model_id = args.input.model_id;
                            ModelAttachment.created_by = created_by;
                        }
                    }));

                    model.ModelAttachment.bulkCreate(args.input.ModelAttachments, { individualHooks: true })
                    objModelAttachment.message = "Attachment(s) saved successfully!";
                    return objModelAttachment;

                } catch (err) {
                    objModelAttachment.message = err.message;
                    return objModelAttachment;
                }
            }
        }, // end of createCrmModelAttachment resolver

        deleteCrmModelAttachmentById: async (obj, args, context, info) => {
            // Prepare array to validate fields
            let objModelAttachment = [];
            let arrErrors = [];
            let responseStatus = [];

            let created_by = '';
            if (context.user.id) {
                created_by = context.user.id;
            }
            arrErrors = validation.validateDeleteInput(args.input); // validation for CrmModelAttachment input data
            // arrErrors.error = null;
            if (arrErrors.error != null) {
                throw new Error(arrErrors.error.details[0].message);
            } else {
                const objModelAttachment = await model.ModelAttachment.findOne({
                    where: {
                        id: args.input.id,
                        minio_file_id: args.input.minio_file_id,
                        created_by: created_by,
                        is_deleted: 0
                    }
                })
                if (objModelAttachment) {
                    let isCrmModelAttachmentSoftDeleted = await model.ModelAttachment.update({
                        deleted_at: new Date(),
                        is_deleted: 1
                    }, {
                            where: {
                                id: args.input.id,
                                minio_file_id: args.input.minio_file_id,
                                created_by: created_by,
                                is_deleted: 0
                            }
                        });

                    if (isCrmModelAttachmentSoftDeleted) {
                        //const objDeleteMinio = await common.deleteMinioFileById(args.input.minio_file_id);
                        // if (objDeleteMinio.message) {
                        message = "Attachment deleted successfully!";
                        //  }
                    }
                } else {
                    throw new Error("Attachment ID does not exist");
                }
            }
            objModelAttachment.ModelAttachment = objModelAttachment;
            objModelAttachment.message = message;
            return objModelAttachment;

        } // end of  deleteCrmModelAttachmentById resolver
    } // end of mutation
}