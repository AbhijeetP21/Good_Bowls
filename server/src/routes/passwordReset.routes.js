/**
 * Password Reset Routes
 * Endpoints for password reset flow
 */
const router = require('express').Router();
const usersController = require('../controllers/users.controller');
const validate = require('../middlewares/validate');
const {
  emailSchema,
  passwordResetSchema,
  verifyEmailParamsSchema,
} = require('../validators/user.validator');

// POST /api/password-reset - Request password reset
router.post('/', validate(emailSchema), usersController.requestPasswordReset);

// GET /api/password-reset/:id/:token - Verify password reset link
router.get(
  '/:id/:token',
  validate(verifyEmailParamsSchema, 'params'),
  usersController.verifyPasswordResetLink
);

// POST /api/password-reset/:id/:token - Reset password
router.post(
  '/:id/:token',
  validate(verifyEmailParamsSchema, 'params'),
  validate(passwordResetSchema),
  usersController.resetPassword
);

module.exports = router;
