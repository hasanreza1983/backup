
/*
 * This model is a part of the RatingMaster
 * Hasan Reza 2018-03-14;
 *
 */

module.exports = function (sequelize, DataTypes) {
    const RatingMaster = sequelize.define('RatingMaster', {
        id: {
            type: DataTypes.INTEGER(11),
            primaryKey: true,
            autoIncrement: true
        },
        rating: {
            type: DataTypes.STRING(100)
        },
        weight: {
            type: DataTypes.TINYINT(2)
        }
    }, {
            tableName: 'crm_rating_master'
        });

    RatingMaster.associate = (models) => {

        RatingMaster.hasMany(models.Lead, {
            foreignKey: {
                name: 'id_crm_rating_master',
                allowNull: true
            }, onDelete: 'CASCADE'
        });

    }
    return RatingMaster;
};