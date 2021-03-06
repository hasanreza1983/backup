
/*
 * This model is a part of the ContactRecurrenceWeekly
 * Arif Khan 2018-03-23;
 *
 */

module.exports = function(sequelize, DataTypes) {
    const ContactRecurrenceWeekly = sequelize.define('ContactRecurrenceWeekly', {
        id: {
            type: DataTypes.INTEGER(11),
		    primaryKey: true,
            autoIncrement: true
        },
        id_crm_contact_activity_task: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
		    references: {
                model: 'ContactActivityTask',
                key: 'id'
            }
        },
        recur_every_week: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            defaultValue: 1
        },
        weekly_monday: {
            type: DataTypes.BOOLEAN,
		    allowNull: false,
            defaultValue: false
        },
        weekly_tuesday: {
            type: DataTypes.BOOLEAN,
		    allowNull: false,
            defaultValue: false
        },
        weekly_wednesday: {
            type: DataTypes.BOOLEAN,
		    allowNull: false,
            defaultValue: false
        },
        weekly_thursday: {
            type: DataTypes.BOOLEAN,
		    allowNull: false,
            defaultValue: false
        },
        weekly_friday: {
            type: DataTypes.BOOLEAN,
		    allowNull: false,
            defaultValue: false
        },
        weekly_saturday: {
            type: DataTypes.BOOLEAN,
		    allowNull: false,
            defaultValue: false
        },
        weekly_sunday: {
            type: DataTypes.BOOLEAN,
		    allowNull: false,
            defaultValue: false
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
        tableName: 'crm_contact_recurrence_weekly'
    });

    return ContactRecurrenceWeekly;
};