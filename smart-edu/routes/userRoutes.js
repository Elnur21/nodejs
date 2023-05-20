const express = require("express");
const authController = require("../controllers/authController");
const authMiddleware = require("../middlewares/authMiddleware")
const redirectMiddleware = require("../middlewares/redirectMiddleware")
const router = express.Router();


router.route("/signup").post(authController.createUser);
router.route("/login").post(redirectMiddleware,authController.loginUser);
router.route("/logout").get(authController.logoutUser);
router.route("/dashboard").get(authMiddleware,authController.getDashboardPage);

module.exports = router;
