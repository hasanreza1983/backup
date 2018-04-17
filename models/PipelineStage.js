/*
 * This model is a part of the PipelineStage
 * Hasan Reza 2018-03-14;
 *
 */

module.exports = function (sequelize, DataTypes) {
    const PipelineStage = sequelize.define('PipelineStage', {
        id: {
            type: DataTypes.TINYINT(3),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        id_crm_pipeline: {
            type: DataTypes.TINYINT(2),
            allowNull: false,
            references: {
                model: 'Pipeline',
                key: 'id'
            }
        },
        stage_name: {
            type: DataTypes.STRING(40),
            allowNull: false
        },
        win_probabality: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        weight: {
            type: DataTypes.TINYINT(2),
            allowNull: false
        }
    }, {
            tableName: 'crm_pipeline_stage'
        });

    PipelineStage.associate = (models) => {

        PipelineStage.belongsTo(models.Pipeline, {
            foreignKey: {
                name: 'id_crm_pipeline',
                allowNull: true
            }, onDelete: 'CASCADE'
        });

        PipelineStage.hasMany(models.Contact, {
            foreignKey: {
                name: 'id_crm_pipeline_stage',
                allowNull: true
            }, onDelete: 'CASCADE'
        });

        PipelineStage.hasMany(models.Lead, {
            foreignKey: {
                name: 'id_crm_pipeline_stage',
                allowNull: true
            }, onDelete: 'CASCADE'
        });
    }
    return PipelineStage;
};
