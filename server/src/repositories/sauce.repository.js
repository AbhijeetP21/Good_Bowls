/**
 * Sauce Repository
 * Data access layer for sauce options (MYO Pizza)
 */
const Sauce = require('../../models/sauces');

const sauceRepository = {
  async findAll() {
    return Sauce.find({});
  },

  async findById(id) {
    return Sauce.findById(id);
  },
};

module.exports = sauceRepository;
