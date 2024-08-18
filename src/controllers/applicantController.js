const Applicant = require('../models/applicants');
const Education = require('../models/educations');
const Experience = require('../models/experiences');
const Training = require('../models/trainings');
const database = require('../config/database')

const { logger } = require('../utils/logger'); 
const ApplicantSkill = require('../models/applicants-skills');
const Skill = require('../models/skills');

exports.getAll = async (req, res) => {
    try {
        const applicants = await Applicant.findAll({           
            include: [Education, Experience, Training]
        });
        res.status(200).send({
            status: 'success',
            data: applicants
        });
    } catch (err) {
        logger.error('Error retrieving applicants:', err.message);
        res.status(500).send({
            status: 'error',
            message: err.message
        });
    }
};

exports.create = async (req, res) => {
    const createData = req.body;
    try {
        const transaction = await database.transaction();
        try {          
            const newApplicant = await Applicant.create(createData, { transaction });       
            if (createData.educations) {
                const educations = createData.educations.map(edu => ({
                    ...edu,
                    nik: newApplicant.nik 
                }));
                await Education.bulkCreate(educations, { transaction });
            }
            if (createData.experiences) {
                const experiences = createData.experiences.map(exp => ({
                    ...exp,
                    nik: newApplicant.nik 
                }));
                await Experience.bulkCreate(experiences, { transaction });
            }
            if (createData.trainings) {
                const trainings = createData.trainings.map(train => ({
                    ...train,
                    nik: newApplicant.nik 
                }));
                await Training.bulkCreate(trainings, { transaction });
            }
            if (createData.applicants_skills) {
                const applicantSkills = createData.applicants_skills.map(skill => ({
                    ...skill,
                    nik: newApplicant.nik  
                }));
                await ApplicantSkill.bulkCreate(applicantSkills, { transaction });
            }
            await transaction.commit();
            res.status(201).send({
                status: 'success',
                data: newApplicant
            });
        } catch (err) {
            await transaction.rollback();
            throw err;
        }
    } catch (err) {
        logger.error('Error creating applicant and related records:', err.message);
        res.status(500).send({
            status: 'error',
            message: err.message
        });
    }
};

exports.update = async (req, res) => {

    logger.info("BODY" + req)
    const { nik } = req.query; 
    const updatedData = req.body; 

   
    try {
    

        const [updated] = await Applicant.update(updatedData, {
            where: { nik },
            
        });

      
        if (updatedData.educations) {
            for (const education of updatedData.educations) {
                if (education.id_education) {
                   
                    await Education.update(education, {
                        where: { id_education: education.id_education }
                    });
                } else {
                  
                    await Education.create({ ...education, nik });
                }
            }
        }

      
        if (updatedData.experiences) {
            for (const experience of updatedData.experiences) {
                if (experience.id_experience) {
          
                    await Experience.update(experience, {
                        where: { id_experience: experience.id_experience }
                    });
                } else {                  
                    await Experience.create({ ...experience, nik });
                }
            }
        }

      
        if (updatedData.trainings) {
            for (const training of updatedData.trainings) {
                if (training.id_training) {                   
                    await Training.update(training, {
                        where: { id_training: training.id_training }
                    });
                } else {                   
                    await Training.create({ ...training, nik });
                }
            }
        }

          
        if (updatedData.applicants_skills) {   
            for (const applicants_skill of updatedData.applicants_skills) {
                if (applicants_skill.id_applicants_skills) {
                   
                    await ApplicantSkill.update(applicants_skill, {
                        where: { id_applicants_skills: applicants_skill.id_applicants_skills }
                    });
                } else {
                   
                    await ApplicantSkill.create({ ...applicants_skill, nik });
                }
            }
        }
        
       
        const updatedApplicant = await Applicant.findOne({
            where: { nik },
            include: [Education, Experience, Training,   {
                model: ApplicantSkill,
                include: [
                    Skill  
                ]
            }]
        });

        res.status(200).send({
            status: 'success',
            data: updatedApplicant
        });
    } catch (err) {
        logger.error('Error updating applicant:', err.message);
        res.status(500).send({
            status: 'error',
            message: err.message
        });
    }
};



exports.delete = async (req, res) => {
    const { nik } = req.query;
    try {
        const deleted = await Applicant.destroy({
            where: { nik }
        }); 

        res.status(200).send({
            status: 'success',
            message: 'Applicant deleted successfully'
        });
    } catch (err) {
        logger.error('Error deleting applicant:', err.message);
        res.status(500).send({
            status: 'error',
            message: err.message
        });
    }
};

exports.detail = async (req, res) => {
    const { nik } = req.query;
    try {
        const applicant = await Applicant.findOne({
            where: { nik },
            include: [
                Education,
                Experience,
                Training,
                {
                    model: ApplicantSkill,
                    include: [
                        Skill  
                    ]
                }
            ]
        });
        
        res.status(200).send({
            status: 'success',
            data: applicant
        });
    } catch (err) {
        logger.error('Error retrieving applicant details:', err.message);
        res.status(500).send({
            status: 'error',
            message: err.message
        });
    }
};