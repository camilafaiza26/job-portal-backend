const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Applicant = require('./applicants'); 

const Training = sequelize.define('trainings', {
    id_training: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    certificate: {
        type: DataTypes.BOOLEAN,
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
    tableName: 'trainings',
    timestamps: false
});


Training.belongsTo(Applicant, { foreignKey: 'nik' });
Applicant.hasMany(Training, { foreignKey: 'nik' });

module.exports = Training;
