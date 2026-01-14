/**
 * Cheese Repository
 * Data access layer for cheese options (MYO Pizza)
 */
const Cheese = require('../../models/cheese');

const cheeseRepository = {
  async findAll() {
    return Cheese.find({});
  },

  async findById(id) {
    return Cheese.findById(id);
  },
};

module.exports = cheeseRepository;
