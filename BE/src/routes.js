const express = require("express");
const router = express.Router();
const authRoute = require("./modules/auth/route");
const classRoute = require("./modules/classes/route");

/* GET home page. */
router.use("/auth", authRoute);
router.use("/classes", classRoute);

module.exports = router;
