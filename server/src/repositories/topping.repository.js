/**
 * Topping Repository
 * Data access layer for pizza toppings (MYO Pizza)
 */
const Toppings = require('../../models/toppings');

const toppingRepository = {
  async findAll() {
    return Toppings.find({});
  },

  async findById(id) {
    return Toppings.findById(id);
  },

  async create(toppingData) {
    const topping = new Toppings(toppingData);
    return topping.save();
  },

  async updateById(id, updateData) {
    return Toppings.findByIdAndUpdate(id, updateData, { new: true });
  },

  async deleteById(id) {
    return Toppings.findByIdAndDelete(id);
  },
};

module.exports = toppingRepository;
