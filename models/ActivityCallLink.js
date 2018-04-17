/*
 * This model is a part of the ActivityCallLink
 * Arif Khan 2018-04-10;
 *
 */

module.exports = function (sequelize, DataTypes) {
    const ActivityCallLink = sequelize.define('ActivityCallLink', {
        id: {
            type: DataTypes.INTEGER(11),
            primaryKey: true,
            autoIncrement: true
        },
        id_crm_activity_call: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            references: {
                model: 'ActivityCall',
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
        tableName: 'crm_activity_call_link'
    });
    return ActivityCallLink;
};