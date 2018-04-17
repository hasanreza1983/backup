/*
 * This model is a part of the ActivityEvent
 * Arif Khan 2018-04-06;
 *
 */

module.exports = function (sequelize, DataTypes) {
    const ActivityEvent = sequelize.define('ActivityEvent', {
        id: {
            type: DataTypes.INTEGER(11),
            primaryKey: true,
            autoIncrement: true
        },
        owner: {
            type: DataTypes.INTEGER(11),
            allowNull: true
        },
        subject: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        location: {
            type: DataTypes.STRING(100),
            allowNull: true
        },
        event_start_time: {
            type: DataTypes.DATE,
            allowNull: false
        },
        event_end_time: {
            type: DataTypes.DATE,
            allowNull: true
        },
        description: {
            type: DataTypes.STRING,
            allowNull: true
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
        tableName: 'crm_activity_event'
    });

    ActivityEvent.associate = (models) => {

        /*
        ActivityEvent.belongsToMany(models.Lead, {
            through: {
                model: models.ActivityEventLink,
                unique: false,
                scope: {
                    model_name: 'Lead'
                }
            },
            foreignKey: 'id_crm_activity_event',
            targetKey: 'model_id',
            constraints: false
        });
        */

        ActivityEvent.hasMany(models.ActivityEventLink, {
            foreignKey: 'id_crm_activity_event'
        });

        ActivityEvent.hasMany(models.ActivityEventParticipant, {
            foreignKey: 'id_crm_activity_event',
            as: 'Participants'
        });

    }
    return ActivityEvent;
};