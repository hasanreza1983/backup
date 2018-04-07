
/*
 * This model is a part of the LeadSourceMaster
 * Hasan Reza 2018-03-14;
 *
 */

module.exports = function(sequelize, DataTypes) {
    const LeadSourceMaster = sequelize.define('LeadSourceMaster', {
        id: {
            type: DataTypes.INTEGER(11),
		    primaryKey: true,
            autoIncrement: true
        },			
        source: {
            type: DataTypes.STRING(50)
        },			
        weight: {
            type: DataTypes.TINYINT(2)
        }
    }, {
            tableName: 'crm_lead_source_master'
        });

    LeadSourceMaster.associate = (models) => {
        
        LeadSourceMaster.hasMany(models.LeadContactParent, {
            foreignKey: {
                name: 'id_crm_lead_source_master',
                allowNull: true
            }, onDelete: 'CASCADE'
        });
		
    }
    return LeadSourceMaster;
};