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
  favorite: Joi.boolean()
  
});

const contactUpdateFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

module.exports = { contactsSchema, contactUpdateFavoriteSchema };
