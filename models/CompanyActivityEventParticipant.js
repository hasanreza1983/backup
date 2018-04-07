
/*
 * This model is a part of the CompanyActivityEventParticipant
 * Arif Khan 2018-04-06;
 *
 */

module.exports = function(sequelize, DataTypes) {
    const CompanyActivityEventParticipant = sequelize.define('CompanyActivityEventParticipant', {
        id: {
            type: DataTypes.INTEGER(11),
		    primaryKey: true,
            autoIncrement: true
        },
        id_crm_company_activity_event: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
		    references: {
                model: 'CompanyActivityTask',
                key: 'id'
            }
        },
        participant_id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
        },
        is_deleted: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        deleted_at: {
            type: DataTypes.DATE,
		    allowNull: true
        }
    },
    {
        tableName: 'crm_company_activity_event_participant'
    });

    return CompanyActivityEventParticipant;
};