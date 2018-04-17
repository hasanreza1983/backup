
/*
 * This model is a part of the ModelNoteAttachment
 * Hasan Reza 2018-04-12;
 *
 */

module.exports = function (sequelize, DataTypes) {
    const ModelNoteAttachment = sequelize.define('ModelNoteAttachment', {
        id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        id_crm_model_note: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            references: {
                model: 'mModelNote',
                key: 'id'
            }
        },
        minio_file_id: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        is_deleted: {
            type: DataTypes.TINYINT(1),
            allowNull: false,
            defaultValue: '0'
        },
        created_at: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
        },
        deleted_at: {
            type: DataTypes.DATE,
            allowNull: true
        },
        created_by: {
            type: DataTypes.INTEGER(11),
            allowNull: true
        },
        deleted_by: {
            type: DataTypes.INTEGER(11),
            allowNull: true
        }
    }, {
            tableName: 'crm_model_note_attachement'
        });

    ModelNoteAttachment.associate = (models) => {
        ModelNoteAttachment.belongsTo(models.ModelNote, {
            foreignKey: {
                name: 'id_crm_model_note',
            }, onDelete: 'CASCADE'
        });
    }
    return ModelNoteAttachment;
};