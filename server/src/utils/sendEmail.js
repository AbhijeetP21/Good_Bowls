/**
 * Email utility
 * Sends emails via Resend
 */
const { Resend } = require('resend');
const env = require('../config/env');

// Initialize Resend with API key
const resend = new Resend(env.RESEND_API_KEY);

const sendEmail = async (to, subject, text) => {
  try {
    const { data, error } = await resend.emails.send({
      from: env.EMAIL_FROM || 'Good Bowls <onboarding@resend.dev>',
      to: [to],
      subject,
      text,
    });

    if (error) {
      console.error('Email error:', error);
      throw new Error(error.message);
    }

    console.log('Email sent successfully:', data.id);
    return true;
  } catch (error) {
    console.error('Email not sent:', error.message);
    throw error;
  }
};

module.exports = sendEmail;
