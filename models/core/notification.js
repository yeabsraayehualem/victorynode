// models/Notification.js
const { DataTypes } = require('sequelize');
const sequelize = require('../../config'); 
const User = require('../account/accountModel'); 

const Notification = sequelize.define('Notification', {
  message: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  senderId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  isRead: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  dateSent: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  tableName: 'notifications',
});

Notification.belongsToMany(User, {
  through: 'NotificationReceivers',
  foreignKey: 'notificationId',
  otherKey: 'userId',
});

Notification.belongsTo(User, { foreignKey: 'senderId' });

module.exports = Notification;
