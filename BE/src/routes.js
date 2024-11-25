const express = require("express");
const router = express.Router();
const authRoute = require("./modules/auth/route");
const classRoute = require("./modules/classes/route");
const majorRoute = require("./modules/major/route");

/* GET home page. */
router.use("/auth", authRoute);
router.use("/classes", classRoute);
router.use("/major", majorRoute);

module.exports = router;
