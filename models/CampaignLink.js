/*
 * This model is a part of the CampaignLink
 * Hasan Reza 2018-04-10;
 *
 */
module.exports = function (sequelize, DataTypes) {
    const CampaignLink = sequelize.define('CampaignLink', {
        id: {
            type: DataTypes.INTEGER(11),
            primaryKey: true,
            autoIncrement: true
        },
        model_name: {
            type: DataTypes.ENUM('Lead', 'Contact')
        },
        model_id: {
            type: DataTypes.INTEGER(11)
        },
        id_crm_campaign: {
            type: DataTypes.INTEGER(11),
            references: {
                model: 'Campaign',
                key: 'id'
            }
        },
        id_crm_campaign_status_master: {
            type: DataTypes.TINYINT(3),
            allowNull: true,
            references: {
                model: 'CampaignStatusMaster',
                key: 'id'
            }
        }
    }, {
            tableName: 'crm_campaign_link'
        });

    CampaignLink.associate = (models) => {
        CampaignLink.belongsTo(models.Campaign, {
            foreignKey: {
                name: 'id_crm_campaign',
                allowNull: true
            }, onDelete: 'CASCADE'
        });

        CampaignLink.belongsTo(models.CampaignStatusMaster, {
            foreignKey: {
                name: 'id_crm_campaign_status_master',
                allowNull: true
            }, onDelete: 'CASCADE'
        });

    }
    return CampaignLink;
};