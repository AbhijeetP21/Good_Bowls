/**
 * Bowl Repository
 * Data access layer for Bowl model
 */
const Bowl = require('../../models/bowlModel');

const bowlRepository = {
  async findAll() {
    return Bowl.find({});
  },

  async findById(id) {
    return Bowl.findById(id);
  },

  async create(bowlData) {
    const bowl = new Bowl(bowlData);
    return bowl.save();
  },

  async updateById(id, updateData) {
    return Bowl.findByIdAndUpdate(id, updateData, { new: true });
  },

  async deleteById(id) {
    return Bowl.findByIdAndDelete(id);
  },

  async findByCategory(category) {
    return Bowl.find({ category });
  },
};

module.exports = bowlRepository;
