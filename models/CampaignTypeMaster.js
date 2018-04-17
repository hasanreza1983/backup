
/*
 * This model is a part of the CampaignTypeMaster
 * Hasan Reza 2018-04-05;
 *
 */

module.exports = function (sequelize, DataTypes) {
    const CampaignTypeMaster = sequelize.define('CampaignTypeMaster', {
        id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        campaign_type: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        weight: {
            type: DataTypes.TINYINT(2),
            allowNull: false
        }
    }, {
            tableName: 'crm_campaign_type_master'
        });

    CampaignTypeMaster.associate = (models) => {


    }
    return CampaignTypeMaster;
};