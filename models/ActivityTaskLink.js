/*
 * This model is a part of the ActivityTaskLink
 * Arif Khan 2018-04-10;
 *
 */

module.exports = function (sequelize, DataTypes) {
    const ActivityTaskLink = sequelize.define('ActivityTaskLink', {
        id: {
            type: DataTypes.INTEGER(11),
            primaryKey: true,
            autoIncrement: true
        },
        id_crm_activity_task: {
            type: DataTypes.INTEGER(11),    
            references: {
                model: 'ActivityTask',
                key: 'id'
            }
        },
        model_id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
        },
        model_name: {
            type: DataTypes.ENUM('Campaign', 'Lead', 'Contact', 'Company', 'Deal'),
            allowNull: false
        }
    }, {
        tableName: 'crm_activity_task_link'
    });
    return ActivityTaskLink;
};