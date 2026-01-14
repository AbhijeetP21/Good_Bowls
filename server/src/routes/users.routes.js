/**
 * Users Routes
 * Endpoints for user registration and management
 */
const router = require('express').Router();
const usersController = require('../controllers/users.controller');
const validate = require('../middlewares/validate');
const {
  registerSchema,
  emailSchema,
  passwordResetSchema,
  verifyEmailParamsSchema,
} = require('../validators/user.validator');

// POST /api/users - Register new user
router.post('/', validate(registerSchema), usersController.register);

// GET /api/users/:id/verify/:token - Verify email
router.get(
  '/:id/verify/:token',
  validate(verifyEmailParamsSchema, 'params'),
  usersController.verifyEmail
);

// GET /api/users/getallusers - Get all users (admin)
router.get('/getallusers', usersController.getAllUsers);

// Password reset routes (mounted at /api/password-reset)
// These are exported separately and mounted in the main routes index

module.exports = router;
