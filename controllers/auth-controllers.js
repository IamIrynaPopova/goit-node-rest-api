const User = require("../models/users");
const { HttpError } = require("../helpers");

const register = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      throw HttpError(409, "Email in use");
    }
    const newUser = await User.create(req.body);
    res.status(201).json({ email: newUser.email, password: newUser.password });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  register,
};
