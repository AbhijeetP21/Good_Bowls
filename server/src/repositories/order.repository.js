/**
 * Order Repository
 * Data access layer for Order model
 */
const Order = require('../../models/orderModel');

const orderRepository = {
  async findAll() {
    return Order.find().sort({ _id: -1 });
  },

  async findById(id) {
    return Order.findById(id);
  },

  async findByUserId(userId) {
    return Order.find({ userid: userId }).sort({ _id: -1 });
  },

  async findByOrderId(orderId) {
    return Order.findOne({ orderId });
  },

  async findByPaymentId(paymentId) {
    return Order.findOne({ paymentId });
  },

  async create(orderData) {
    const order = new Order(orderData);
    return order.save();
  },

  async updateDeliveryStatus(id, isDelivered) {
    const order = await Order.findById(id);
    if (order) {
      order.isDelivered = isDelivered;
      return order.save();
    }
    return null;
  },

  async updatePaymentStatus(orderId, paymentData) {
    return Order.findOneAndUpdate(
      { orderId },
      { $set: paymentData },
      { new: true }
    );
  },
};

module.exports = orderRepository;
