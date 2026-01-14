/**
 * Payments Controller
 * Handles HTTP request/response for payment endpoints
 */
const asyncHandler = require('../utils/asyncHandler');
const paymentsService = require('../services/payments.service');

const paymentsController = {
  // ============= RAZORPAY METHODS =============

  /**
   * POST /api/payment/orders
   * Create Razorpay order
   */
  createOrder: asyncHandler(async (req, res) => {
    const { subtotal } = req.body;

    const order = await paymentsService.createRazorpayOrder(subtotal);

    res.status(200).json({ data: order });
  }),

  /**
   * POST /api/payment/verifypayment
   * Verify payment and create order
   */
  verifyPayment: asyncHandler(async (req, res) => {
    const result = await paymentsService.verifyPaymentAndCreateOrder(req.body);

    res.status(200).json(result);
  }),

  /**
   * POST /api/payment/webhook
   * Handle Razorpay webhook
   */
  handleWebhook: asyncHandler(async (req, res) => {
    const signature = req.headers['x-razorpay-signature'];

    const result = await paymentsService.handleWebhook(req.body, signature);

    res.status(200).json(result);
  }),

  // ============= STRIPE METHODS =============

  /**
   * GET /api/payment/test
   * Health check endpoint
   */
  testRoute: (req, res) => {
    res.send('Payment route is working!');
  },

  /**
   * POST /api/payment/create-payment-intent
   * Create Stripe PaymentIntent
   */
  createPaymentIntent: asyncHandler(async (req, res) => {
    console.log('Received payment intent request');
    const { amount } = req.body;

    const result = await paymentsService.createStripePaymentIntent(amount);

    res.status(200).json(result);
  }),

  /**
   * POST /api/payment/placeorder
   * Place order after Stripe payment success
   */
  placeOrder: asyncHandler(async (req, res) => {
    const { subtotal, currentUser, cartItems, paymentId } = req.body;

    await paymentsService.createOrderAfterStripe({
      subtotal,
      currentUser,
      cartItems,
      paymentId,
    });

    res.send('Order placed successfully');
  }),
};

module.exports = paymentsController;

