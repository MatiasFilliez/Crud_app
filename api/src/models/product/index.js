const { DataTypes, INTEGER } = require("sequelize");

module.exports = (sequelize) => {
    return sequelize.define('product', {
        id: {
            type: DataTypes.INTEGER(11),
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
    });
};