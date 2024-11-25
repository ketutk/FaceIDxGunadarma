const express = require("express");
const { middleware, authorize } = require("../../middleware/middleware");
const { ROLE } = require("@prisma/client");
const ClassesController = require("./controller");
const router = express.Router();

const classesController = new ClassesController();

router.post("/", middleware, authorize([ROLE.dosen]), classesController.addClasses);
router.post("/join/:id", middleware, authorize([ROLE.mahasiswa]), classesController.joinClasses);
router.get("/all", middleware, classesController.getAllClasses);

// Mahasiswa
router.get("/my", middleware, authorize([ROLE.mahasiswa]), classesController.getAllMyClasses);
router.get("/lecturer", middleware, authorize([ROLE.dosen]), classesController.getLecturerClassesByLecturerId);
router.get("/my/new", middleware, authorize([ROLE.mahasiswa]), classesController.getNewestUserClasses);
router.get("/lecturer/new", middleware, authorize([ROLE.dosen]), classesController.getNewestLecturerClasses);
router.get("/:id", middleware, authorize([ROLE.mahasiswa]), classesController.getMahasiswaDetailClassesById);

module.exports = router;
