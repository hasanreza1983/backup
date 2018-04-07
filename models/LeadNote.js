
/*
 * This model is a part of the LeadNote
 * Hasan Reza 2018-03-28;
 *
 */

module.exports = function (sequelize, DataTypes) {
    const LeadNote = sequelize.define('LeadNote', {
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
        note_title: {
            type: DataTypes.STRING(255),
		    allowNull: true
        },			
        note_description: {
            type: DataTypes.TEXT
        },			
        is_deleted: {
            type: DataTypes.TINYINT(1)
        },			
        created_at: {
            type: DataTypes.DATE,
		    defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
        },			
        updated_at: {
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
        updated_by: {
            type: DataTypes.INTEGER(11),
		    allowNull: true
        },			
        deleted_by: {
            type: DataTypes.INTEGER(11),
		    allowNull: true
        }
    }, {
            tableName: 'crm_lead_note'
        });
    LeadNote.associate = (models) => {

        LeadNote.hasMany(models.LeadNoteAttachement, {           
            foreignKey: {
                name: 'id_crm_lead_note'
            }
        });
        LeadNote.belongsTo(models.Lead, {           
            foreignKey: {
                name: 'id_crm_lead'
            }
        });
    }
    return LeadNote;
};