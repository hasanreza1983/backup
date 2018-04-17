/*
 * This model is a part of the ModelAttachment
 * Hasan Reza 2018-04-12;
 *
 */

module.exports = function (sequelize, DataTypes) {
    const ModelAttachment = sequelize.define('ModelAttachment', {
        id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        model_name: {
            type: DataTypes.ENUM('Lead', 'Contact', 'Company', 'Deal', 'Campaign'),
            allowNull: false
        },
        model_id: {
            type: DataTypes.INTEGER(11),
            allowNull: false
        },
        minio_file_id: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        is_deleted: {
            type: DataTypes.TINYINT(1),
            allowNull: false
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
            allowNull: false
        },
        deleted_by: {
            type: DataTypes.INTEGER(11),
            allowNull: true
        }
    }, {
            tableName: 'crm_model_attachement'
        });

    ModelAttachment.associate = (models) => {

        // ModelAttachment.belongsTo(models.Lead, {
        //     foreignKey: 'model_id',
        //     constraints: false,
        //     as: 'leadAttachment'
        // });

        // ModelAttachment.belongsTo(models.Contact, {
        //     foreignKey: 'model_id',
        //     constraints: false,
        //     as: 'contactAttachment'
        // });


        // ModelAttachment.belongsTo(models.Company, {
        //     foreignKey: 'model_id',
        //     constraints: false,
        //     as: 'companyAttachment'
        // });

        // ModelAttachment.belongsTo(models.Deal, {
        //     foreignKey: 'model_id',
        //     constraints: false,
        //     as: 'dealAttachment'
        // });

        // ModelAttachment.belongsTo(models.Campaign, {
        //     foreignKey: 'model_id',
        //     constraints: false,
        //     as: 'campaignAttachment'
        // });

    }
    return ModelAttachment;
};