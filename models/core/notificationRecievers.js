const { DataTypes } = require('sequelize');
const sequelize = require('../config'); 

const NotificationReceivers = sequelize.define('NotificationReceivers', {
  notificationId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  tableName: 'notification_receivers',
});

module.exports = NotificationReceivers;
