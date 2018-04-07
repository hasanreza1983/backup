
/*
 * This model is a part of the Address
 * Hasan Reza 2018-03-14;
 *
 */

module.exports = function (sequelize, DataTypes) {
    const Address = sequelize.define('Address', {
        id: {
            type: DataTypes.INTEGER(11),
            primaryKey: true,
            autoIncrement: true
        },
        address_type: {
            type: DataTypes.ENUM('Default', 'Mailing', 'Billing', 'Shipping', 'Others'),
            allowNull: true,
            defaultValue: 'Default'
        },
        street: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        city: {
            type: DataTypes.INTEGER(11),
            allowNull: true
        },
        state_province: {
            type: DataTypes.INTEGER(11),
            allowNull: true
        },
        zip_code: {
            type: DataTypes.STRING(10),
            allowNull: true
        },
        country: {
            type: DataTypes.INTEGER(11),
            allowNull: true
        }
    }, {
            tableName: 'crm_address'
        });
    return Address;
};
