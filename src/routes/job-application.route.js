const express = require('express');
const router = express.Router();
const jobApplicationController = require('../controllers/jobApplicationController');
const { asyncHandler } = require('../middlewares/asyncHandler');
const {checkNIK, checkUserId, checkNIKValid} = require('../middlewares/applicantHandler');
const accessValidation = require('../middlewares/accessValidation');

const { jobApplicationValidator} = require('../validators/job-applications');

//skills
router.route('/skills')
.get(asyncHandler(accessValidation(['admin', 'applicant'])), asyncHandler(jobApplicationController.skills));

router.route('/positions')
.get(asyncHandler(accessValidation(['admin', 'applicant'])), asyncHandler(jobApplicationController.positions));

//applied job
router.route('/create')
    .post(jobApplicationValidator, asyncHandler(accessValidation(['applicant'])), asyncHandler(checkNIKValid), asyncHandler(jobApplicationController.create));   

router.route('/update/:id_job_application')
.put(jobApplicationValidator, asyncHandler(accessValidation(['admin'])), asyncHandler(jobApplicationController.update));
    
router.route('/delete/:id_job_application')
.delete(asyncHandler(accessValidation(['admin'])), asyncHandler(jobApplicationController.delete));


router.route('/detail/:id_job_application')
    .get(asyncHandler(accessValidation(['applicant', 'admin'])), asyncHandler(jobApplicationController.detail));

    
router.route('/getAll')
.get(asyncHandler(accessValidation(['admin'])), asyncHandler(jobApplicationController.getAll));

module.exports = router;
