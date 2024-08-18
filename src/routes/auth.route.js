const express = require('express');
const router = express.Router();
const { asyncHandler } = require('../middlewares/asyncHandler');
const {checkEmail} = require('../middlewares/applicantHandler');
const { register: registerValidator } = require('../validators/auth');
const authController = require('../controllers/authController');
const accessValidation = require('../middlewares/accessValidation');


router.route('/register')
    .post(registerValidator, asyncHandler(checkEmail), asyncHandler(authController.register));

router.route('/login')
    .post(asyncHandler(authController.login));

    
router.route('/logout')
.post(asyncHandler(accessValidation(['admin', 'applicant'])), asyncHandler(authController.logout));

module.exports = router;