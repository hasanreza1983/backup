
/*
 * This model is a part of the CampaignStatusMaster
 * Hasan Reza 2018-04-10;
 *
 */

module.exports = function(sequelize, DataTypes) {
    const CampaignStatusMaster = sequelize.define('CampaignStatusMaster', {
        id: {
            type: DataTypes.TINYINT(3),
		    primaryKey: true,
            autoIncrement: true
        },			
        campaign_status: {
            type: DataTypes.STRING(40)
        },			
        weight: {
            type: DataTypes.TINYINT(2)
        }
    }, {
            tableName: 'crm_campaign_status_master'
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