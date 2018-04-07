
/*
 * This model is a part of the ContactRecurrenceDaily
 * Arif Khan 2018-03-23;
 *
 */

module.exports = function(sequelize, DataTypes) {
    const ContactRecurrenceDaily = sequelize.define('ContactRecurrenceDaily', {
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
        daily_option: {
            type: DataTypes.ENUM('daily', 'weekday'),
		    allowNull: true
        },
        daily_day_no: {
            type: DataTypes.INTEGER(11),
            allowNull: true
        },
        is_deleted: {
            type: DataTypes.TINYINT(1)
        },
        deleted_at: {
            type: DataTypes.DATE,
		    allowNull: true
        }
    },
    {
        tableName: 'crm_contact_recurrence_daily'
    });

    return ContactRecurrenceDaily;
};