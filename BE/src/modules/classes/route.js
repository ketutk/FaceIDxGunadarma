const express = require("express");
const { middleware, authorize } = require("../../middleware/middleware");
const { ROLE } = require("@prisma/client");
const ClassesController = require("./controller");
const router = express.Router();

const classesController = new ClassesController();

router.get("/my", middleware, authorize([ROLE.mahasiswa]), classesController.getMyClasses);

module.exports = router;
