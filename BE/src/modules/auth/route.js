const express = require("express");
const { middleware, isAdmin, isSuperAdmin } = require("../../middleware/middleware");
const AuthController = require("./controller");
const router = express.Router();

const authController = new AuthController();

/* GET users listing. */
router.post("/login", authController.login); // add router login
router.post("/register", authController.register);
router.get("/profile", middleware, authController.profile);

module.exports = router;
