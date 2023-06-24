const User = require("../models/users");
const { HttpError, sendEmail } = require("../helpers");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const { SECRET_KEY, BASE_URL } = process.env;
const gravatar = require("gravatar");
const fs = require("fs/promises");
const path = require("path");
const Jimp = require("jimp");
const { v4: uuidv4 } = require("uuid");

const register = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      throw HttpError(409, "Email in use");
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const verificationToken = uuidv4();
    const avatar = await gravatar.url(email);
    const newUser = await User.create({
      ...req.body,
      password: hashPassword,
      verificationToken,
      avatarURL: avatar,
    });
    const verifyEmail = {
      to: email,
      subject: "Verify email",
      html: `<a target="_blank" href="${BASE_URL}/users/verify/:${verificationToken}">Verify email</a>`,
    };
    await sendEmail(verifyEmail);
    res.status(201).json({
      user: {
        email: newUser.email,
        subscription: "starter",
        avatarURL: avatar,
      },
    });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      throw HttpError(401, "Email or password is wrong");
    }
     if (!user.verify) {
       throw HttpError(401);
     }

    const passwordCompare = await bcrypt.compare(password, user.password);
    if (!passwordCompare) {
      throw HttpError(401, "Email or password is wrong");
    }
    const { _id: id } = user;
    const payload = { id };
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "24h" });
    await User.findByIdAndUpdate(id, { token });
    res.status(200).json({
      token,
      user: {
        email,
        subscription: "starter",
      },
    });
  } catch (error) {
    next(error);
  }
};

const logout = async (req, res) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: "" });
  res.status(204).json({ message: "No Content" });
};

const getCurrentUser = async (req, res) => {
  const { email, subscription } = req.user;
  res.json({ email, subscription });
};

const updateAvatar = async (req, res, next) => {
  try {
    const { _id } = req.user;
    const { filename, path: oldPath } = req.file;
    const publicDir = path.resolve("public/avatars");
    const newPath = path.join(publicDir, filename);
    await fs.rename(oldPath, newPath);
    await Jimp.read(newPath).then((image) => {
      return image.resize(250, 250).write(newPath);
    });
    const result = await User.findOneAndUpdate(
      _id,
      { avatarURL: "/avatars/" + filename },
      { new: true }
    );
    if (result) {
      res.status(200).json({ avatarURL: "/avatars/" + filename });
    } else {
      next();
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  register,
  login,
  getCurrentUser,
  logout,
  updateAvatar,
};
