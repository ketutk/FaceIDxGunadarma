const express = require("express");
const router = express.Router();
const authRoute = require("./modules/auth/route");
const classRoute = require("./modules/classes/route");
const majorRoute = require("./modules/major/route");
const studentRoute = require("./modules/students/route");

/* GET home page. */
router.use("/auth", authRoute);
router.use("/classes", classRoute);
router.use("/major", majorRoute);
router.use("/student", studentRoute);

module.exports = router;
