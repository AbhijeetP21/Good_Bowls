/**
 * Orders Controller
 * Handles HTTP request/response for order endpoints
 */
const asyncHandler = require('../utils/asyncHandler');
const ordersService = require('../services/orders.service');

const ordersController = {
  /**
   * GET /api/payment/getallorders
   * Get all orders (admin)
   */
  getAllOrders: asyncHandler(async (req, res) => {
    const orders = await ordersService.getAllOrders();

    res.status(200).json(orders);
  }),

  /**
   * POST /api/payment/getuserorders
   * Get orders for specific user
   */
  getUserOrders: asyncHandler(async (req, res) => {
    const { userId } = req.body;

    const orders = await ordersService.getUserOrders(userId);

    res.status(200).json(orders);
  }),

  /**
   * POST /api/payment/deliverorder
   * Mark order as delivered (admin)
   */
  deliverOrder: asyncHandler(async (req, res) => {
    const { orderid } = req.body;

    const result = await ordersService.deliverOrder(orderid);

    res.status(200).json(result);
  }),
};

module.exports = ordersController;
