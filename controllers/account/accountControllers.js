const User = require('../../models/account/accountModel');
const School = require('../../models/school/schoolModel');
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
require('dotenv').config(); // Load environment variables

// Create User
exports.createUser = async (req, res) => {
    try {
        const { first_name, last_name, email, password, role, school } = req.body;

        const existingSchool = await School.findOne({
            where: { id: school }
        });

        if (!existingSchool) {
            return res.status(400).json({ message: 'School not found' });
        }


        const user = await User.create({
            first_name,
            last_name,
            email,
            password: password,
            role,
            school,
        });

        const { password: _, ...userWithoutPassword } = user.dataValues;
        res.status(201).json(userWithoutPassword);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error creating user', error: error.message });
    }
};

// Authenticate User
exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ where: { email } });
        if (!user) return res.status(404).json({ message: 'User not found' });
        console.log('Stored hashed password:', user.password); // Log the stored hash
        console.log('Provided password:', password); // Log the provided password

        const isMatch = await bcrypt.compare(password, user.password);

        console.log('Password match result:', isMatch); // Log the result

        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    } catch (error) {
        res.status(500).json({ message: 'Error logging in', error });
    }
}

// Update User Profile
exports.updateUserProfile = async (req, res) => {
    try {
        const { userId } = req.params; // Assuming you pass userId as a URL parameter
        const { firstName, lastName, school, email, role } = req.body;

        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Update user details
        user.firstName = firstName || user.firstName;
        user.lastName = lastName || user.lastName;
        user.school = school || user.school;
        user.email = email || user.email;
        user.role = role || user.role;

        await user.save();

        const { password: _, ...userWithoutPassword } = user.dataValues;
        res.status(200).json(userWithoutPassword);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error updating user profile', error: error.message });
    }
};

// Activate/Deactivate User
exports.toggleUserActiveStatus = async (req, res) => {
    try {
        const { userId } = req.params;
        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.isActive = !user.isActive; // Toggle the active status
        await user.save();

        res.status(200).json({ message: 'User status updated', isActive: user.isActive });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error updating user status', error: error.message });
    }
};
