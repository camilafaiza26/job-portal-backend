const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Applicant = require('./applicants');
const Position = require('./positions');


const JobApplication = sequelize.define('job-applications', {
    id_job_application: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    position_id: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
            model: 'positions', 
            key: 'nik'          
        }
    },
    relocation_availability: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
    expected_salary: {
        type: DataTypes.DECIMAL(15, 2),
        allowNull: false,
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
    tableName: 'job_applications',
    timestamps: false, 
});



JobApplication.belongsTo(Position, { foreignKey: 'position_id' });
Position.hasMany(JobApplication, { foreignKey: 'position_id' });

JobApplication.belongsTo(Applicant, { foreignKey: 'nik', as: 'applicant' });
Applicant.hasMany(JobApplication, { foreignKey: 'nik', as: 'jobApplications' });


module.exports = JobApplication;
