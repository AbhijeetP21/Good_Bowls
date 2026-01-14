/**
 * Admin Validators
 * Joi schemas for admin-specific endpoints (bases, toppings)
 */
const Joi = require('joi');

const createBaseSchema = Joi.object({
  base: Joi.object({
    name: Joi.string().required().label('Name'),
    stock: Joi.number().integer().min(0).required().label('Stock'),
    prices: Joi.object({
      small: Joi.number().required(),
      medium: Joi.number().required(),
      large: Joi.number().required(),
    }).required().label('Prices'),
  }).required(),
});

const updateBaseSchema = Joi.object({
  updatedBase: Joi.object({
    _id: Joi.string().required().label('Base ID'),
    name: Joi.string().label('Name'),
    stock: Joi.number().integer().min(0).label('Stock'),
    prices: Joi.array().items(Joi.object()).label('Prices'),
    varients: Joi.array().items(Joi.string()).label('Variants'),
  }).required(),
});

const baseIdSchema = Joi.object({
  baseid: Joi.string().required().label('Base ID'),
});

const createToppingSchema = Joi.object({
  topping: Joi.object({
    name: Joi.string().required().label('Name'),
    stock: Joi.number().integer().min(0).required().label('Stock'),
  }).required(),
});

const updateToppingSchema = Joi.object({
  updatedTopping: Joi.object({
    _id: Joi.string().required().label('Topping ID'),
    name: Joi.string().label('Name'),
    stock: Joi.number().integer().min(0).label('Stock'),
  }).required(),
});

const toppingIdSchema = Joi.object({
  toppingid: Joi.string().required().label('Topping ID'),
});

module.exports = {
  createBaseSchema,
  updateBaseSchema,
  baseIdSchema,
  createToppingSchema,
  updateToppingSchema,
  toppingIdSchema,
};
