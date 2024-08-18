const Joi = require('joi');
const validatorHandler = require('../middlewares/validatorHandler');

const register = (req, res, next) => {
    const schema = Joi.object().keys({
        email: Joi.string()
            .trim()
            .email()
            .required(),
        password: Joi.string()
            .trim()
            .pattern(new RegExp('^[a-zA-Z0-9!@#$%^&*(),.?":{}|<>]{6,10}$'))
            .required()
            .messages({
                'string.pattern.base': 'password must be between 6 and 10 characters long and can include letters, numbers, and symbols',
            }),
        role: Joi.string()
            .trim()
            .valid('admin', 'applicant') 
            .required()
            .messages({
                'any.only': 'user role not valid'
            }),
      
    });
    validatorHandler(req, res, next, schema);
};


module.exports = {
    register,
    
};