const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Position = sequelize.define('positions', {
    id_position: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    tableName: 'positions', 
    timestamps: false, 
});

module.exports = Position;
