const Joi = require("joi");

const contactsSchema = Joi.object({
  id: Joi.string().required(),
  name: Joi.string().alphanum().min(3).max(30).required(),

  email: Joi.string().email().required(),

  phone: Joi.string().required(),
});

module.exports = contactsSchema;
