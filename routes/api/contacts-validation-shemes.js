const Joi = require("joi");

const schemaCreateContact = Joi.object({
  name: Joi.string().alphanum().min(3).max(30).required().messages({
    "any.required": "Поле name обязательное",
    "string.empty": "Поле name не может быть пустым",
  }),
  email: Joi.string().required().messages({
    "any.required": "Поле email обязательное",
    "string.empty": "Поле email не может быть пустым",
  }),
  phone: Joi.string()
    .pattern(/[0-9]+/)
    .required()
    .messages({
      "any.required": "Поле number обязательное",
      "string.empty": "Поле number не может быть пустым",
    }),
});

const schemaUpdateContact = Joi.object({
  name: Joi.string().alphanum().min(3).max(30).messages({
    "any.required": "Поле name обязательное",
    "string.empty": "Поле name не может быть пустым",
  }),
  email: Joi.string().messages({
    "any.required": "Поле email обязательное",
    "string.empty": "Поле email не может быть пустым",
  }),
  phone: Joi.string()
    .pattern(/[0-9]+/)
    .messages({
      "any.required": "Поле number обязательное",
      "string.empty": "Поле number не может быть пустым",
    }),
});

module.exports = { schemaCreateContact, schemaUpdateContact };
