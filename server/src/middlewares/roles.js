/**
 * Role-based Authorization Middleware
 * Restricts access based on user roles
 */
const AppError = require('../utils/AppError');

/**
 * Creates a middleware that restricts access to specified roles
 * @param  {...string} allowedRoles - Roles that are allowed access
 */
const restrictTo = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user) {
      return next(new AppError('Not authenticated', 401));
    }

    if (!allowedRoles.includes(req.user.role)) {
      return next(
        new AppError('You do not have permission to perform this action', 403)
      );
    }

    next();
  };
};

module.exports = { restrictTo };
