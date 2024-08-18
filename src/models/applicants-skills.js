const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); 
const Skill = require('./skills'); 
const JobApplication = require('./job-applications');
const Applicant = require('./applicants');

const ApplicantSkill = sequelize.define('applicant-skill', {
    id_applicants_skills: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    skill_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        references: {
            model: 'skills', 
            key: 'id_skill',
        },
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
    tableName: 'applicants_skills',
    timestamps: false,
});

ApplicantSkill.belongsTo(Skill, { foreignKey: 'skill_id' });
Skill.hasMany(ApplicantSkill, { foreignKey: 'skill_id' });

ApplicantSkill.belongsTo(Applicant, { foreignKey: 'nik' });
Applicant.hasMany(ApplicantSkill, { foreignKey: 'nik' });

module.exports = ApplicantSkill;
