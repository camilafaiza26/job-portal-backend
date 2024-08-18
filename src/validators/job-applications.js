const Joi = require('joi');
const validatorHandler = require('../middlewares/validatorHandler');

const jobApplicationValidator = (req, res, next) => {
    const schema = Joi.object({
        position_id: Joi.number()
            .integer()
            .positive()
            .required()
            .messages({
                'number.base': 'position_id must be a number',
                'number.integer': 'position_id must be an integer',
                'number.positive': 'position_id must be a positive number',
                'any.required': 'position_id is required',
            }),
        relocation_availability: Joi.boolean()
            .required()
            .messages({
                'boolean.base': 'relocation_availability must be a boolean',
                'any.required': 'relocation_availability is required',
            }),
        expected_salary: Joi.number()
            .positive()
            .precision(2)
            .required()
            .messages({
                'number.base': 'expected_salary must be a number',
                'number.positive': 'expected_salary must be a positive number',
                'number.precision': 'expected_salary must have up to two decimal places',
                'any.required': 'expected_salary is required',
            }),
    });

    validatorHandler(req, res, next, schema);
};

module.exports = {
    jobApplicationValidator,
};
