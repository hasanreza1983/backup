
/*
 * This model is a part of the LeadRecurrenceDaily
 * Arif Khan 2018-03-23;
 *
 */

module.exports = function(sequelize, DataTypes) {
    const LeadRecurrenceDaily = sequelize.define('LeadRecurrenceDaily', {
        id: {
            type: DataTypes.INTEGER(11),
		    primaryKey: true,
            autoIncrement: true
        },
        id_crm_lead_activity_task: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
		    references: {
                model: 'LeadActivityTask',
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
        tableName: 'crm_lead_recurrence_daily'
    });

    return LeadRecurrenceDaily;
};