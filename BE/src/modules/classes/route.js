const express = require("express");
const { middleware, authorize } = require("../../middleware/middleware");
const { ROLE } = require("@prisma/client");
const ClassesController = require("./controller");
const router = express.Router();

const classesController = new ClassesController();

router.post("/join/:id", middleware, authorize([ROLE.mahasiswa]), classesController.joinClasses);
router.get("/all", middleware, classesController.getAllClasses);

// Mahasiswa
router.get("/my", middleware, authorize([ROLE.mahasiswa]), classesController.getAllMyClasses);
router.get("/my/new", middleware, authorize([ROLE.mahasiswa]), classesController.getNewestUserClasses);
router.get("/:id", middleware, authorize([ROLE.mahasiswa]), classesController.getMahasiswaDetailClassesById);

module.exports = router;
