/**
 * Orders Service
 * Business logic for order management
 */
const AppError = require('../utils/AppError');
const orderRepository = require('../repositories/order.repository');

const ordersService = {
  /**
   * Get all orders (admin)
   */
  async getAllOrders() {
    return orderRepository.findAll();
  },

  /**
   * Get orders for a specific user
   */
  async getUserOrders(userId) {
    return orderRepository.findByUserId(userId);
  },

  /**
   * Get order by ID
   */
  async getOrderById(orderId) {
    const order = await orderRepository.findById(orderId);

    if (!order) {
      throw new AppError('Order not found', 404);
    }

    return order;
  },

  /**
   * Create order from payment data
   */
  async createOrder(orderData) {
    const {
      firstname,
      lastname,
      email,
      id,
      address,
      cartItems,
      subtotal,
      orderId,
      paymentId,
    } = orderData;

    const newOrder = {
      name: `${firstname} ${lastname}`,
      email,
      userid: id,
      orderItems: cartItems,
      shippingAddress: address,
      orderAmount: subtotal,
      orderId,
      paymentId,
    };

    return orderRepository.create(newOrder);
  },

  /**
   * Mark order as delivered
   */
  async deliverOrder(orderId) {
    const order = await orderRepository.updateDeliveryStatus(orderId, true);

    if (!order) {
      throw new AppError('Order not found', 404);
    }

    return { message: 'Order Delivered Successfully' };
  },

  /**
   * Check if order exists (for idempotency)
   */
  async orderExistsByRazorpayOrderId(razorpayOrderId) {
    const order = await orderRepository.findByOrderId(razorpayOrderId);
    return !!order;
  },
};

module.exports = ordersService;
