
/*
 * This model is a part of the ContactNoteAttachement
 * Hasan Reza 2018-03-30;
 *
 */

module.exports = function(sequelize, DataTypes) {
    const ContactNoteAttachement = sequelize.define('ContactNoteAttachement', {
        id: {
            type: DataTypes.INTEGER(11),
		    primaryKey: true,
            autoIncrement: true
        },			
        id_crm_contact_note: {
            type: DataTypes.INTEGER(11),
		    references: {
                model: 'ContactNote',
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
            tableName: 'crm_contact_note_attachement'
        });

    ContactNoteAttachement.associate = (models) => {
        ContactNoteAttachement.belongsTo(models.ContactNote, {
            foreignKey: {
                name: 'id_crm_contact_note',
                allowNull: true
            }, onDelete: 'CASCADE'
        });
	        
    }
    return ContactNoteAttachement;
};