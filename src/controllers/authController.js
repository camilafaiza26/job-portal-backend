const User = require('../models/users');
const { generate: generateToken } = require('../utils/token');
const bcrypt = require('bcrypt');

exports.register = async (req, res) => {
    const { email, password, role } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        
        const user = await User.create({
            email: email.trim(),
            password: hashedPassword,
            role: role,
            created_at: new Date()
        });
        
       
        res.status(200).send({
            status: 'success',
            code: 'USER_REGISTERED',
            message: 'Registration Successfully',
            data: {               
                email: user.email,
                role: user.role,
                created_at: user.created_at
            }
        });
    } catch (err) {
        res.status(500).send({
            status: 'error',
            message: err.message
        });
    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
       
        const user = await User.findOne({ where: { email: email.trim() } });

        if (!user) {
            return res.status(404).send({
                status: 'error',
                code: 'USER_NOT_FOUND',
                message: 'User not found. Please register first'
            });
        }

       
        const isMatch = await bcrypt.compare(password.trim(), user.password);

        if (isMatch) {
          
            const token = generateToken(user);
            res.cookie('token', token, { 
                httpOnly: true,                
                maxAge: 24 * 60 * 60 * 1000, 
                sameSite: 'None', 
                secure: true   
            });

            res.status(200).send({
                status: 'success',
                data: {       
                    token: token,           
                    email: user.email,
                    role: user.role,
                    created_at: user.created_at
                }
            });
        } else {
            res.status(400).send({
                status: 'error',
                code: 'CREDENTIAL_NOT_VALID',
                message: 'User Credential not valid, please try again'
            });
        }
    } catch (err) {
        res.status(500).send({
            status: 'error',
            message: err.message
        });
    }
}

exports.logout = async (req, res) => {
    try {
        
        res.cookie('token', '', { 
            httpOnly: true,
            expires: new Date(0), 
        });

        res.status(200).send({
            status: 'success',
            message: 'Logged out successfully'
        });
    } catch (err) {
        res.status(500).send({
            status: 'error',
            message: err.message
        });
    }
};
