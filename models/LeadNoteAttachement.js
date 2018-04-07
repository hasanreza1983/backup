
/*
 * This model is a part of the LeadNoteAttachement
 * Hasan Reza 2018-03-30;
 *
 */

module.exports = function(sequelize, DataTypes) {
    const LeadNoteAttachement = sequelize.define('LeadNoteAttachement', {
        id: {
            type: DataTypes.INTEGER(11),
		    primaryKey: true,
            autoIncrement: true
        },			
        id_crm_lead_note: {
            type: DataTypes.INTEGER(11),
		    references: {
                model: 'LeadNote',
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
            type: DataTypes.INTEGER(11),
            allowNull: true
        },			
        deleted_by: {
            type: DataTypes.INTEGER(11),
		    allowNull: true
        }
    }, {
            tableName: 'crm_lead_note_attachement'
        });

    LeadNoteAttachement.associate = (models) => {
        LeadNoteAttachement.belongsTo(models.LeadNote, {
            foreignKey: {
                name: 'id_crm_lead_note',
                allowNull: true
            }, onDelete: 'CASCADE'
        });
	        
    }
    return LeadNoteAttachement;
};