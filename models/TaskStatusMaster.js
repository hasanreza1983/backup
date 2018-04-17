
/*
 * This model is a part of the TaskStatusMaster
 * Hasan Reza 2018-04-16;
 *
 */

module.exports = function(sequelize, DataTypes) {
    const TaskStatusMaster = sequelize.define('TaskStatusMaster', {
        id: {
            type: DataTypes.TINYINT(3),
		    allowNull: false,
		    primaryKey: true,
            autoIncrement: true
        },			
        task_status: {
            type: DataTypes.STRING(50),
		    allowNull: false
        },			
        weight: {
            type: DataTypes.TINYINT(2),
		    allowNull: false
        }
    }, {
            tableName: 'crm_task_status_master'
        });

    TaskStatusMaster.associate = (models) => {
        
        TaskStatusMaster.hasMany(models.ActivityTask, {
            foreignKey: {
                name: 'id_crm_task_status_master',
                allowNull: true
            }, onDelete: 'CASCADE'
        });		
    }
    return TaskStatusMaster;
};