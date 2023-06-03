const { isEmpty } = require("lodash");

const { HttpError } = require("../helpers");

const validateBodyOnPut = (schema) => {
  const func = (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (isEmpty(req.body)) {
      next(HttpError(400, "missing fields"));
    }

    if (error) {
      next(HttpError(400, `missing required ${error.message} field`));
    } else next();
  };
  return func;
};
const validateBodyOnPost = (schema) => {
  const func = (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      next(HttpError(400, `missing required ${error.message} field`));
    } else next();
  };
  return func;
};

module.exports = { validateBodyOnPut, validateBodyOnPost };
