/**
 * Order Validators
 * Joi schemas for order/payment endpoints
 */
const Joi = require('joi');

const createOrderSchema = Joi.object({
  subtotal: Joi.number().positive().required().label('Subtotal'),
});

const verifyPaymentSchema = Joi.object({
  paymentId: Joi.string().required().label('Payment ID'),
  orderId: Joi.string().required().label('Order ID'),
  signature: Joi.string().required().label('Signature'),
  firstname: Joi.string().required().label('First Name'),
  lastname: Joi.string().required().label('Last Name'),
  email: Joi.string().email().required().label('Email'),
  id: Joi.string().required().label('User ID'),
  address: Joi.string().required().label('Address'),
  cartItems: Joi.array().required().label('Cart Items'),
  subtotal: Joi.number().positive().required().label('Subtotal'),
});

const userOrdersSchema = Joi.object({
  userId: Joi.string().required().label('User ID'),
});

const deliverOrderSchema = Joi.object({
  orderid: Joi.string().required().label('Order ID'),
});

module.exports = {
  createOrderSchema,
  verifyPaymentSchema,
  userOrdersSchema,
  deliverOrderSchema,
};
