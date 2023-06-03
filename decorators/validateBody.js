const { HttpError } = require("../helpers");

const validateBodyOnPut = (schema) => {
  const func = (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      next(HttpError(400, "missing fields"));
    } else next();
  };
  return func;
};
const validateBodyOnPost = (schema) => {
  const func = (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      next(HttpError(400, "missing required name field"));
    } else next();
  };
  return func;
};

module.exports = { validateBodyOnPut, validateBodyOnPost };
