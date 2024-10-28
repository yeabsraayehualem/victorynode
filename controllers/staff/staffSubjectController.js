const Subject = require("../../models/school/subjectsModel")

exports.createSubject = async (req,res)=>{
    try {
        const { title, shortCode,grade } = req.body;
        const subject = await Subject.create({ title,shortCode,grade });
        res.status(201).json(subject);
    } catch (error) {
        res.status(500).json({ error: 'Error creating subject', details: error.message });
    }
}

exports.getSubjects = async (req,res)=>{
    try {
        const subjects = await Subject.findAll();
        res.status(200).json(subjects);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching subjects', details: error.message });
    }
}

exports.editSubject = async (req,res) => {
    try {
        const { title, shortCode, grade } = req.body;
        const subject = await Subject.findByPk(req.params.id);

        if (!subject) {
            return res.status(404).json({ error: 'Subject not found' });
        }

        await subject.update({ title, shortCode, grade });
        res.status(200).json(subject);
    } catch (error) {
        res.status(500).json({ error: 'Error updating subject', details: error.message });
    }
}

