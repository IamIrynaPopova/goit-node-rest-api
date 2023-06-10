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

module.exports = router;
