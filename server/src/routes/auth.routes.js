/**
 * Auth Routes
 * Endpoints for user authentication
 */
const router = require('express').Router();
const authController = require('../controllers/auth.controller');
const validate = require('../middlewares/validate');
const { loginSchema, verifyTokenSchema } = require('../validators/auth.validator');

// POST /api/auth - Login
router.post('/', validate(loginSchema), authController.login);

// GET /api/auth/jwt/verify - Verify JWT token
router.get('/jwt/verify', validate(verifyTokenSchema, 'query'), authController.verifyToken);

module.exports = router;
