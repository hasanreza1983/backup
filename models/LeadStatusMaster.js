
/*
 * This model is a part of the LeadStatusMaster
 * Hasan Reza 2018-03-14;
 *
 */

module.exports = function (sequelize, DataTypes) {
    const LeadStatusMaster = sequelize.define('LeadStatusMaster', {
        id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        status: {
            type: DataTypes.STRING(40),
            allowNull: false
        },
        weight: {
            type: DataTypes.TINYINT(2),
            allowNull: false
        }
    }, {
            tableName: 'crm_lead_status_master'
        });

    LeadStatusMaster.associate = (models) => {

        LeadStatusMaster.hasMany(models.Lead, {
            foreignKey: {
                name: 'id_crm_lead_status_master',
                allowNull: true
            }, onDelete: 'CASCADE'
        });

    }
    return LeadStatusMaster;
};