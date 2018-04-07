
/*
 * This model is a part of the CompanyOwnershipMaster
 * Hasan Reza 2018-03-14;
 *
 */

module.exports = function(sequelize, DataTypes) {
    const CompanyOwnershipMaster = sequelize.define('CompanyOwnershipMaster', {
        id: {
            type: DataTypes.INTEGER(11),
		    primaryKey: true,
            autoIncrement: true
        },			
        company_ownership: {
            type: DataTypes.STRING(50)
        },			
        weight: {
            type: DataTypes.TINYINT(2)
        }
    }, {
            tableName: 'crm_company_ownership_master'
        });

    CompanyOwnershipMaster.associate = (models) => {
        
        CompanyOwnershipMaster.hasMany(models.Company, {
            foreignKey: {
                name: 'id_crm_company_ownership_master',
                allowNull: true
            }, onDelete: 'CASCADE'
        });
		
    }
    return CompanyOwnershipMaster;
};