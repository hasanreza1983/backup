
/*
 * This model is a part of the CompanyAttachement
 * Hasan Reza 2018-03-30;
 *
 */

module.exports = function(sequelize, DataTypes) {
    const CompanyAttachement = sequelize.define('CompanyAttachement', {
        id: {
            type: DataTypes.INTEGER(11),
		    primaryKey: true,
            autoIncrement: true
        },			
        id_crm_company: {
            type: DataTypes.INTEGER(11),
		    references: {
                model: 'Company',
                key: 'id'
            }
        },			
        minio_file_id: {
            type: DataTypes.STRING(100)
        },			
        is_deleted: {
            type: DataTypes.TINYINT(1)
        },			
        created_at: {
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
        deleted_by: {
            type: DataTypes.INTEGER(11),
		    allowNull: true
        }
    }, {
            tableName: 'crm_company_attachement'
        });

    CompanyAttachement.associate = (models) => {
        CompanyAttachement.belongsTo(models.Company, {
            foreignKey: {
                name: 'id_crm_company',
                allowNull: true
            }, onDelete: 'CASCADE'
        });

		
        
    }
    return CompanyAttachement;
};