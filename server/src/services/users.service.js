/**
 * Users Service
 * Business logic for user management
 */
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const env = require('../config/env');
const AppError = require('../utils/AppError');
const sendEmail = require('../utils/sendEmail');
const userRepository = require('../repositories/user.repository');
const tokenRepository = require('../repositories/token.repository');

const usersService = {
  /**
   * Register a new user
   */
  async register(userData) {
    // Check if user exists
    const existingUser = await userRepository.findByEmail(userData.email);

    if (existingUser) {
      throw new AppError('User with given email already exists!', 409);
    }

    // Hash password
    const salt = await bcrypt.genSalt(env.SALT_ROUNDS);
    const hashedPassword = await bcrypt.hash(userData.password, salt);

    // In development, auto-verify users (skip email)
    const isDevelopment = env.NODE_ENV !== 'production';
    const skipEmailVerification = isDevelopment || !env.RESEND_API_KEY;

    // Create user
    const user = await userRepository.create({
      ...userData,
      password: hashedPassword,
      verified: skipEmailVerification, // Auto-verify in dev mode
    });

    // Skip email in development or if email not configured
    if (skipEmailVerification) {
      console.log('📧 Email verification skipped (development mode)');
      return {
        message: 'Account created successfully! You can now login.',
        skipVerification: true
      };
    }

    // Create verification token
    const token = await tokenRepository.create({
      userId: user._id,
      token: crypto.randomBytes(32).toString('hex'),
    });

    // Send verification email
    const url = `${env.BASE_URL}users/${user.id}/verify/${token.token}`;
    await sendEmail(
      user.email,
      'Verify Email',
      `Verify your account by clicking on this link --> ${url} . Thank you !`
    );

    return { message: 'An Email sent to your account please verify! Check in spam folder too' };
  },

  /**
   * Verify user email
   */
  async verifyEmail(userId, tokenString) {
    const user = await userRepository.findById(userId);

    if (!user) {
      throw new AppError('Invalid link', 400);
    }

    const token = await tokenRepository.findByUserIdAndToken(user._id, tokenString);

    if (!token) {
      throw new AppError('Invalid link', 400);
    }

    await userRepository.setVerified(user._id);
    await tokenRepository.deleteById(token._id);

    return { message: 'Email verified successfully' };
  },

  /**
   * Get all users (admin)
   */
  async getAllUsers() {
    return userRepository.findAll();
  },

  /**
   * Request password reset
   */
  async requestPasswordReset(email) {
    const user = await userRepository.findByEmail(email);

    if (!user) {
      throw new AppError('User with given email does not exist!', 409);
    }

    let token = await tokenRepository.findByUserId(user._id);

    if (!token) {
      token = await tokenRepository.create({
        userId: user._id,
        token: crypto.randomBytes(32).toString('hex'),
      });
    }

    const url = `${env.BASE_URL}password-reset/${user._id}/${token.token}/`;
    await sendEmail(user.email, 'Password Reset', url);

    return { message: 'Password reset link sent to your email account' };
  },

  /**
   * Verify password reset link
   */
  async verifyPasswordResetLink(userId, tokenString) {
    const user = await userRepository.findById(userId);

    if (!user) {
      throw new AppError('Invalid link', 400);
    }

    const token = await tokenRepository.findByUserIdAndToken(user._id, tokenString);

    if (!token) {
      throw new AppError('Invalid link', 400);
    }

    return { valid: true };
  },

  /**
   * Reset password
   */
  async resetPassword(userId, tokenString, newPassword) {
    const user = await userRepository.findById(userId);

    if (!user) {
      throw new AppError('Invalid link', 400);
    }

    const token = await tokenRepository.findByUserIdAndToken(user._id, tokenString);

    if (!token) {
      throw new AppError('Invalid link', 400);
    }

    // Set verified if not already
    if (!user.verified) {
      user.verified = true;
    }

    // Hash new password
    const salt = await bcrypt.genSalt(env.SALT_ROUNDS);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    user.password = hashedPassword;
    await user.save();
    await tokenRepository.deleteById(token._id);

    return { message: 'Password reset successfully' };
  },
};

module.exports = usersService;
