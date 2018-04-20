/*
 * This Resolver File belongs to the CrmModelAttachment type
 * Hasan Reza 2018-03-28;
 *
 */
const axios = require('axios');

const model = require('../../models');
const constant = require('../../lib/constant');
const common = require('../../lib/commonResolver');
const modelAttachmentValidation = require('../../validation/modelAttachmentValidation');
const fileStorageServerLink = require('../../config/index').microservicesLinks.fileStorageServerLink;

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
            const miniosFileIds = [];
            for (let [key, attachment] of Object.entries(objModelAttachments)) {
                miniosFileIds.push(attachment.dataValues.minio_file_id);
            }
            // sending request to file storage API to get file url                  
            if (miniosFileIds.length > 0 && process.env.FILE_STORAGE_MANAGER_SERVICE_HOST && process.env.FILE_STORAGE_MANAGER_SERVICE_PORT) {
                const attachmentFilesUrl = await axios.post(fileStorageServerLink + 'files-get', {
                    files: miniosFileIds
                });
                // check errors
                if (attachmentFilesUrl.data.errors.length > 0) {
                    throw new Error(attachmentFilesUrl.data.errors);
                }
                const arrFileIds = attachmentFilesUrl.data.fileIds;
                objModelAttachments.forEach(obj => {
                    obj.minio_file_url = arrFileIds[obj.minio_file_id];
                });
            }
            return {
                ModelAttachments: objModelAttachments,
                message: constant.SUCCESS
            };
        }, // end of getAllCrmModelAttachment resolver

    }, // end of query

    Mutation: {
        createCrmModelAttachment: async (obj, args, context, info) => {
            const arrErrors = modelAttachmentValidation.validateInput(args.input); // validation for ModelAttachment input data
            if (arrErrors.error) {
                throw new Error(arrErrors.error.details[0].message);
            }
            args.input.ModelAttachments.forEach(ModelAttachment => {
                ModelAttachment.model_name = args.input.model_name;
                ModelAttachment.model_id = args.input.model_id;
                ModelAttachment.created_by = context.user.id;
            });
            model.ModelAttachment.bulkCreate(args.input.ModelAttachments);
            return {
                message: constant.SUCCESS
            };
        }, // end of createCrmModelAttachment resolver

        deleteCrmModelAttachmentById: async (obj, args, context, info) => {
            const objModelAttachment = await model.ModelAttachment.findOne({
                where: {
                    id: args.id,
                    is_deleted: 0
                }
            })
            if (objModelAttachment) {
                //const objDeleteMinio = await common.deleteMinioFileById([objModelAttachment.minio_file_id]);
                // if (objDeleteMinio.message) {
                objModelAttachment.deleted_at = new Date();
                objModelAttachment.is_deleted = 1;
                objModelAttachment.deleted_by = context.user.id;
                await objModelAttachment.save();
                //  }
            } else {
                throw new Error(constant.DOES_NOT_EXIST);
            }
            return {
                message: constant.SUCCESS
            };

        } // end of  deleteCrmModelAttachmentById resolver
    } // end of mutation
}