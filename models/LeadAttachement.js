
/*
 * This model is a part of the LeadAttachement
 * Hasan Reza 2018-03-30;
 *
 */

module.exports = function(sequelize, DataTypes) {
    const LeadAttachement = sequelize.define('LeadAttachement', {
        id: {
            type: DataTypes.INTEGER(11),
		    primaryKey: true,
            autoIncrement: true
        },			
        id_crm_lead: {
            type: DataTypes.INTEGER(11),
		    references: {
                model: 'Lead',
                key: 'id'
            }
        },			
        minio_file_id: {
            type: DataTypes.STRING(100)
        },			
        is_deleted: {
            type: DataTypes.TINYINT(1)
        },			
        created_at: {
            type: DataTypes.DATE,
		    defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
        },			
        deleted_at: {
            type: DataTypes.DATE,
		    allowNull: true
        },			
        created_by: {
            type: DataTypes.INTEGER(11)
        },			
        deleted_by: {
            type: DataTypes.INTEGER(11),
		    allowNull: true
        }
    }, {
            tableName: 'crm_lead_attachement'
        });

    LeadAttachement.associate = (models) => {
        LeadAttachement.belongsTo(models.Lead, {
            foreignKey: {
                name: 'id_crm_lead',
                allowNull: true
            }, onDelete: 'CASCADE'
        });

		
        
    }
    return LeadAttachement;
};