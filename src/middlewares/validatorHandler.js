const validatorHandler = (req, res, next, schema) => {
    const { error } = schema.validate(req.body, { abortEarly: false });

    if (error) {
        const details = error.details.map(err => ({
            field: err.path[0],
            error: err.message.replace(/[^a-zA-Z0-9 ]/g, '')
        }));
       res.status(400).json({        
            status: 'error',
            message: "Validation error", 
            code: "VALIDATION_ERROR",
            details: details
        });
        return;
    }
    next();
};

module.exports = validatorHandler;