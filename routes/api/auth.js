const express = require("express");
const router = express.Router();
const schemas = require("../../schemas/users");
const validate = require("../../decorators");
const userControllers = require("../../controllers/auth-controllers");

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

module.exports = router;
