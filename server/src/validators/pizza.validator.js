/**
 * Pizza Validators
 * Joi schemas for pizza endpoints
 */
const Joi = require('joi');

const createPizzaSchema = Joi.object({
  pizza: Joi.object({
    name: Joi.string().required().label('Name'),
    image: Joi.string().required().label('Image'),
    description: Joi.string().required().label('Description'),
    category: Joi.string().required().label('Category'),
    prices: Joi.object({
      small: Joi.number().required(),
      medium: Joi.number().required(),
      large: Joi.number().required(),
    }).required().label('Prices'),
  }).required(),
});

const updatePizzaSchema = Joi.object({
  updatedPizza: Joi.object({
    _id: Joi.string().required().label('Pizza ID'),
    name: Joi.string().label('Name'),
    image: Joi.string().label('Image'),
    description: Joi.string().label('Description'),
    category: Joi.string().label('Category'),
    prices: Joi.array().items(Joi.object()).label('Prices'),
    varients: Joi.array().items(Joi.string()).label('Variants'),
  }).required(),
});

const pizzaIdSchema = Joi.object({
  pizzaid: Joi.string().required().label('Pizza ID'),
});

module.exports = {
  createPizzaSchema,
  updatePizzaSchema,
  pizzaIdSchema,
};
