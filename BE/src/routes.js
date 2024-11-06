const express = require("express");
const router = express.Router();
const authRoute = require("./modules/auth/route");

/* GET home page. */
router.use("/auth", authRoute);

module.exports = router;
