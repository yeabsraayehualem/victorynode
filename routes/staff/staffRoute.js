const express = require('express');
const schoolController = require('../../controllers/staff/staffSchoolControler');
const subjectController = require('../../controllers/staff/staffSubjectController');

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
staffSchoolRouter.post("/createStaff", verifyToken, staffAuthMiddleware, accountController.createUser);


staffSchoolRouter.post("/createSubject", verifyToken, staffAuthMiddleware, subjectController.createSubject);
staffSchoolRouter.put("/editSubject/:id", verifyToken, staffAuthMiddleware, subjectController.editSubject);
staffSchoolRouter.get("/subjects", verifyToken, staffAuthMiddleware, subjectController.getSubjects);



module.exports = staffSchoolRouter;
