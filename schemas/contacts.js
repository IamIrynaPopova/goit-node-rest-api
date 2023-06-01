const Joi = require("joi");

const contactsSchema = Joi.object({
  name: Joi.string().min(3).max(20).required(),

  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    })
    .lowercase()
    .required(),

  phone: Joi.string().required(),
});

module.exports = contactsSchema;
