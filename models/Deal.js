
/*
 * This model is a part of the Deal
 * Hasan Reza 2018-04-05;
 *
 */

module.exports = function (sequelize, DataTypes) {
    const Deal = sequelize.define('Deal', {
        id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        owner: {
            type: DataTypes.INTEGER(11),
            allowNull: true
        },
        id_crm_contact: {
            type: DataTypes.INTEGER(11),
            allowNull: true,
            references: {
                model: 'Contact',
                key: 'id'
            }
        },
        id_crm_company: {
            type: DataTypes.INTEGER(11),
            allowNull: true,
            references: {
                model: 'Company',
                key: 'id'
            }
        },
        deal_name: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        deal_type: {
            type: DataTypes.ENUM('none', 'existing_business', 'new_business'),
            allowNull: true
        },
        deal_closing_date: {
            type: DataTypes.DATE,
            allowNull: false
        },
        deal_amount: {
            type: DataTypes.DECIMAL(20, 2),
            allowNull: true
        },
        expected_revenue: {
            type: DataTypes.DECIMAL(20, 2),
            allowNull: true
        },
        id_crm_lead_source_master: {
            type: DataTypes.INTEGER(11),
            allowNull: true,
            references: {
                model: 'LeadSourceMaster',
                key: 'id'
            }
        },
        id_crm_campaign: {
            type: DataTypes.INTEGER(11),
            allowNull: true,
            references: {
                model: 'Campaign',
                key: 'id'
            }
        },
        id_crm_pipeline_stage: {
            type: DataTypes.TINYINT(3),
            allowNull: true,
            references: {
                model: 'PipelineStage',
                key: 'id'
            }
        },
        next_step: {
            type: DataTypes.STRING(50),
            allowNull: true
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        is_deleted: {
            type: DataTypes.TINYINT(1),
            allowNull: false,
            defaultValue: '0'
        },
        created_at: {
            type: DataTypes.DATE,
            allowNull: true,
            defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
        },
        updated_at: {
            type: DataTypes.DATE,
            allowNull: true,
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
            tableName: 'crm_deal'
        });

    Deal.associate = (models) => {
        Deal.belongsTo(models.Campaign, {
            foreignKey: {
                name: 'id_crm_campaign',
                allowNull: true
            }, onDelete: 'CASCADE'
        });

        Deal.belongsTo(models.Company, {
            foreignKey: {
                name: 'id_crm_company',
                allowNull: true
            }, onDelete: 'CASCADE'
        });
        Deal.belongsTo(models.Contact, {
            foreignKey: {
                name: 'id_crm_contact',
                allowNull: true
            }, onDelete: 'CASCADE'
        });
        Deal.belongsTo(models.LeadSourceMaster, {
            foreignKey: {
                name: 'id_crm_lead_source_master',
                allowNull: true
            }, onDelete: 'CASCADE'
        });
        Deal.belongsTo(models.PipelineStage, {
            foreignKey: {
                name: 'id_crm_pipeline_stage',
                allowNull: true
            }, onDelete: 'CASCADE'
        });

        Deal.hasMany(models.DealPipelineHistory, {
            foreignKey: {
                name: 'id_crm_deal',
                allowNull: true
            }, onDelete: 'CASCADE'
        });

        Deal.hasMany(models.ModelNote, {
            foreignKey: 'model_id',
            constraints: false,
            scope: {
                model_name: 'Deal'
            }
        });
        Deal.hasMany(models.ModelAttachment, {
            foreignKey: 'model_id',
            constraints: false,
            scope: {
                model_name: 'Deal'
            }
        });
    }
    return Deal;
};