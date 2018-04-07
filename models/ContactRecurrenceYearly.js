
/*
 * This model is a part of the ContactRecurrenceYearly
 * Arif Khan 2018-03-23;
 *
 */

module.exports = function(sequelize, DataTypes) {
    const ContactRecurrenceYearly = sequelize.define('ContactRecurrenceYearly', {
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
        recur_every_year: {
            type: DataTypes.TINYINT(4),
            allowNull: true
        },
        yearly_option: {
            type: DataTypes.ENUM('monthly', 'weekly'),
		    allowNull: true
        },
        yearly_on_month: {
            type: DataTypes.ENUM('january','february','march','april','may','june','july','august','september','october','november','december'),
            allowNull: true
        },
        yearly_on_month_day: {
            type: DataTypes.TINYINT(4),
            allowNull: true
        },
        yearly_week: {
            type: DataTypes.ENUM('first', 'second', 'third', 'fourth', 'last'),
            allowNull: true
        },
        yearly_day_of_week: {
            type: DataTypes.ENUM('day','weekday','weekend day','sunday','monday','tuesday','wednesday','thursday','friday','saturday'),
            allowNull: true
        },
        yearly_of_every_month: {
            type: DataTypes.ENUM('january','february','march','april','may','june','july','august','september','october','november','december'),
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
        tableName: 'crm_contact_recurrence_yearly'
    });

    return ContactRecurrenceYearly;
};