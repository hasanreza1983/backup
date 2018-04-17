/*
 * This model is a part of the ActivityEventLink
 * Arif Khan 2018-04-10;
 *
 */

module.exports = function (sequelize, DataTypes) {
    const ActivityEventLink = sequelize.define('ActivityEventLink', {
        id: {
            type: DataTypes.INTEGER(11),
            primaryKey: true,
            autoIncrement: true
        },
        id_crm_activity_event: {
            type: DataTypes.INTEGER(11),
            references: {
                model: 'ActivityEvent',
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
        tableName: 'crm_activity_event_link'
    });
    return ActivityEventLink;
};