
/*
 * This model is a part of the ActivityEventParticipant
 * Arif Khan 2018-04-06;
 *
 */

module.exports = function(sequelize, DataTypes) {
    const ActivityEventParticipant = sequelize.define('ActivityEventParticipant', {
        id: {
            type: DataTypes.INTEGER(11),
		    primaryKey: true,
            autoIncrement: true
        },
        id_crm_activity_event: {
            type: DataTypes.INTEGER(11),   
		    references: {
                model: 'ActivityTask',
                key: 'id'
            }
        },
        participant_id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
        },
        is_deleted: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        deleted_at: {
            type: DataTypes.DATE,
		    allowNull: true
        }
    },
    {
        tableName: 'crm_activity_event_participant'
    });

    return ActivityEventParticipant;
};