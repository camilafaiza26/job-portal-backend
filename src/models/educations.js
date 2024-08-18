const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Applicant = require('./applicants'); 

const Education = sequelize.define('educations', {
    id_education: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    education_level: {
        type: DataTypes.STRING,
        allowNull: false
    },
    institution_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    field_of_study: {
        type: DataTypes.STRING,
        allowNull: false
    },
    graduation_year: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    gpa: {
        type: DataTypes.FLOAT,
        allowNull: true 
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
    tableName: 'educations',
    timestamps: false
});


Education.belongsTo(Applicant, { foreignKey: 'nik' });
Applicant.hasMany(Education, { foreignKey: 'nik' });

module.exports = Education;
