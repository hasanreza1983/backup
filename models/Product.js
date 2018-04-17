
/*
 * This model is a part of the Product
 * Hasan Reza 2018-04-17;
 *
 */

module.exports = function(sequelize, DataTypes) {
    const Product = sequelize.define('Product', {
        id: {
            type: DataTypes.INTEGER(11),
		    allowNull: false,
		    primaryKey: true,
            autoIncrement: true
        },			
        owner: {
            type: DataTypes.INTEGER(11),
		    allowNull: true
        },			
        product_name: {
            type: DataTypes.STRING(100),
		    allowNull: true
        },			
        product_code: {
            type: DataTypes.STRING(100),
		    allowNull: true
        },			
        product_sku: {
            type: DataTypes.STRING(100),
		    allowNull: false
        },			
        product_display_url: {
            type: DataTypes.STRING(255),
		    allowNull: true
        },			
        description: {
            type: DataTypes.TEXT,
		    allowNull: true
        },			
        is_active: {
            type: DataTypes.TINYINT(1),
		    allowNull: false,
		    defaultValue:  1
        },			
        is_deleted: {
            type: DataTypes.TINYINT(1),
		    allowNull: false
        },			
        created_at: {
            type: DataTypes.DATE,
		    allowNull: false,
		    defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
        },			
        updated_at: {
            type: DataTypes.DATE,
		    allowNull: false,
		    defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
        },			
        deleted_at: {
            type: DataTypes.DATE,
		    allowNull: true
        },			
        created_by: {
            type: DataTypes.INTEGER(11),
            allowNull: true
        },			
        deleted_by: {
            type: DataTypes.INTEGER(11),
            allowNull: true
        },			
        updated_by: {
            type: DataTypes.INTEGER(11),
            allowNull: true
        }
    }, {
            tableName: 'crm_product'
        });

    Product.associate = (models) => {
        
        
    }
    return Product;
};