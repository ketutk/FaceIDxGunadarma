const express = require("express");
const { middleware, authorize } = require("../../middleware/middleware");
const AuthController = require("./controller");
const { ROLE } = require("@prisma/client");
const router = express.Router();

const authController = new AuthController();

/* GET users listing. */
router.post("/login", authController.login); // add router login
router.post("/register", authController.register);
router.post("/register/dosen", middleware, authorize(ROLE.sekdos), authController.registerDosen);
router.put("/change/password", middleware, authController.changePassword);
router.get("/profile", middleware, authController.profile);

module.exports = router;
