/*
 * This model is a part of the ActivityTask
 * Arif Khan 2018-03-16;
 *
 */

module.exports = function (sequelize, DataTypes) {
    const ActivityTask = sequelize.define('ActivityTask', {
        id: {
            type: DataTypes.INTEGER(11),
            primaryKey: true,
            autoIncrement: true
        },
        owner: {
            type: DataTypes.INTEGER(11),
            allowNull: false
        },
        subject: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        due_date: {
            type: DataTypes.DATE,
            allowNull: false
        },
        id_crm_task_status_master: {
            type: DataTypes.TINYINT(3),
            allowNull: true,
            references: {
                model: 'TaskStatusMaster',
                key: 'id'
            }
        },
        recurrence_type: {
            type: DataTypes.ENUM('daily', 'weekly', 'monthly', 'yearly', 'none'),
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
    }, {
            tableName: 'crm_activity_task'
        });

    ActivityTask.associate = (models) => {
        /*
        ActivityTask.belongsToMany(models.Lead, {
            through: {
                model: models.ActivityTaskLink,
                unique: false,
                scope: {
                    model_name: 'Lead'
                }
            },
            foreignKey: 'id_crm_activity_task',
            targetKey: 'model_id',
            constraints: false
        });
        */

        ActivityTask.hasMany(models.ActivityTaskLink, {
            foreignKey: 'id_crm_activity_task'
        });

        ActivityTask.hasMany(models.RecurrenceDaily, {
            foreignKey: 'id_crm_activity_task',
            as: 'Daily'
        });

        ActivityTask.hasMany(models.RecurrenceMonthly, {
            foreignKey: 'id_crm_activity_task',
            as: 'Monthly'
        });

        ActivityTask.hasMany(models.RecurrenceWeekly, {
            foreignKey: 'id_crm_activity_task',
            as: 'Weekly'
        });

        ActivityTask.hasMany(models.RecurrenceYearly, {
            foreignKey: 'id_crm_activity_task',
            as: 'Yearly'
        });

        ActivityTask.belongsTo(models.TaskStatusMaster, {
            foreignKey: {
                name: 'id_crm_task_status_master',
                allowNull: true
            }, onDelete: 'CASCADE'
        });
    }
    return ActivityTask;
};