
/*
 * This model is a part of the LeadAddress
 * Hasan Reza 2018-03-14;
 *
 */

module.exports = function (sequelize, DataTypes) {
    const LeadAddress = sequelize.define('LeadAddress', {
        id_crm_lead: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            references: {
                model: 'Lead',
                key: 'id'
            }
        },
        id_crm_address: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            references: {
                model: 'Address',
                key: 'id'
            }
        }
    }, {
            tableName: 'crm_lead_address'
        });

    LeadAddress.associate = (models) => {

        LeadAddress.belongsTo(models.Address, {
            foreignKey: {
                name: 'id_crm_address',
                allowNull: true
            }, onDelete: 'CASCADE'
        });
    }
    return LeadAddress;
};
