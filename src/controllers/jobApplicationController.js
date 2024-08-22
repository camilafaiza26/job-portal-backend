const Applicant = require('../models/applicants');
const User = require('../models/users');
const JobApplication = require('../models/job-applications'); 
const ApplicantSkill = require('../models/applicants-skills'); 
const Training = require('../models/trainings');
const Experience = require('../models/experiences');

const { logger } = require('../utils/logger');
const Skill = require('../models/skills');
const Position = require('../models/positions');


exports.create = async (req, res) => {
    const {nik}  = req.query;
    const { position_id, relocation_availability, expected_salary } = req.body;

    try {
        const jobApplication = await JobApplication.create({
            nik,
            position_id,
            relocation_availability,
            expected_salary
        });

        res.status(200).json({
            status: 'success',
            message: 'Job application created successfully',
            data: jobApplication
        });
    } catch (error) {
        
        logger.error('Error creating job application:', error);
        res.status(500).json({ status: 'error', message: 'An error occurred while creating job application' });
    }
};



exports.update = async (req, res) => {
    const { id_job_application } = req.params;
    const { position_id, relocation_availability, expected_salary } = req.body;

    try {
        const jobApplication = await JobApplication.findByPk(id_job_application);
        if (!jobApplication) {
            return res.status(404).json({
                status: 'error',
                message: 'Job application not found'
            });
        }

        await jobApplication.update({
            position_id,
            relocation_availability,
            expected_salary
        });

        res.status(200).json({
            status: 'success',
            message: 'Job application updated successfully',
            data: jobApplication
        });
    } catch (error) {
        logger.error('Error updating job application:', error);
        res.status(500).json({ status: 'error', message: 'An error occurred while updating job application' });
    }
};

exports.delete = async (req, res) => {
    const { id_job_application } = req.params;

    try {
        const jobApplication = await JobApplication.findByPk(id_job_application);
        
        if (!jobApplication) {
            return res.status(404).json({
                status: 'error',
                message: 'Job application not found'
            });
        }

        await jobApplication.destroy();

        res.status(200).json({
            status: 'success',
            message: 'Job application deleted successfully'
        });
    } catch (error) {
        logger.error('Error deleting job application:', error);
        res.status(500).json({ 
            status: 'error', 
            message: 'An error occurred while deleting the job application' 
        });
    }
};



exports.getAll = async (req, res) => {
    try {
        const jobApplications = await JobApplication.findAll({
            include: [
                Position,
                {
                    model: Applicant,
                    as: 'applicant',
                    include: [
                        {
                            model: User,
                            as: 'user'
                        },                      
                        'trainings',                    
                        'experiences',
                        'educations',
                        {
                            model: ApplicantSkill,
                           
                            include: [
                                {
                                    model: Skill,
                                    
                                }
                            ]
                        }
                    ]
                }
            ]
        });
        
        if (!jobApplications) {
            return res.status(404).json({
                status: 'error',
                message: 'Job application not found'
            });
        }
        res.status(200).json({
            status: 'success',
            data: jobApplications
        });
    } catch (error) {
        logger.error('Error fetching job application details:', error);
        res.status(500).json({ status: 'error', message: 'An error occurred while fetching job application details' });
    }
};


exports.detail = async (req, res) => {
    const { id_job_application } = req.params;
    try {
        const jobApplication = await JobApplication.findByPk(id_job_application, {
            include: [
                {
                    model: Applicant,
                    as: 'applicant',
                    include: [
                        {
                            model: User,
                            as: 'user'
                        },
                        'trainings',
                        'experiences',
                        'educations',
                        {
                            model: ApplicantSkill,                           
                            include: [
                                {
                                    model: Skill
                                   
                                }
                            ]
                        }
                    ]
                }
            ]
        });
        

        if (!jobApplication) {
            return res.status(404).json({
                status: 'error',
                message: 'Job application not found'
            });
        }
        res.status(200).json({
            status: 'success',
            data: jobApplication
        });
    } catch (error) {
        logger.error('Error fetching job application details:', error);
        res.status(500).json({ status: 'error', message: 'An error occurred while fetching job application details' });
    }
};


exports.skills = async (req, res) => {
    try {
        const skills = await Skill.findAll(); 
        res.status(200).send({
            status: 'success',
            data: skills,
        });
    } catch (error) {
        console.error('Error fetching skills:', error.message);
        res.status(500).send({
            status: 'error',
            message: 'Error fetching skills',
        });
    }
};
exports.positions = async (req, res) => {
    try {
        const positions = await Position.findAll(); 
        res.status(200).send({
            status: 'success',
            data: positions,
        });
    } catch (error) {
        console.error('Error fetching positions:', error.message);
        res.status(500).send({
            status: 'error',
            message: 'Error fetching positions',
        });
    }
};