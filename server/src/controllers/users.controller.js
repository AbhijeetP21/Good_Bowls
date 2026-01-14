/**
 * Users Controller
 * Handles HTTP request/response for user endpoints
 */
const asyncHandler = require('../utils/asyncHandler');
const usersService = require('../services/users.service');

const usersController = {
  /**
   * POST /api/users
   * Register new user
   */
  register: asyncHandler(async (req, res) => {
    const result = await usersService.register(req.body);

    res.status(201).json(result);
  }),

  /**
   * GET /api/users/:id/verify/:token
   * Verify email
   */
  verifyEmail: asyncHandler(async (req, res) => {
    const { id, token } = req.params;

    const result = await usersService.verifyEmail(id, token);

    res.status(200).json({
      success: true,
      ...result,
    });
  }),

  /**
   * GET /api/users/getallusers
   * Get all users (admin)
   */
  getAllUsers: asyncHandler(async (req, res) => {
    const users = await usersService.getAllUsers();

    res.status(200).json(users);
  }),

  /**
   * POST /api/password-reset
   * Request password reset
   */
  requestPasswordReset: asyncHandler(async (req, res) => {
    const { email } = req.body;

    const result = await usersService.requestPasswordReset(email);

    res.status(200).json(result);
  }),

  /**
   * GET /api/password-reset/:id/:token
   * Verify password reset link
   */
  verifyPasswordResetLink: asyncHandler(async (req, res) => {
    const { id, token } = req.params;

    await usersService.verifyPasswordResetLink(id, token);

    res.status(200).send('Valid Url');
  }),

  /**
   * POST /api/password-reset/:id/:token
   * Reset password
   */
  resetPassword: asyncHandler(async (req, res) => {
    const { id, token } = req.params;
    const { password } = req.body;

    const result = await usersService.resetPassword(id, token, password);

    res.status(200).json(result);
  }),
};

module.exports = usersController;
