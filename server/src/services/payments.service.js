/**
 * Payments Service
 * Business logic for Razorpay and Stripe payments
 */
const Razorpay = require('razorpay');
const crypto = require('crypto');
const { v4: uuidv4 } = require('uuid');
const env = require('../config/env');
const AppError = require('../utils/AppError');
const ordersService = require('./orders.service');

// Lazy-initialize Razorpay instance (only when needed)
let razorpay = null;

const getRazorpayInstance = () => {
  if (!razorpay) {
    if (!env.RAZORPAY_KEY_ID || !env.RAZORPAY_KEY_SECRET) {
      throw new AppError('Razorpay credentials not configured', 500);
    }
    razorpay = new Razorpay({
      key_id: env.RAZORPAY_KEY_ID,
      key_secret: env.RAZORPAY_KEY_SECRET,
    });
  }
  return razorpay;
};

// Lazy-initialize Stripe instance
let stripe = null;

const getStripeInstance = () => {
  if (!stripe) {
    if (!env.STRIPE_SECRET_KEY) {
      throw new Error('STRIPE_SECRET_KEY is not configured');
    }
    stripe = require('stripe')(env.STRIPE_SECRET_KEY);
  }
  return stripe;
};

const paymentsService = {
  /**
   * Create Razorpay order
   */
  async createRazorpayOrder(subtotal) {
    const options = {
      amount: subtotal * 100, // Amount in paise
      currency: 'INR',
      receipt: crypto.randomBytes(10).toString('hex'),
    };

    return new Promise((resolve, reject) => {
      getRazorpayInstance().orders.create(options, (error, order) => {
        if (error) {
          reject(new AppError('Failed to create payment order', 500));
        } else {
          resolve(order);
        }
      });
    });
  },

  /**
   * Verify payment signature and create order
   */
  async verifyPaymentAndCreateOrder(paymentData) {
    const { paymentId, orderId, signature } = paymentData;

    // Verify signature
    const sign = `${orderId}|${paymentId}`;
    const expectedSign = crypto
      .createHmac('sha256', env.RAZORPAY_KEY_SECRET)
      .update(sign)
      .digest('hex');

    if (signature !== expectedSign) {
      throw new AppError('Invalid signature sent', 400);
    }

    // Check idempotency - if order already exists
    const orderExists = await ordersService.orderExistsByRazorpayOrderId(orderId);
    if (orderExists) {
      return { message: 'Payment already processed', alreadyProcessed: true };
    }

    // Create order
    const order = await ordersService.createOrder({
      ...paymentData,
      orderId,
      paymentId,
    });

    if (!order) {
      throw new AppError('Payment not verified', 400);
    }

    return { message: 'Payment verified successfully' };
  },

  /**
   * Handle Razorpay webhook
   * Provides idempotent payment confirmation
   */
  async handleWebhook(body, signature) {
    // Verify webhook signature
    const expectedSignature = crypto
      .createHmac('sha256', env.RAZORPAY_WEBHOOK_SECRET)
      .update(JSON.stringify(body))
      .digest('hex');

    if (signature !== expectedSignature) {
      throw new AppError('Invalid webhook signature', 400);
    }

    const event = body.event;
    const payload = body.payload;

    // Handle payment captured event
    if (event === 'payment.captured') {
      const payment = payload.payment.entity;
      const orderId = payment.order_id;

      // Check idempotency
      const orderExists = await ordersService.orderExistsByRazorpayOrderId(orderId);

      if (orderExists) {
        // Already processed, return success for idempotency
        return { status: 'already_processed' };
      }

      // Note: For webhook, we might not have all user details
      // This is a backup confirmation - primary flow is via client verify
      return { status: 'payment_captured', orderId };
    }

    return { status: 'event_received' };
  },

  // ============= STRIPE METHODS =============

  /**
   * Create Stripe PaymentIntent
   */
  async createStripePaymentIntent(amount) {
    const stripeInstance = getStripeInstance();

    const paymentIntent = await stripeInstance.paymentIntents.create({
      amount: Math.round(amount * 100), // Amount in cents
      currency: 'usd',
      automatic_payment_methods: { enabled: true },
    });

    return { clientSecret: paymentIntent.client_secret };
  },

  /**
   * Create order after Stripe payment success
   */
  async createOrderAfterStripe(orderData) {
    const { subtotal, currentUser, cartItems, paymentId } = orderData;

    // Import order repository directly to bypass ordersService field mapping
    const orderRepository = require('../repositories/order.repository');

    // Handle both 'name' and 'firstName/lastName' formats
    const userName = currentUser.name || `${currentUser.firstName || ''} ${currentUser.lastName || ''}`.trim() || 'Guest';

    const newOrder = {
      name: userName,
      email: currentUser.email,
      userid: currentUser._id,
      orderItems: cartItems,
      orderAmount: subtotal,
      shippingAddress: currentUser.address || 'Pickup/Dine-in',
      paymentId: paymentId,
      orderId: uuidv4(),
    };

    const order = await orderRepository.create(newOrder);
    return order;
  },
};

module.exports = paymentsService;

