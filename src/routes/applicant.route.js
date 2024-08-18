const express = require('express');
const router = express.Router();
const applicantController = require('../controllers/applicantController');
const { applicant: applicantValidator} = require('../validators/applicant');
const { asyncHandler } = require('../middlewares/asyncHandler');
const {checkNIK, checkUserId, checkNIKValid} = require('../middlewares/applicantHandler');
const accessValidation = require('../middlewares/accessValidation');

//get all -- just admin
router.route('/getAll')
    .get(asyncHandler(accessValidation(['admin'])), asyncHandler(applicantController.getAll));

//add
router.route('/create')
.post(applicantValidator, asyncHandler(accessValidation(['applicant'])), asyncHandler(checkNIK), asyncHandler(checkUserId), asyncHandler(applicantController.create));   

//update
router.route('/update')
    .put(applicantValidator, asyncHandler(accessValidation(['admin'])),  asyncHandler(checkNIKValid), asyncHandler(applicantController.update));


//delete
router.route('/destroy')
    .delete(asyncHandler(accessValidation(['admin'])), asyncHandler(checkNIKValid), asyncHandler(applicantController.delete));
//detail
router.route('/detail')
    .get(asyncHandler(accessValidation(['admin', 'applicant'])), asyncHandler(checkNIKValid), asyncHandler(applicantController.detail));


module.exports = router;
