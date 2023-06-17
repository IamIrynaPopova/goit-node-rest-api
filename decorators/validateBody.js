const { isEmpty } = require("lodash");

const { HttpError } = require("../helpers");

const validateBodyOnPut = (schema) => {
  const func = (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (isEmpty(req.body)) {
      next(HttpError(400, "missing fields"));
    }

    if (error) {
      next(
        HttpError(400, `missing required ${error.message.split('"')[1]} field`)
      );
    } else next();
  };
  return func;
};

const validateBodyOnPost = (schema) => {
  const func = (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      next(
        HttpError(400, `missing required ${error.message.split('"')[1]} field`)
      );
    } else next();
  };
  return func;
};

const validateBodyOnPatch = (schema) => {
  const func = (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      next(HttpError(400, "missing field favorite"));
    } else next();
  };
  return func;
};

const validateBodyRegisterOnPost = (schema) => {
  const func = (req, res, next) => {
    const { error } = schema.validate(req.body);
    const errorMessage = error.details[0].message.split('"').join("");
    if (error) {
      next(HttpError(400, errorMessage));
    } else next();
  };
  return func;
};

module.exports = {
  validateBodyOnPut,
  validateBodyOnPost,
  validateBodyOnPatch,
  validateBodyRegisterOnPost,
};
