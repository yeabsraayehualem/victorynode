const express = require('express');
const schoolController = require('../../controllers/staff/staffSchoolControler');
const subjectController = require('../../controllers/staff/staffSubjectController');

const { staffAuthMiddleware, verifyToken } = require('../../middleware/authmiddleware');
const accountController = require("../../controllers/account/accountControllers");
const staffSchoolRouter = express.Router();

// school related
staffSchoolRouter.post('/schools', verifyToken, staffAuthMiddleware, schoolController.createSchool);
staffSchoolRouter.get('/schools', verifyToken, staffAuthMiddleware, schoolController.getSchools);
staffSchoolRouter.get('/schools/:id', verifyToken, staffAuthMiddleware, schoolController.getSchool);
staffSchoolRouter.put('/schools/:id', verifyToken, staffAuthMiddleware, schoolController.updateSchool);
staffSchoolRouter.delete('/schools/:id', verifyToken, staffAuthMiddleware, schoolController.deactivateSchool);
// staff related
staffSchoolRouter.post("/createStaff", verifyToken, staffAuthMiddleware, accountController.createUser);

// course related
staffSchoolRouter.post("/createSubject", verifyToken, staffAuthMiddleware, subjectController.createSubject);
staffSchoolRouter.put("/editSubject/:id", verifyToken, staffAuthMiddleware, subjectController.editSubject);
staffSchoolRouter.get("/subjects", verifyToken, staffAuthMiddleware, subjectController.getSubjects);
// lessons related
staffSchoolRouter.post("/createLesson", verifyToken, staffAuthMiddleware, subjectController.createLesson);
staffSchoolRouter.put("/editLesson/:id", verifyToken, staffAuthMiddleware, subjectController.updateLesson);
staffSchoolRouter.get("/lessons", verifyToken, staffAuthMiddleware, subjectController.getLessons);
staffSchoolRouter.get("/lessons/:id", verifyToken, staffAuthMiddleware, subjectController.getLessonById);

// manager related
staffSchoolRouter.post('/createManager', verifyToken, staffAuthMiddleware, accountController.createUser);
staffSchoolRouter.put('/updateManaer/:userId', verifyToken, staffAuthMiddleware, accountController.updateUserProfile);
staffSchoolRouter.patch('/toggleMaagerStatus/:userId', verifyToken, staffAuthMiddleware, accountController.toggleUserActiveStatus);

module.exports = staffSchoolRouter;
