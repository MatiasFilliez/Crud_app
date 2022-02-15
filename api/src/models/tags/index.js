const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    return sequelize.define('tags', {
        id_tag: {
            type: DataTypes.INTEGER(11),
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
    });
};