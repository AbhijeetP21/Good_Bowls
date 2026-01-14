/**
 * Auth Validators
 * Joi schemas for authentication endpoints
 */
const Joi = require('joi');

const loginSchema = Joi.object({
  email: Joi.string().email().required().label('Email'),
  password: Joi.string().required().label('Password'),
});

const verifyTokenSchema = Joi.object({
  token: Joi.string().required().label('Token'),
});

module.exports = {
  loginSchema,
  verifyTokenSchema,
};
