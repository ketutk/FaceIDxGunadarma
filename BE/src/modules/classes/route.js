const express = require("express");
const { middleware, authorize } = require("../../middleware/middleware");
const { ROLE } = require("@prisma/client");
const ClassesController = require("./controller");
const router = express.Router();

const classesController = new ClassesController();

router.post("/", middleware, authorize([ROLE.dosen]), classesController.addClasses);
router.post("/presence", middleware, authorize([ROLE.dosen]), classesController.addPresence);
router.post("/join/:id", middleware, authorize([ROLE.mahasiswa]), classesController.joinClasses);
router.post("/meet/:id", middleware, authorize([ROLE.dosen]), classesController.addClassesMeet);
router.delete("/:id", middleware, authorize([ROLE.dosen]), classesController.deleteClassesById);
router.put("/:id", middleware, authorize([ROLE.dosen]), classesController.editClassesById);
router.get("/all", middleware, classesController.getAllClasses);

router.get("/my", middleware, authorize([ROLE.mahasiswa]), classesController.getAllMyClasses);
router.get("/lecturer", middleware, authorize([ROLE.dosen]), classesController.getLecturerClassesByLecturerId);

router.get("/my/new", middleware, authorize([ROLE.mahasiswa]), classesController.getNewestUserClasses);
router.get("/lecturer/new", middleware, authorize([ROLE.dosen]), classesController.getNewestLecturerClasses);
router.get("/lecturer/:id", middleware, authorize([ROLE.dosen]), classesController.getDosenDetailClassesById);
router.get("/lecturer/:classes_id/:meet_id", middleware, authorize([ROLE.dosen]), classesController.getLecturerClassesMeet);

router.get("/:id", middleware, authorize([ROLE.mahasiswa]), classesController.getMahasiswaDetailClassesById);

module.exports = router;
