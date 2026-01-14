/**
 * Admin Service
 * Business logic for admin-specific operations (MYO Bowl components)
 */
const AppError = require('../utils/AppError');
const baseRepository = require('../repositories/base.repository');
const toppingRepository = require('../repositories/topping.repository');
const cheeseRepository = require('../repositories/cheese.repository');
const sauceRepository = require('../repositories/sauce.repository');

const adminService = {
  // ============ BASES ============

  async getAllBases() {
    return baseRepository.findAll();
  },

  async getBaseById(baseId) {
    const base = await baseRepository.findById(baseId);
    if (!base) {
      throw new AppError('Base not found', 404);
    }
    return base;
  },

  async addBase(baseData) {
    const newBase = {
      name: baseData.name,
      stock: baseData.stock,
      varients: ['small', 'medium', 'large'],
      prices: [baseData.prices],
    };

    await baseRepository.create(newBase);
    return { message: 'New Base Added Successfully' };
  },

  async updateBase(updatedBaseData) {
    const base = await baseRepository.updateById(
      updatedBaseData._id,
      updatedBaseData
    );

    if (!base) {
      throw new AppError('Base not found', 404);
    }

    return base;
  },

  async deleteBase(baseId) {
    const base = await baseRepository.deleteById(baseId);
    if (!base) {
      throw new AppError('Base not found', 404);
    }
    return base;
  },

  // ============ TOPPINGS ============

  async getAllToppings() {
    return toppingRepository.findAll();
  },

  async getToppingById(toppingId) {
    const topping = await toppingRepository.findById(toppingId);
    if (!topping) {
      throw new AppError('Topping not found', 404);
    }
    return topping;
  },

  async addTopping(toppingData) {
    const newTopping = {
      name: toppingData.name,
      stock: toppingData.stock,
    };

    await toppingRepository.create(newTopping);
    return { message: 'New Topping Added Successfully' };
  },

  async updateTopping(updatedToppingData) {
    const topping = await toppingRepository.updateById(
      updatedToppingData._id,
      updatedToppingData
    );

    if (!topping) {
      throw new AppError('Topping not found', 404);
    }

    return topping;
  },

  async deleteTopping(toppingId) {
    const topping = await toppingRepository.deleteById(toppingId);
    if (!topping) {
      throw new AppError('Topping not found', 404);
    }
    return topping;
  },

  // ============ CHEESE & SAUCES ============

  async getAllCheese() {
    return cheeseRepository.findAll();
  },

  async getAllSauces() {
    return sauceRepository.findAll();
  },
};

module.exports = adminService;
