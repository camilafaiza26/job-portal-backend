const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); 

const Skill = sequelize.define('skills', {
    id_skill: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    skill_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    tableName: 'skills',
    timestamps: false,
});

module.exports = Skill;
