/*
 * This model is a part of the Lead
 * Hasan Reza 2018-03-14;
 *
 */

module.exports = function (sequelize, DataTypes) {
    const Lead = sequelize.define('Lead', {
        id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        owner: {
            type: DataTypes.INTEGER(11),
            allowNull: false
        },
        id_crm_lead_contact_parent: {
            type: DataTypes.INTEGER(11),
            references: {
                model: 'LeadContactParent',
                key: 'id'
            }
        },
        company_name: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        id_crm_lead_status_master: {
            type: DataTypes.INTEGER(11),
            references: {
                model: 'LeadStatusMaster',
                key: 'id'
            }
        },
        id_crm_rating_master: {
            type: DataTypes.INTEGER(11),
            references: {
                model: 'RatingMaster',
                key: 'id'
            }
        },
        no_of_employees: {
            type: DataTypes.INTEGER(5),
            allowNull: true
        },
        annual_revenue: {
            type: DataTypes.DECIMAL(20, 2),
            allowNull: true
        },
        id_crm_industry_master: {
            type: DataTypes.INTEGER(11),
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
        fax: {
            type: DataTypes.STRING(50),
            allowNull: true
        },
        website: {
            type: DataTypes.STRING(100),
            allowNull: true
        },
        skype_url: {
            type: DataTypes.STRING(50),
            allowNull: true
        },
        twitter_url: {
            type: DataTypes.STRING(100),
            allowNull: true
        },
        linkedin_url: {
            type: DataTypes.STRING(100),
            allowNull: true
        },
        facebook_url: {
            type: DataTypes.STRING(100),
            allowNull: true
        },
        is_lead_converted: {
            type: DataTypes.TINYINT(1),
            allowNull: false,
            defaultValue: '0'
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
