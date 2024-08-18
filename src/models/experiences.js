const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Applicant = require('./applicants');

const Experience = sequelize.define('experiences', {
    id_experience: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    company_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    last_position: {
        type: DataTypes.STRING,
        allowNull: false
    },
    last_income: {
        type: DataTypes.FLOAT,
        allowNull: true 
    },
    year: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    nik: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
            model: 'applicants', 
            key: 'nik'          
        }
    }
}, {
    tableName: 'experiences',
    timestamps: false
});


Experience.belongsTo(Applicant, { foreignKey: 'nik' });
Applicant.hasMany(Experience, { foreignKey: 'nik' });

module.exports = Experience;
