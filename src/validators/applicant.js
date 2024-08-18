const Joi = require('joi');
const validatorHandler = require('../middlewares/validatorHandler');

const educationSchema = Joi.object({
    education_level: Joi.string()
    .valid('SD', 'SMP', 'SMA', 'D1', 'D2', 'D3', 'S1', 'S2', 'S3', 'Tidak Sekolah')
    .required()
    .messages({
        'any.only': 'Education level not valid'
    }),
    institution_name: Joi.string().required(),
    field_of_study: Joi.string().required(),
    graduation_year: Joi.string().pattern(new RegExp('^[0-9]{4}$')).required(),
    gpa: Joi.string()
    .pattern(new RegExp('^[0-9]{1,2}(\\.[0-9]{1,2})?$'))
    .required()
    .messages({
        'string.pattern.base': 'GPA must be a number with up to 2 decimal places, e.g., 3.75'
    }),
    id_education: Joi.number().optional(),

});

const experienceSchema = Joi.object({
    company_name: Joi.string().required(),
    last_position: Joi.string().required(),
    last_income: Joi.number()
    .precision(2) 
    .max(9999999999999.99)  
    .required()
    .messages({
        'number.base': 'Last income must be a number',
        'number.precision': 'Last income must be a decimal with up to 2 digits after the decimal point',
        'number.max': 'Last income must be a decimal with up to 13 digits before the decimal point and 2 digits after the decimal point',
        'any.required': 'Last income is required'
    }),
    year: Joi.string().pattern(new RegExp('^[0-9]{4}$')).required(),
    id_experience: Joi.number().optional(),
});

const trainingSchema = Joi.object({
    name: Joi.string().required(),
    certificate: Joi.boolean().optional(), 
    year: Joi.number().required(), 
    id_training: Joi.number().optional(),
});

const applicantSkillSchema = Joi.object({
    skill_id: Joi.number().required(),
    id_applicants_skills: Joi.number().optional(),
  
});

const applicantSchema = Joi.object().keys({
    nik: Joi.string()
        .length(16)
        .pattern(new RegExp('^[0-9]+$'))
        .required()
        .messages({
            'string.length': 'NIK must be exactly 16 digits long',
            'string.pattern.base': 'NIK must contain only digits'
        }),
    name: Joi.string()
        .trim()
        .required(),
    birth_place: Joi.string()
        .trim()
        .required(),
    birth_date: Joi.date()
        .iso()
        .required()
        .messages({
            'date.base': 'Birth date must be a valid date'
        }),
    gender: Joi.string()
        .valid('P', 'L')
        .required()
        .messages({
            'any.only': 'Gender must be either P (Pria) or L (Wanita)'
        }),
    religion: Joi.string()
        .valid('Islam', 'Kristen Protestant', 'Kristen Katolik', 'Konghucu', 'Hindu', 'Budha', 'Lainnya')
        .required(),
    blood_type: Joi.string()
        .valid('A', 'AB', 'O', 'B')
        .required(),
    status: Joi.string()
        .valid('Belum Menikah', 'Menikah', 'Duda/Janda')
        .required(),
    ktp_address: Joi.string()
        .trim()
        .required(),
    current_address: Joi.string()
        .trim()
        .required(),
    phone_number: Joi.string()
        .trim()
        .pattern(new RegExp('^[0-9]+$'))
        .required()
        .messages({
            'string.pattern.base': 'Phone number must contain only digits'
        }),
    emergency_contact_name: Joi.string()
        .trim()
        .optional(),
    emergency_phone_number: Joi.string()
        .trim()
        .pattern(new RegExp('^[0-9]+$'))
        .optional()
        .messages({
            'string.pattern.base': 'Emergency phone number must contain only digits'
        }),
    user_id: Joi.number()
        .required(),
    educations: Joi.array().items(educationSchema).optional(),
    experiences: Joi.array().items(experienceSchema).optional(),
    trainings: Joi.array().items(trainingSchema).optional(),
    applicants_skills: Joi.array().items(applicantSkillSchema).optional()
});

const applicant = (req, res, next) => {
    validatorHandler(req, res, next, applicantSchema);
};

module.exports = {
    applicant
};
