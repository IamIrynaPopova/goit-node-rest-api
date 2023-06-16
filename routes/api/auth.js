const express = require("express");
const router = express.Router();
const schemas = require("../../schemas/users");
const validate = require("../../decorators");
const userControllers = require("../../controllers/auth-controllers");
const { authenticate } = require("../../middlewares");

router.post(
  "/register",
  validate.validateBodyRegisterOnPost(schemas.usersRegisterSchema),
  userControllers.register
);

router.post(
  "/login",
  validate.validateBodyRegisterOnPost(schemas.usersLoginSchema),
  userControllers.login
);

router.get("/current", authenticate, userControllers.getCurrentUser);

router.post("/logout", authenticate, userControllers.logout);

module.exports = router;
