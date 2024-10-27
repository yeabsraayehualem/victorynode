const express = require('express');
const schoolController = require('../../controllers/staff/staffSchoolControler');
const {staffAuthMiddleware} = require('../../middleware/authmiddleware');

const staffSchoolRouter = express.Router();


// school routes.
staffSchoolRouter.post('/schools', staffAuthMiddleware, schoolController.createSchool);
staffSchoolRouter.get('/schools', staffAuthMiddleware, schoolController.getSchools);
staffSchoolRouter.get('/schools/:id', staffAuthMiddleware, schoolController.getSchool);
staffSchoolRouter.put('/schools/:id', staffAuthMiddleware, schoolController.updateSchool);
staffSchoolRouter.delete('/schools/:id', staffAuthMiddleware, schoolController.deactivateSchool);




module.exports = staffSchoolRouter;
