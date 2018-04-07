
/*
 * This model is a part of the CompanyStatusMaster
 * Hasan Reza 2018-03-14;
 *
 */

module.exports = function(sequelize, DataTypes) {
    const CompanyStatusMaster = sequelize.define('CompanyStatusMaster', {
        id: {
            type: DataTypes.TINYINT(3),
		    primaryKey: true,
            autoIncrement: true
        },			
        company_status: {
            type: DataTypes.STRING(50)
        },			
        weight: {
            type: DataTypes.TINYINT(2)
        }
    }, {
            tableName: 'crm_company_status_master'
        });

    CompanyStatusMaster.associate = (models) => {
        
        CompanyStatusMaster.hasMany(models.Company, {
            foreignKey: {
                name: 'id_crm_company_status_master',
                allowNull: true
            }, onDelete: 'CASCADE'
        });
		
    }
    return CompanyStatusMaster;
};