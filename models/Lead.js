/*
 * This model is a part of the Lead
 * Hasan Reza 2018-03-14;
 *
 */

module.exports = function (sequelize, DataTypes) {
    const Lead = sequelize.define('Lead', {
        id: {
            type: DataTypes.INTEGER(11),
            primaryKey: true,
            autoIncrement: true
        },
        owner: {
            type: DataTypes.INTEGER(11)
        },
        id_crm_lead_contact_parent: {
            type: DataTypes.INTEGER(11),
            references: {
                model: 'LeadContactParent',
                key: 'id'
            }
        },
        company_name: {
            type: DataTypes.STRING(255)
        },
        id_crm_lead_status_master: {
            type: DataTypes.INTEGER(11),
            allowNull: true,
            references: {
                model: 'LeadStatusMaster',
                key: 'id'
            }
        },
        id_crm_rating_master: {
            type: DataTypes.INTEGER(11),
            allowNull: true,
            references: {
                model: 'RatingMaster',
                key: 'id'
            }
        },
        no_of_employees: {
            type: DataTypes.INTEGER(11),
            allowNull: true
        },
        annual_revenue: {
            type: DataTypes.INTEGER(11),
            allowNull: true
        },
        id_crm_industry_master: {
            type: DataTypes.INTEGER(11),
            allowNull: true,
            references: {
                model: 'IndustryMaster',
                key: 'id'
            }
        },
        id_crm_pipeline_stage: {
            type: DataTypes.TINYINT(3),
            references: {
                model: 'PipelineStage',
                key: 'id'
            }
        },
        is_lead_converted: {
            type: DataTypes.TINYINT(1)
        },
        is_deleted: {
            type: DataTypes.TINYINT(1)
        },
        created_at: {
            type: DataTypes.DATE,
            defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
        },
        updated_at: {
            type: DataTypes.DATE,
            defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
        },
        deleted_at: {
            type: DataTypes.DATE,
            allowNull: true
        },
        created_by: {
            type: DataTypes.INTEGER(11)
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
            tableName: 'crm_lead'
        });

    Lead.associate = function (models) {
        Lead.belongsTo(models.PipelineStage, {
            foreignKey: {
                name: 'id_crm_pipeline_stage',
                allowNull: true
            }, onDelete: 'CASCADE'
        });

        Lead.belongsTo(models.IndustryMaster, {
            foreignKey: {
                name: 'id_crm_industry_master',
                allowNull: true
            }, onDelete: 'CASCADE'
        });

        Lead.belongsTo(models.LeadContactParent, {
            foreignKey: {
                name: 'id_crm_lead_contact_parent',
                allowNull: true
            }, onDelete: 'CASCADE'
        });

        Lead.belongsTo(models.LeadStatusMaster, {
            foreignKey: {
                name: 'id_crm_lead_status_master',
                allowNull: true
            }, onDelete: 'CASCADE'
        });

        Lead.belongsTo(models.RatingMaster, {
            foreignKey: {
                name: 'id_crm_rating_master',
                allowNull: true
            }, onDelete: 'CASCADE'
        });

        Lead.belongsToMany(models.Address, {
            as: 'Addresses',
            through: models.LeadAddress,
            foreignKey: 'id_crm_lead',
            otherKey: 'id_crm_address'
        });

        Lead.hasMany(models.LeadNote, {
            foreignKey: {
                name: 'id_crm_lead'
            }
        });
  
        Lead.belongsToMany(models.Campaign, {
            through: {
                model: models.CampaignLink,
                unique: false,
                scope: {
                    model_name: 'Lead'
                }
            },
            foreignKey: 'model_id',
            otherKey: 'id_crm_campaign',
            constraints: false
        });
        
    }
    return Lead;
};
