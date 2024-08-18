const Applicant = require('../models/applicants');
const User = require('../models/users');

const checkNIK = async (req, res, next) => {
    const { nik } = req.body;
    try {
        const applicant = await Applicant.findOne({ where: { nik } });
        if (applicant) {
            return res.status(400).send({
                status: 'error',
                code: 'APPLICANT_EXISTS',
                message: 'NIK already exists',
                details: null
            });
        }
        next();
    } catch (err) {
        res.status(500).send({
            status: 'error',
            code: 'INTERNAL_ERROR',
            message: 'An error occurred while checking NIK',
            details: err.message
        });
    }
};

const checkNIKValid = async (req, res, next) => {
    const { nik } = req.query;
    try {
        const applicant = await Applicant.findOne({ where: { nik } });
        if (!applicant) {
            return res.status(400).send({
                status: 'error',
                code: 'NOT_FOUND',
                message: 'NIK not found',
                details: null
            });
        }
        next();
    } catch (err) {
        res.status(500).send({
            status: 'error',
            code: 'INTERNAL_ERROR',
            message: 'An error occurred while checking NIK',
            details: err.message
        });
    }
};

const checkUserId = async (req, res, next) => {
    const { user_id } = req.body;
    try {
        const user = await User.findByPk(user_id);
        if (!user) {
            return res.status(400).send({
                status: 'error',
                code: 'USER_NOT_EXIST',
                message: 'User does not exist',
                details: null
            });
        }
        next();
    } catch (err) {
        res.status(500).send({
            status: 'error',
            code: 'INTERNAL_ERROR',
            message: 'An error occurred while checking user ID',
            details: err.message
        });
    }
};


const checkEmail = async (req, res, next) => {
    const { email } = req.body;
    try {
        const existingUser = await User.findOne({ where: { email: email.trim() } });

        if (existingUser) {
            return res.status(400).send({
                status: 'error',
                code: 'USER_EXISTS',
                message: 'Email already exists',
                details: null
            });
        }

        next();
    } catch (err) {
        res.status(500).send({
            status: 'error',
            message: err.message
        });
    }
};


module.exports = {
    checkNIK,
    checkUserId, 
    checkNIKValid,
    checkEmail
};
