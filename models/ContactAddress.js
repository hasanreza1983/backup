
/*
 * This model is a part of the ContactAddress
 * Hasan Reza 2018-03-14;
 *
 */

module.exports = function (sequelize, DataTypes) {
    const ContactAddress = sequelize.define('ContactAddress', {
        id_crm_contact: {
            type: DataTypes.TINYINT(11),
            references: {
                model: 'Contact',
                key: 'id'
            }
        },
        id_crm_address: {
            type: DataTypes.INTEGER(11),
            references: {
                model: 'Address',
                key: 'id'
            }
        }
    }, {
            tableName: 'crm_contact_address'
        });

    ContactAddress.associate = (models) => {

        ContactAddress.belongsTo(models.Contact, {
            foreignKey: {
                name: 'id_crm_contact'
            }
        });

        ContactAddress.belongsTo(models.Address, {
            foreignKey: {
                name: 'id_crm_address'
            }
        });
       
    }

    return ContactAddress;
};
