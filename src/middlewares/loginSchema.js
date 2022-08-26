const Joi = require('joi');

const salesSchema = Joi.object({
  email: Joi.string().optional().email(),
  password: Joi.number().min(1).required(),
});

module.exports = salesSchema;