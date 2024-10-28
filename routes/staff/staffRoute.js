const express = require('express');
const schoolController = require('../../controllers/staff/staffSchoolControler');
const { staffAuthMiddleware, verifyToken } = require('../../middleware/authmiddleware');
const accountController = require("../../controllers/account/accountControllers");
const staffSchoolRouter = express.Router();

// school routes.
staffSchoolRouter.post('/schools', verifyToken, staffAuthMiddleware, schoolController.createSchool);
staffSchoolRouter.get('/schools', verifyToken, staffAuthMiddleware, schoolController.getSchools);
staffSchoolRouter.get('/schools/:id', verifyToken, staffAuthMiddleware, schoolController.getSchool);
staffSchoolRouter.put('/schools/:id', verifyToken, staffAuthMiddleware, schoolController.updateSchool);
staffSchoolRouter.delete('/schools/:id', verifyToken, staffAuthMiddleware, schoolController.deactivateSchool);

// staff account route.
staffSchoolRouter.post("/create", verifyToken, staffAuthMiddleware, accountController.createUser);

module.exports = staffSchoolRouter;
