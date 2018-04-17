
/*
 * This model is a part of the LeadContactParent
 * Hasan Reza 2018-03-14;
 *
 */

module.exports = function (sequelize, DataTypes) {
    const LeadContactParent = sequelize.define('LeadContactParent', {
        id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        first_name: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        last_name: {
            type: DataTypes.STRING(100),
            allowNull: true
        },
        title: {
            type: DataTypes.STRING(100),
            allowNull: true
        },
        designation: {
            type: DataTypes.STRING(100),
            allowNull: true
        },
        phone: {
            type: DataTypes.STRING(20),
            allowNull: true
        },
        mobile: {
            type: DataTypes.STRING(20),
            allowNull: true
        },
        email: {
            type: DataTypes.STRING(100),
            allowNull: true
        },
        secondary_email: {
            type: DataTypes.STRING(100),
            allowNull: true
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        id_crm_lead_source_master: {
            type: DataTypes.INTEGER(11),
            allowNull: true,
            references: {
                model: 'LeadSourceMaster',
                key: 'id'
            }
        },
        is_lead: {
            type: DataTypes.TINYINT(1),
            allowNull: true,
            defaultValue: 1
        }
    }, {
            tableName: 'crm_lead_contact_parent'
        });

    LeadContactParent.associate = (models) => {
        LeadContactParent.belongsTo(models.LeadSourceMaster, {
            foreignKey: {
                name: 'id_crm_lead_source_master',
                allowNull: true
            }, onDelete: 'CASCADE'
        });
    }
    return LeadContactParent;
};