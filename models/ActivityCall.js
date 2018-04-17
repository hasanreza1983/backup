/*
 * This model is a part of the ActivityCall
 * Arif Khan 2018-04-06;
 *
 */

module.exports = function (sequelize, DataTypes) {
    const ActivityCall = sequelize.define('ActivityCall', {
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
        call_type: {
            type: DataTypes.ENUM('inbound', 'outbound'),
            allowNull: true
        },
        call_details: {
            type: DataTypes.ENUM('current', 'completed', 'schedule'),
            allowNull: false
        },
        call_start_time: {
            type: DataTypes.DATE,
            allowNull: true
        },
        call_duration: {
            type: DataTypes.INTEGER(11),
            allowNull: true
        },
        result: {
            type: DataTypes.STRING,
            allowNull: true
        },
        description: {
            type: DataTypes.STRING,
            allowNull: true
        },
        is_deleted: {
            type: DataTypes.TINYINT(1),
            allowNull: false,
            defaultValue: '0'
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
            tableName: 'crm_activity_call'
        });

    ActivityCall.associate = (models) => {

        /*
        ActivityCall.belongsToMany(models.Lead, {
            through: {
                model: models.ActivityCallLink,
                unique: false,
                scope: {
                    model_name: 'Lead'
                }
            },
            foreignKey: 'id_crm_activity_call',
            targetKey: 'model_id',
            constraints: false
        });
        */

        ActivityCall.hasMany(models.ActivityCallLink, {
            foreignKey: 'id_crm_activity_call'
        });

    }
    return ActivityCall;
};