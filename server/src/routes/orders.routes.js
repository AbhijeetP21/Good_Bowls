/**
 * Orders Routes
 * Endpoints for order management
 */
const router = require('express').Router();
const ordersController = require('../controllers/orders.controller');
const validate = require('../middlewares/validate');
const {
  userOrdersSchema,
  deliverOrderSchema,
} = require('../validators/order.validator');

// GET /api/payment/getallorders - Get all orders (admin)
router.get('/getallorders', ordersController.getAllOrders);

// POST /api/payment/getuserorders - Get user's orders
router.post('/getuserorders', validate(userOrdersSchema), ordersController.getUserOrders);

// POST /api/payment/deliverorder - Mark order as delivered (admin)
router.post('/deliverorder', validate(deliverOrderSchema), ordersController.deliverOrder);

module.exports = router;
