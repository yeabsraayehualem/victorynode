const express = require('express');
const accountRouter = express.Router();
const userController = require('../../controllers/account/accountControllers');

// Create user
accountRouter.post('/create', userController.createUser);

// Authenticate user
accountRouter.post('/authenticate', userController.login);

// Update user profile
accountRouter.put('/update/:userId', userController.updateUserProfile);

// Activate/Deactivate user
accountRouter.patch('/toggle-status/:userId', userController.toggleUserActiveStatus);
accountRouter.get("/allUsers", userController.getAllUsers);
module.exports = accountRouter;
