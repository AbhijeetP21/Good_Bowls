/**
 * Joi Validation Middleware
 * Validates request body, params, or query against Joi schema
 */
const AppError = require('../utils/AppError');

/**
 * Creates a validation middleware for the specified schema
 * @param {Object} schema - Joi validation schema
 * @param {string} property - Request property to validate ('body', 'params', 'query')
 */
const validate = (schema, property = 'body') => {
  return (req, res, next) => {
    const { error, value } = schema.validate(req[property], {
      abortEarly: false,
      stripUnknown: true,
    });

    if (error) {
      const message = error.details.map((detail) => detail.message).join(', ');
      return next(new AppError(message, 400));
    }

    // Replace with validated/sanitized value
    req[property] = value;
    next();
  };
};

module.exports = validate;
