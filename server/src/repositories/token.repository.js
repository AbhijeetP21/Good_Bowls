/**
 * Token Repository
 * Data access layer for Token model (email verification, password reset)
 */
const Token = require('../../models/token');

const tokenRepository = {
  async findByUserId(userId) {
    return Token.findOne({ userId });
  },

  async findByUserIdAndToken(userId, token) {
    return Token.findOne({ userId, token });
  },

  async create(tokenData) {
    const token = new Token(tokenData);
    return token.save();
  },

  async deleteById(id) {
    return Token.findByIdAndDelete(id);
  },

  async deleteByUserId(userId) {
    return Token.deleteMany({ userId });
  },
};

module.exports = tokenRepository;
