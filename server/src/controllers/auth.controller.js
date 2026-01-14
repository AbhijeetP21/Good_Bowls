/**
 * Auth Controller
 * Handles HTTP request/response for authentication endpoints
 */
const asyncHandler = require('../utils/asyncHandler');
const authService = require('../services/auth.service');

const authController = {
  /**
   * POST /api/auth
   * Login user
   */
  login: asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const result = await authService.login(email, password);

    res.status(200).json({
      data: result.token,
      user: result.user,
      message: 'logged in successfully',
    });
  }),

  /**
   * GET /api/auth/jwt/verify
   * Verify JWT token
   */
  verifyToken: asyncHandler(async (req, res) => {
    const { token } = req.query;

    const result = await authService.verifyToken(token);

    res.status(200).json({
      success: true,
      data: result.decoded,
      userData: result.user,
      message: 'Valid User',
    });
  }),
};

module.exports = authController;
