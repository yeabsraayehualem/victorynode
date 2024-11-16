const Subject = require("../../models/school/subjectsModel")
const Lesson = require("../../models/school/lessonModel")

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


// Create a new lesson
exports.createLesson = async (req, res) => {
    try {
        const { title, description, video, subjectId } = req.body;
        const lesson = await Lesson.create({ title, description, video, subjectId });
        res.status(201).json(lesson);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Something went wrong' });
    }
};

// Get all lessons
exports.getLessons = async (req, res) => {
    try {
        const lessons = await Lesson.findAll({
            include: [{
                model: Subject,
                attributes: ['title', 'shortCode'], // Include subject details
            }],
        });
        res.status(200).json(lessons);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Something went wrong' });
    }
};

// Get a single lesson by ID
exports.getLessonById = async (req, res) => {
    const { id } = req.params;
    try {
        const lesson = await Lesson.findOne({
            where: { id },
            include: [{
                model: Subject,
                attributes: ['title', 'shortCode'],
            }],
        });
        if (!lesson) {
            return res.status(404).json({ message: 'Lesson not found' });
        }
        res.status(200).json(lesson);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Something went wrong' });
    }
};

// Update a lesson by ID
exports.updateLesson = async (req, res) => {
    const { id } = req.params;
    const { title, description, video, subjectId } = req.body;
    try {
        const lesson = await Lesson.findOne({ where: { id } });
        if (!lesson) {
            return res.status(404).json({ message: 'Lesson not found' });
        }

        // Update fields
        lesson.title = title || lesson.title;
        lesson.description = description || lesson.description;
        lesson.video = video || lesson.video;
        lesson.subjectId = subjectId || lesson.subjectId;

        await lesson.save();
        res.status(200).json(lesson);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Something went wrong' });
    }
};

// Delete a lesson by ID
exports.deleteLesson = async (req, res) => {
    const { id } = req.params;
    try {
        const lesson = await Lesson.findOne({ where: { id } });
        if (!lesson) {
            return res.status(404).json({ message: 'Lesson not found' });
        }

        await lesson.destroy();
        res.status(200).json({ message: 'Lesson deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Something went wrong' });
    }
};
