const { DataTypes } = require('sequelize');
const sequelize = require('../../config');
const User = require('../account/accountModel'); // Ensure model dependencies are properly imported

const School = sequelize.define(
    'School',
    {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        address: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        city: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        state: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        zip: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        phone: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isNumeric: true,
                len: [10, 15],
            },
        },
        logo: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        is_active: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true,
        },
    },
    {
        tableName: 'School', // Explicitly set table name
        timestamps: true, // Enable timestamps
        underscored: true, // Use snake_case for column names
    }
);

// If you want to define associations, you can do it here
// School.hasMany(User, { foreignKey: 'school' });
// User.belongsTo(School, { foreignKey: 'school' });

module.exports = School;
