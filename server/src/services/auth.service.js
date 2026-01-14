/**
 * Auth Service
 * Business logic for authentication
 */
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const env = require('../config/env');
const AppError = require('../utils/AppError');
const sendEmail = require('../utils/sendEmail');
const userRepository = require('../repositories/user.repository');
const tokenRepository = require('../repositories/token.repository');

const authService = {
  /**
   * Login user with email and password
   */
  async login(email, password) {
    const user = await userRepository.findByEmail(email);

    if (!user) {
      throw new AppError('Invalid Email or Password', 401);
    }

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      throw new AppError('Invalid Email or Password', 401);
    }

    // Check if email is verified
    if (!user.verified) {
      let token = await tokenRepository.findByUserId(user._id);

      if (!token) {
        token = await tokenRepository.create({
          userId: user._id,
          token: crypto.randomBytes(32).toString('hex'),
        });

        const url = `${env.BASE_URL}users/${user.id}/verify/${token.token}`;
        await sendEmail(user.email, 'Verify Email', url);
      }

      throw new AppError('An Email sent to your account please verify', 400);
    }

    const authToken = user.generateAuthToken();

    return {
      token: authToken,
      user,
    };
  },

  /**
   * Verify JWT token and return user data
   */
  async verifyToken(token) {
    const decoded = jwt.verify(token, env.JWT_PRIVATE_KEY);
    const user = await userRepository.findById(decoded._id);

    if (!user) {
      throw new AppError('User not found', 404);
    }

    return {
      decoded,
      user,
    };
  },
};

module.exports = authService;
