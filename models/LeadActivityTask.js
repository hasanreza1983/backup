
/*
 * This model is a part of the LeadActivityTask
 * Arif Khan 2018-04-05;
 *
 */

module.exports = function(sequelize, DataTypes) {
    const LeadActivityTask = sequelize.define('LeadActivityTask', {
        id: {
            type: DataTypes.INTEGER(11),
		    primaryKey: true,
            autoIncrement: true
        },
        id_crm_lead: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
		    references: {
                model: 'Lead',
                key: 'id'
            }
        },
        subject: {
            type: DataTypes.STRING(255),
		    allowNull: false
        },
        due_date: {
            type: DataTypes.DATE,
		    allowNull: false
        },
        task_status: {
            type: DataTypes.ENUM('Not Started','Deferred','In Progress','Completed','Waiting on Someone Else'),
		    allowNull: true
        },
        recurrence_type: {
            type: DataTypes.ENUM('daily','weekly','monthly','yearly','none'),
		    allowNull: true
        },
        end_date_option: {
            type: DataTypes.INTEGER(1),
		    allowNull: true
        },
        end_after_occurence: {
            type: DataTypes.INTEGER(11),
		    allowNull: true
        },
        recurrence_end_date: {
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
    },
    {
        tableName: 'crm_lead_activity_task'
    });

    LeadActivityTask.associate = (models) => {

        LeadActivityTask.belongsTo(models.Lead, {
            foreignKey: 'id_crm_lead'
        });
        
        LeadActivityTask.hasMany(models.LeadRecurrenceDaily, {
            foreignKey: 'id_crm_lead_activity_task',
            as: 'daily'
        });

        LeadActivityTask.hasMany(models.LeadRecurrenceMonthly, {
            foreignKey: 'id_crm_lead_activity_task',
            as: 'monthly'
        });

        LeadActivityTask.hasMany(models.LeadRecurrenceWeekly, {
            foreignKey: 'id_crm_lead_activity_task',
            as: 'weekly'
        });

        LeadActivityTask.hasMany(models.LeadRecurrenceYearly, {
            foreignKey: 'id_crm_lead_activity_task',
            as: 'yearly'
        });

    }
    return LeadActivityTask;
};