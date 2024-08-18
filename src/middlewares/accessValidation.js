const { decode } = require('../utils/token');

const accessValidation = (requiredRoles) => {
    return (req, res, next) => {
        const token = req.cookies.token; 

        if (!token) {
            return res.status(403).send({
                status: 'error',
                code: 'NO_AUTHORIZATION',
                message: 'No authorization.'
            });
        }

        const decoded = decode(token);

        if (!decoded) {
            return res.status(401).send({
                status: 'error',
                code: 'INVALID_TOKEN',
                message: 'Invalid or expired token.'
            });
        }

        if (requiredRoles && !requiredRoles.includes(decoded.role)) {
            return res.status(403).send({
                status: 'error',
                code: 'ACCESS_DENIED',
                message: `Access denied`
            });
        }

        req.user = decoded;
        next();
    };
};

module.exports = accessValidation;
