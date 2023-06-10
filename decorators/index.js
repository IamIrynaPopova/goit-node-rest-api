const { validateBodyOnPut } = require("./validateBody");
const { validateBodyOnPost } = require("./validateBody");
const { validateBodyOnPatch } = require("./validateBody");
const { validateBodyRegisterOnPost } = require("./validateBody");


module.exports = {
  validateBodyOnPut,
  validateBodyOnPost,
  validateBodyOnPatch,
  validateBodyRegisterOnPost,
};
