/**
 * User Repository
 * Data access layer for User model
 */
const { User } = require('../../models/user');

const userRepository = {
  async findById(id) {
    return User.findById(id);
  },

  async findByEmail(email) {
    return User.findOne({ email });
  },

  async findAll() {
    return User.find({});
  },

  async create(userData) {
    const user = new User(userData);
    return user.save();
  },

  async updateById(id, updateData) {
    return User.findByIdAndUpdate(id, updateData, { new: true });
  },

  async setVerified(id) {
    return User.findOneAndUpdate({ _id: id }, { verified: true });
  },

  async updatePassword(id, hashedPassword) {
    return User.findByIdAndUpdate(id, { password: hashedPassword });
  },
};

module.exports = userRepository;
