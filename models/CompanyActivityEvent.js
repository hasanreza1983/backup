
/*
 * This model is a part of the CompanyActivityEvent
 * Arif Khan 2018-04-06;
 *
 */

module.exports = function(sequelize, DataTypes) {
    const CompanyActivityEvent = sequelize.define('CompanyActivityEvent', {
        id: {
            type: DataTypes.INTEGER(11),
		    primaryKey: true,
            autoIncrement: true
        },
        id_crm_company: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
		    references: {
                model: 'Company',
                key: 'id'
            }
        },
        owner: {
            type: DataTypes.INTEGER(11),
            allowNull: true
        },
        title: {
            type: DataTypes.STRING(255),
		    allowNull: false
        },
        location: {
            type: DataTypes.STRING(100),
		    allowNull: true
        },
        event_start_time: {
            type: DataTypes.DATE,
		    allowNull: false
        },
        event_end_time: {
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
        tableName: 'crm_company_activity_event'
    });

    CompanyActivityEvent.associate = (models) => {

        CompanyActivityEvent.belongsTo(models.Company, {
            foreignKey: 'id_crm_company'
        });
        
        CompanyActivityEvent.hasMany(models.CompanyActivityEventParticipant, {
            foreignKey: 'id_crm_company_activity_event',
            as: 'Participants'
        });

    }
    return CompanyActivityEvent;
};