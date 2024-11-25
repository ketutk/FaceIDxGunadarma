const express = require("express");
const { middleware, authorize } = require("../../middleware/middleware");
const { ROLE } = require("@prisma/client");
const MajorController = require("./controller");
const router = express.Router();

const majorController = new MajorController();

router.get("/all", middleware, majorController.getAllMajor);

module.exports = router;
