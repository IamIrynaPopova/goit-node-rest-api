const express = require("express");
const router = express.Router();
const schemas = require("../../schemas/users");
const validate = require("../../decorators");
const userControllers = require("../../controllers/auth-controllers");
const { authenticate } = require("../../middlewares");

router.post(
  "/users/register",
  validate.validateBodyRegisterOnPost(schemas.usersRegisterSchema),
  userControllers.register
);

router.post(
  "/users/login",
  validate.validateBodyRegisterOnPost(schemas.usersLoginSchema),
  userControllers.login
);

router.get("/users/current", authenticate, userControllers.getCurrentUser);

router.post("/users/logout", authenticate, userControllers.logout);

module.exports = router;
