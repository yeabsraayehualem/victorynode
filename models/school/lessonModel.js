const { DataTypes } = require('sequelize');
const sequelize = require('../../config'); 
const Subject = require('./subjectsModel'); 

const Lesson = sequelize.define('Lesson', {
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    video: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    subjectId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'subjects',
            key: 'id', 
        },
    },
}, {
    tableName: 'lesson' 
});

Lesson.belongsTo(Subject, { foreignKey: 'subjectId' });

module.exports = Lesson;
