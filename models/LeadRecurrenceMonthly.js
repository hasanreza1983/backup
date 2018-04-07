
/*
 * This model is a part of the LeadRecurrenceMonthly
 * Arif Khan 2018-03-23;
 *
 */

module.exports = function(sequelize, DataTypes) {
    const LeadRecurrenceMonthly = sequelize.define('LeadRecurrenceMonthly', {
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
        monthly_option: {
            type: DataTypes.ENUM('day', 'weekly'),
		    allowNull: true
        },
        monthly_day: {
            type: DataTypes.INTEGER(11),
            allowNull: true
        },
        monthly_every_month: {
            type: DataTypes.INTEGER(11),
            allowNull: true
        },
        monthly_week: {
            type: DataTypes.STRING(25),
            allowNull: true
        },
        monthly_day_of_week: {
            type: DataTypes.STRING(25),
            allowNull: true
        },
        monthly_of_every_month: {
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
        tableName: 'crm_lead_recurrence_monthly'
    });

    return LeadRecurrenceMonthly;
};