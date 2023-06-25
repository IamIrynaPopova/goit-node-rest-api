const express = require("express");
const router = express.Router();
const schemas = require("../../schemas/users");
const validate = require("../../decorators");
const userControllers = require("../../controllers/auth-controllers");
const { authenticate, upload } = require("../../middlewares");

router.post(
  "/register",validate.validateBodyRegisterOnPost(schemas.usersRegisterSchema),
  userControllers.register
);

router.get(
  "/verify/:verificationToken",
    userControllers.verify
);

router.post(
  "/verify",
  validate.validateBodyRegisterOnPost(schemas.usersEmailSchema),
  userControllers.resendVerify
);

router.post(
  "/login",
  validate.validateBodyRegisterOnPost(schemas.usersLoginSchema),
  userControllers.login
);

router.get("/current", authenticate, userControllers.getCurrentUser);

router.post("/logout", authenticate, userControllers.logout);

router.patch("/avatars", upload.single('avatar'),authenticate, userControllers.updateAvatar);

module.exports = router;
