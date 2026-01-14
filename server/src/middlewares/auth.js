/**
 * Authentication Middleware
 * Verifies JWT token and attaches user to request
 */
const jwt = require('jsonwebtoken');
const env = require('../config/env');
const AppError = require('../utils/AppError');
const asyncHandler = require('../utils/asyncHandler');
const userRepository = require('../repositories/user.repository');

const auth = asyncHandler(async (req, res, next) => {
  let token;

  // Check for token in Authorization header
  if (req.headers.authorization?.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  // Check for token in query params (for legacy support)
  if (!token && req.query.token) {
    token = req.query.token;
  }

  if (!token) {
    return next(new AppError('Not authorized, no token provided', 401));
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, env.JWT_PRIVATE_KEY);

    // Attach user to request
    const user = await userRepository.findById(decoded._id);

    if (!user) {
      return next(new AppError('User not found', 401));
    }

    req.user = user;
    next();
  } catch (error) {
    return next(new AppError('Not authorized, token invalid', 401));
  }
});

module.exports = auth;
