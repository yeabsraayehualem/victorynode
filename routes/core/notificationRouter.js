const express = require('express');
const notifRouter = express.Router();
const userController = require('../../controllers/core/notificationController');
const authmiddleware = require('../../middleware/authmiddleware');

notifRouter.post('/',authmiddleware, notificationController.createNotification);
notifRouter.get('/:userId',authmiddleware, notificationController.ge);
notifRouter.put('/:notificationId/read',authmiddleware, notificationController.markAsRead);
notifRouter.put('/:userId/readAll',authmiddleware, notificationController.markAllAsRead);
module.exports = notifRouter;
