const User = require("../models/users");
const { HttpError } = require("../helpers");

const register = async (req, res, next) => {
  try {
    const newUser = await User.create(req.body);
    res.status(201).json({ email: newUser.email, password: newUser.password });
  } catch {}
};

module.exports = {
  register,
};
