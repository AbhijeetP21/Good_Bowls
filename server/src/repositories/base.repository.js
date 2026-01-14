/**
 * Base Repository
 * Data access layer for pizza bases (MYO Pizza)
 */
const Bases = require('../../models/bases');

const baseRepository = {
  async findAll() {
    return Bases.find({});
  },

  async findById(id) {
    return Bases.findById(id);
  },

  async create(baseData) {
    const base = new Bases(baseData);
    return base.save();
  },

  async updateById(id, updateData) {
    return Bases.findByIdAndUpdate(id, updateData, { new: true });
  },

  async deleteById(id) {
    return Bases.findByIdAndDelete(id);
  },
};

module.exports = baseRepository;
