const School = require('../../models/school/schoolModel');

// Create a new school
exports.createSchool = async (req, res) => {
    try {
        const { name, address, city, state, zip, phone, logo } = req.body;
        const school = await School.create({ name, address, city, state, zip, phone, logo });
        res.status(201).json(school);
    } catch (error) {
        res.status(500).json({ error: 'Error creating school', details: error.message });
    }
};

// Get all active schools
exports.getSchools = async (req, res) => {
    try {
        const schools = await School.findAll({ where: { isActive: true } });
        res.status(200).json(schools);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching schools', details: error.message });
    }
};

// Get a single school by ID
exports.getSchool = async (req, res) => {
    try {
        const school = await School.findByPk(req.params.id);
        if (!school) {
            return res.status(404).json({ error: 'School not found' });
        }
        res.status(200).json(school);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching school', details: error.message });
    }
};

// Update school details
exports.updateSchool = async (req, res) => {
    try {
        const { name, address, city, state, zip, phone, logo } = req.body;
        const school = await School.findByPk(req.params.id);
        
        if (!school) {
            return res.status(404).json({ error: 'School not found' });
        }
        
        await school.update({ name, address, city, state, zip, phone, logo });
        res.status(200).json(school);
    } catch (error) {
        res.status(500).json({ error: 'Error updating school', details: error.message });
    }
};

// Deactivate a school
exports.deactivateSchool = async (req, res) => {
    try {
        const school = await School.findByPk(req.params.id);
        if (!school) {
            return res.status(404).json({ error: 'School not found' });
        }
        await school.update({ isActive: false });
        res.status(200).json({ message: 'School deactivated' });
    } catch (error) {
        res.status(500).json({ error: 'Error deactivating school', details: error.message });
    }
};
