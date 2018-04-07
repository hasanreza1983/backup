
/*
 * This model is a part of the Contact
 * Hasan Reza 2018-03-14;
 *
 */

module.exports = function(sequelize, DataTypes) {
    const Contact = sequelize.define('Contact', {
        id: {
            type: DataTypes.INTEGER(11),
		    primaryKey: true,
            autoIncrement: true
        },			
        owner: {
            type: DataTypes.INTEGER(11)
        },			
        id_crm_lead_contact_parent: {
            type: DataTypes.INTEGER(11),
		    references: {
                model: 'LeadContactParent',
                key: 'id'
            }
        },			
        id_crm_company: {
            type: DataTypes.INTEGER(11),
		    references: {
                model: 'Company',
                key: 'id'
            }
        },			
        home_phone: {
            type: DataTypes.STRING(20),
		    allowNull: true
        },			
        department: {
            type: DataTypes.STRING(100),
		    allowNull: true
        },			
        date_of_birth: {
            type: DataTypes.DATE,
		    allowNull: true
        },			
        assistant_name: {
            type: DataTypes.STRING(50),
		    allowNull: true
        },			
        assistant_parent_id: {
            type: DataTypes.INTEGER(11),
		    allowNull: true
        },			
        assistant_phone: {
            type: DataTypes.STRING(50),
		    allowNull: true
        },			
        reports_to_name: {
            type: DataTypes.STRING(50),
		    allowNull: true
        },			
        reports_to_parent_id: {
            type: DataTypes.INTEGER(11),
		    allowNull: true
        },			
        id_crm_pipeline_stage: {
            type: DataTypes.TINYINT(3),
            allowNull: true,
		    references: {
                model: 'PipelineStage',
                key: 'id'
            }
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
            tableName: 'crm_contact'
        });

    Contact.associate = (models) => {

        Contact.belongsToMany(models.Address, {
            through: models.ContactAddress,
            foreignKey: 'id_crm_contact',
            otherKey: 'id_crm_address',
            as: 'Addresses'
        });
        
        Contact.belongsTo(models.Company, {
            foreignKey: {
                name: 'id_crm_company',
                allowNull: true
            }, onDelete: 'CASCADE'
        });

		Contact.belongsTo(models.Contact, {
            foreignKey: {
                name: 'assistant_parent_id',
                allowNull: true
            },
            as: 'Assistant',
            onDelete: 'CASCADE'
        });

        Contact.belongsTo(models.Contact, {
            foreignKey: {
                name: 'reports_to_parent_id',
                allowNull: true
            },
            as: 'ReportsTo',
            onDelete: 'CASCADE'
        });

		Contact.belongsTo(models.LeadContactParent, {
            foreignKey: {
                name: 'id_crm_lead_contact_parent',
                allowNull: true
            }, onDelete: 'CASCADE'
        });

        Contact.belongsTo(models.PipelineStage, {
            foreignKey: {
                name: 'id_crm_pipeline_stage',
                allowNull: true
            }, onDelete: 'CASCADE'
        });

        Contact.belongsToMany(models.Campaign, {
            through: {
                model: models.CampaignLink,
                unique: false,
                scope: {
                    model_name: 'Contact'
                }
            },
            foreignKey: 'model_id',
            otherKey: 'id_crm_campaign',
            constraints: false
        });
		
    }
    return Contact;
};
