
/*
 * This model is a part of the Campaign
 * Hasan Reza 2018-04-05;
 *
 */

module.exports = function (sequelize, DataTypes) {
    const Campaign = sequelize.define('Campaign', {
        id: {
            type: DataTypes.INTEGER(11),
            primaryKey: true,
            autoIncrement: true
        },
        owner: {
            type: DataTypes.INTEGER(11),
            allowNull: true
        },
        id_crm_campaign_type_master: {
            type: DataTypes.INTEGER(11),
            allowNull: true
        },
        campaign_name: {
            type: DataTypes.STRING(50),
            allowNull: true
        },
        campaign_status: {
            type: DataTypes.ENUM('Planning', 'Active', 'Inactive', 'Complete'),
            allowNull: true
        },
        start_date: {
            type: DataTypes.DATE,
            allowNull: true
        },
        end_date: {
            type: DataTypes.DATE,
            allowNull: true
        },
        expected_revenue: {
            type: DataTypes.STRING(50)
        },
        budgeted_cost: {
            type: DataTypes.STRING(50),
            allowNull: true
        },
        actual_cost: {
            type: DataTypes.STRING(100)
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true
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
            tableName: 'crm_campaign'
        });

    Campaign.associate = (models) => {
        Campaign.belongsTo(models.CampaignTypeMaster, {
            foreignKey: {
                name: 'id_crm_campaign_type_master',
            }, onDelete: 'CASCADE'
        });

        Campaign.belongsToMany(models.Lead, {
            through: {
                model: models.CampaignLink,
                unique: false,
                scope: {
                    model_name: 'Lead'
                }
            },
            foreignKey: 'id_crm_campaign',
            otherKey: 'model_id',
            constraints: false
        });

        Campaign.belongsToMany(models.Contact, {
            through: {
                model: models.CampaignLink,
                unique: false,
                scope: {
                    model_name: 'Contact'
                }
            },
            foreignKey: 'id_crm_campaign',
            otherKey: 'model_id',
            constraints: false
        });

        Campaign.hasMany(models.Deal, {
            foreignKey: 'id_crm_campaign',
            constraints: false
        });

    }
    return Campaign;
};