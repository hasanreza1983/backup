
/*
 * This model is a part of the CampaignStatusMaster
 * Hasan Reza 2018-04-10;
 *
 */

module.exports = function (sequelize, DataTypes) {
    const CampaignStatusMaster = sequelize.define('CampaignStatusMaster', {
        id: {
            type: DataTypes.TINYINT(3),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        company_status: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        weight: {
            type: DataTypes.TINYINT(2),
            allowNull: false
        }
    }, {
            tableName: 'crm_company_status_master'
        });

    CampaignStatusMaster.associate = (models) => {

        CampaignStatusMaster.hasMany(models.CampaignLink, {
            foreignKey: {
                name: 'id_crm_campaign_status_master',
                allowNull: true
            }, onDelete: 'CASCADE'
        });


    }
    return CampaignStatusMaster;
};