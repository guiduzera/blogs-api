const Joi = require('joi');

const salesSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(1).required(),
});

module.exports = salesSchema;