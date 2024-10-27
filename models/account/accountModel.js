const { DataTypes } = require('sequelize');
const sequelize = require('../../config');
const bcrypt = require('bcrypt'); // or 'bcryptjs' if you prefer that library

const User = sequelize.define(
    'User',
    {
        first_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        last_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true,
            },
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        role: {
            type: DataTypes.ENUM('student', 'teacher', 'staff', 'school_manager', 'superuser'),
            allowNull: false,
            defaultValue: 'student',
        },
        school: {
            type: DataTypes.INTEGER,
            references: {
                model: 'School',
                key: 'id',
            },
            allowNull: true,
        },
        is_active: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },
    },
    {
        tableName: 'User',
        timestamps: true,
        underscored: true,
    }
);// Hash password before creating a user
User.beforeCreate(async (user) => {
    try {
        user.password = await bcrypt.hash(user.password, 10);
        console.log(user.password)
        if (['superuser', 'school_manager', 'staff'].includes(user.role)) {
            user.is_active = true; // Automatically set is_active
        }
    } catch (error) {
        throw new Error('Error hashing password: ' + error.message);
    }
});

module.exports = User;
