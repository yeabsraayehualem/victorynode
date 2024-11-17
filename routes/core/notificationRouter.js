const express = require('express');
const notifRouter = express.Router();
const authmiddleware = require('../../middleware/authmiddleware');
const notificationController = require('../../controllers/core/notificationController')


console.log(notificationController.createNotification);


notifRouter.post('/',authmiddleware, notificationController.createNotification);
notifRouter.get('/:userId',authmiddleware, notificationController.getNotifications);
notifRouter.put('/:notificationId/read',authmiddleware, notificationController.markAsRead);
notifRouter.put('/:userId/readAll',authmiddleware, notificationController.markAllAsRead);


module.exports = notifRouter;
