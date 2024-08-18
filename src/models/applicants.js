const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./users');

const Applicant = sequelize.define('applicants', {
    nik: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
        unique: true,
        validate: {
            len: [1, 16] 
        }
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    birth_place: {
        type: DataTypes.STRING,
        allowNull: true
    },
    birth_date: {
        type: DataTypes.DATE,
        allowNull: true
    },
    gender: {
        type: DataTypes.ENUM('P','L'),
        allowNull: true
    },
    religion: {
        type: DataTypes.ENUM('Islam', 'Kristen Protestant', 'Hindu', 'Budha', 'Konghucu', 'Kristen Katolik','Lainnya'),
        allowNull: true
    },
    blood_type: {
        type: DataTypes.STRING,
        allowNull: true
    },
    status: {
        type: DataTypes.ENUM('Belum Menikah', 'Menikah', 'Duda/Janda'),
        allowNull: true
    },
    ktp_address: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    current_address: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    phone_number: {
        type: DataTypes.STRING,
        allowNull: true
    },
    emergency_contact_name: {
        type: DataTypes.STRING,
        allowNull: true
    },
    emergency_phone_number: {
        type: DataTypes.STRING,
        allowNull: true
    },
    user_id: {
        type: DataTypes.BIGINT,
        allowNull: true,
        references: {
            model: 'users',
            key: 'id_user'
        }
    }
}, {
    tableName: 'applicants', 
    timestamps: false
});

Applicant.belongsTo(User, { foreignKey: 'user_id', as: 'user' });
User.hasOne(Applicant, { foreignKey: 'user_id', as: 'applicant' });

module.exports = Applicant;
