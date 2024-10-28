// models/school/subjectsModel.js

const { DataTypes } = require('sequelize');
const sequelize = require('../../config'); 

const Subject = sequelize.define('Subject', {
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    shortCode: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    grade: {
        type: DataTypes.INTEGER, 
        allowNull: false,
    },
}, {
    tableName: 'subjects' 
});

module.exports = Subject;
