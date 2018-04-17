
/*
 * This model is a part of the CompanyAddress
 * Hasan Reza 2018-03-14;
 *
 */

module.exports = function (sequelize, DataTypes) {
    const CompanyAddress = sequelize.define('CompanyAddress', {
        id_crm_company: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            references: {
                model: 'Company',
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
            tableName: 'crm_company_address'
        });


    CompanyAddress.associate = (models) => {

        CompanyAddress.belongsTo(models.Address, {
            foreignKey: {
                name: 'id_crm_address',
            }
        });
        CompanyAddress.belongsTo(models.Company, {
            foreignKey: {
                name: 'id_crm_company',
            }
        });

    }

    return CompanyAddress;
};
