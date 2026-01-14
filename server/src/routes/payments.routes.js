/**
 * Payments Routes
 * Endpoints for Razorpay and Stripe payment processing
 */
const router = require('express').Router();
const paymentsController = require('../controllers/payments.controller');
const ordersController = require('../controllers/orders.controller');
const validate = require('../middlewares/validate');
const {
  createOrderSchema,
  verifyPaymentSchema,
  userOrdersSchema,
  deliverOrderSchema,
} = require('../validators/order.validator');

// ============= STRIPE ROUTES =============

// GET /api/payment/test - Health check
router.get('/test', paymentsController.testRoute);

// POST /api/payment/create-payment-intent - Create Stripe PaymentIntent
router.post('/create-payment-intent', paymentsController.createPaymentIntent);

// POST /api/payment/placeorder - Create order after Stripe payment
router.post('/placeorder', paymentsController.placeOrder);

// ============= RAZORPAY ROUTES =============

// POST /api/payment/orders - Create Razorpay order
router.post('/orders', validate(createOrderSchema), paymentsController.createOrder);

// POST /api/payment/verifypayment - Verify payment
router.post('/verifypayment', validate(verifyPaymentSchema), paymentsController.verifyPayment);

// POST /api/payment/webhook - Razorpay webhook (signature verified in controller)
router.post('/webhook', paymentsController.handleWebhook);

// ============= ORDER ROUTES =============
// Order-related endpoints (kept in payment route for backward compatibility)

// GET /api/payment/getallorders - Get all orders (admin)
router.get('/getallorders', ordersController.getAllOrders);

// POST /api/payment/getuserorders - Get user's orders
router.post('/getuserorders', validate(userOrdersSchema), ordersController.getUserOrders);

// POST /api/payment/deliverorder - Mark order as delivered (admin)
router.post('/deliverorder', validate(deliverOrderSchema), ordersController.deliverOrder);

module.exports = router;

