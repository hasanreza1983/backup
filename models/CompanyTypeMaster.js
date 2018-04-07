
/*
 * This model is a part of the CompanyTypeMaster
 * Hasan Reza 2018-03-14;
 *
 */

module.exports = function(sequelize, DataTypes) {
    const CompanyTypeMaster = sequelize.define('CompanyTypeMaster', {
        id: {
            type: DataTypes.INTEGER(11),
		    primaryKey: true,
            autoIncrement: true
        },			
        company_type: {
            type: DataTypes.STRING(50)
        },			
        weight: {
            type: DataTypes.TINYINT(2)
        }
    }, {
            tableName: 'crm_company_type_master'
        });

    CompanyTypeMaster.associate = (models) => {
        
        CompanyTypeMaster.hasMany(models.Company, {
            foreignKey: {
                name: 'id_crm_company_type_master',
                allowNull: true
            }, onDelete: 'CASCADE'
        });

		
    }
    return CompanyTypeMaster;
};