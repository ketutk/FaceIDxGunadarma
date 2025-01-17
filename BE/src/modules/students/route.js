const express = require("express");
const { middleware, authorize } = require("../../middleware/middleware");
const { ROLE } = require("@prisma/client");
const StudentController = require("./controller");
const router = express.Router();

const studentController = new StudentController();

router.get("/", middleware, authorize(ROLE.sekdos), studentController.getAllStudent);
router.get("/classes/:id", middleware, authorize(ROLE.sekdos), studentController.getStudentClassesByStudentId);
router.get("/presences/:id/:classes_id", middleware, authorize(ROLE.sekdos), studentController.getStudentClassPresences);
router.get("/:id", middleware, authorize(ROLE.sekdos), studentController.getStudentDetailByStudentId);

module.exports = router;
