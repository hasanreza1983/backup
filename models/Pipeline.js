
/*
 * This model is a part of the CrmPipeline
 * Hasan Reza 2018-03-14;
 *
 */

module.exports = function (sequelize, DataTypes) {
    const Pipeline = sequelize.define('Pipeline', {
        id: {
            type: DataTypes.TINYINT(2),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        pipeline_name: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        is_active: {
            type: DataTypes.TINYINT(1),
            allowNull: false,
            defaultValue: 1
        }
    }, {
            tableName: 'crm_pipeline'
        });

    Pipeline.associate = (models) => {

        Pipeline.hasMany(models.PipelineStage, {
            foreignKey: {
                name: 'id_crm_pipeline',
                allowNull: true
            }, onDelete: 'CASCADE'
        });

    }
    return Pipeline;
};
