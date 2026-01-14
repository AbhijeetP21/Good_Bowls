/**
 * 404 Not Found Middleware
 * Catches requests to undefined routes
 */
const AppError = require('../utils/AppError');

const notFound = (req, res, next) => {
  next(new AppError(`Route ${req.originalUrl} not found`, 404));
};

module.exports = notFound;
