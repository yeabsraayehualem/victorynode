const  User = require('../../models/account/accountModel');
const Notification = require('../../models/core/notification');
exports.createNotification = async (req, res) => {
  try {
    const { senderId, receiverIds, message } = req.body;

    const notification = await Notification.create({
      senderId,
      message,
      dateSent: new Date(),
    });

    await notification.addUsers(receiverIds);

    res.status(201).json(notification);
  } catch (error) {
    console.error('Error creating notification:', error);
    res.status(500).json({ message: 'Something went wrong' });
  }
};

exports.getNotifications = async (req, res) => {
  const { userId } = req.params;
  try {
    const notifications = await Notification.findAll({
      include: [
        {
          model: User,
          as: 'sender', 
        },
        {
          model: User,
          as: 'users', 
          where: { id: userId }, 
        },
      ],
      order: [['dateSent', 'DESC']], 
    });

    res.status(200).json(notifications);
  } catch (error) {
    console.error('Error fetching notifications:', error);
    res.status(500).json({ message: 'Something went wrong' });
  }
};

exports.markAsRead = async (req, res) => {
  const { notificationId } = req.params;
  try {
    const notification = await Notification.findByPk(notificationId);
    if (!notification) {
      return res.status(404).json({ message: 'Notification not found' });
    }

    notification.isRead = true;
    await notification.save();

    res.status(200).json(notification);
  } catch (error) {
    console.error('Error marking notification as read:', error);
    res.status(500).json({ message: 'Something went wrong' });
  }
};

exports.markAllAsRead = async (req, res) => {
  const { userId } = req.params;
  try {
    const notifications = await Notification.update(
      { isRead: true },
      { where: { '$users.id$': userId }, returning: true }
    );

    res.status(200).json({ message: 'All notifications marked as read' });
  } catch (error) {
    console.error('Error marking all notifications as read:', error);
    res.status(500).json({ message: 'Something went wrong' });
  }
};
