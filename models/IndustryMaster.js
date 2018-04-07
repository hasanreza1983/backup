
/*
 * This model is a part of the IndustryMaster
 * Hasan Reza 2018-03-14;
 *
 */

module.exports = function(sequelize, DataTypes) {
    const IndustryMaster = sequelize.define('IndustryMaster', {
        id: {
            type: DataTypes.INTEGER(11),
		    primaryKey: true,
            autoIncrement: true
        },			
        industry_name: {
            type: DataTypes.STRING(50)
        },			
        weight: {
            type: DataTypes.TINYINT(2)
        }
    }, {
            tableName: 'crm_industry_master'
        });

    IndustryMaster.associate = (models) => {
        
        IndustryMaster.hasMany(models.Company, {
            foreignKey: {
                name: 'id_crm_industry_master',
                allowNull: true
            }, onDelete: 'CASCADE'
        });

		IndustryMaster.hasMany(models.Lead, {
            foreignKey: {
                name: 'id_crm_industry_master',
                allowNull: true
            }, onDelete: 'CASCADE'
        });		
    }
    return IndustryMaster;
};