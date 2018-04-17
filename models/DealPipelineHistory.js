
/*
 * This model is a part of the DealPipelineHistory
 * Hasan Reza 2018-04-05;
 *
 */
module.exports = function (sequelize, DataTypes) {
    const DealPipelineHistory = sequelize.define('DealPipelineHistory', {
        id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        id_crm_deal: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            references: {
                model: 'Deal',
                key: 'id'
            }
        },
        id_crm_pipeline_stage: {
            type: DataTypes.TINYINT(3),
            allowNull: false,
            references: {
                model: 'PipelineStage',
                key: 'id'
            }
        },
        amount: {
            type: DataTypes.DECIMAL(20, 2),
            allowNull: true
        },
        expected_revenue: {
            type: DataTypes.DECIMAL(20, 2),
            allowNull: true
        },
        closing_date: {
            type: DataTypes.DATE,
            allowNull: true
        },
        stage_duration: {
            type: DataTypes.STRING(50),
            allowNull: true
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
        updated_at: {
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
        updated_by: {
            type: DataTypes.INTEGER(11),
            allowNull: true
        },
        deleted_by: {
            type: DataTypes.INTEGER(11),
            allowNull: true
        }
    }, {
            tableName: 'crm_deal_pipeline_history'
        });

    DealPipelineHistory.associate = (models) => {
        DealPipelineHistory.belongsTo(models.Deal, {
            foreignKey: {
                name: 'id_crm_deal',
                allowNull: true
            }, onDelete: 'CASCADE'
        });

        DealPipelineHistory.belongsTo(models.PipelineStage, {
            foreignKey: {
                name: 'id_crm_pipeline_stage',
                allowNull: true
            }, onDelete: 'CASCADE'
        });
    }
    return DealPipelineHistory;
};