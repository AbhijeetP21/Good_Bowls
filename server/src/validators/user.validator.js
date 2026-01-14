/**
 * User Validators
 * Joi schemas for user endpoints
 */
const Joi = require('joi');
const passwordComplexity = require('joi-password-complexity');

const registerSchema = Joi.object({
  firstName: Joi.string().required().label('First Name'),
  lastName: Joi.string().required().label('Last Name'),
  email: Joi.string().email().required().label('Email'),
  address: Joi.string().required().label('Address'),
  password: passwordComplexity().required().label('Password'),
});

const emailSchema = Joi.object({
  email: Joi.string().email().required().label('Email'),
});

const passwordResetSchema = Joi.object({
  password: passwordComplexity().required().label('Password'),
});

const verifyEmailParamsSchema = Joi.object({
  id: Joi.string().required().label('User ID'),
  token: Joi.string().required().label('Token'),
});

module.exports = {
  registerSchema,
  emailSchema,
  passwordResetSchema,
  verifyEmailParamsSchema,
};
