/**
 * Environment configuration
 * Loads and validates environment variables
 */
require('dotenv').config();

const env = {
  // Server
  NODE_ENV: process.env.NODE_ENV || 'development',
  PORT: process.env.PORT || 8080,

  // Database
  DB: process.env.DB,

  // JWT
  JWT_PRIVATE_KEY: process.env.JWTPRIVATEKEY,
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || '7d',

  // Password
  SALT_ROUNDS: Number(process.env.SALT) || 10,

  // Email (Resend)
  RESEND_API_KEY: process.env.RESEND_API_KEY,
  EMAIL_FROM: process.env.EMAIL_FROM || 'Good Bowls <onboarding@resend.dev>',

  // Razorpay
  RAZORPAY_KEY_ID: process.env.KEY_ID,
  RAZORPAY_KEY_SECRET: process.env.KEY_SECRET,
  RAZORPAY_WEBHOOK_SECRET: process.env.RAZORPAY_WEBHOOK_SECRET,

  // Stripe
  STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,

  // Frontend URL
  BASE_URL: process.env.BASE_URL,
};

// Validate required env vars in production
const requiredEnvVars = ['DB', 'JWT_PRIVATE_KEY'];

if (env.NODE_ENV === 'production') {
  requiredEnvVars.forEach((key) => {
    if (!env[key]) {
      throw new Error(`Missing required environment variable: ${key}`);
    }
  });
}

module.exports = env;
