const express = require('express');
const router = express.Router();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const Order = require('../models/orderModel');
const { v4: uuidv4 } = require('uuid');

// Stripe Payment Intent
router.get('/test', (req, res) => {
	res.send('Payment route is working!');
});

router.post('/create-payment-intent', async (req, res) => {
	console.log('Received payment intent request');
	try {
		const { amount } = req.body;
		const paymentIntent = await stripe.paymentIntents.create({
			amount: amount * 100,
			currency: 'usd',
			automatic_payment_methods: { enabled: true },
		});
		res.send({ clientSecret: paymentIntent.client_secret });
	} catch (error) {
		console.error('Stripe Error:', error);
		res.status(500).json({ error: error.message });
	}
});

// Verify and Place Order (Stripe)
router.post('/placeorder', async (req, res) => {
	const { subtotal, currentUser, cartItems, paymentId } = req.body;

	try {
		const newOrder = new Order({
			name: currentUser.name,
			email: currentUser.email,
			userid: currentUser._id,
			orderItems: cartItems,
			orderAmount: subtotal,
			shippingAddress: currentUser.address || 'Pickup/Dine-in',
			paymentId: paymentId,
			orderId: uuidv4()
		});
		await newOrder.save();
		res.send('Order placed successfully');
	} catch (error) {
		console.log(error);
		res.status(400).json({ message: 'Something went wrong', error });
	}
});

// Get User Orders
router.post('/getuserorders', async (req, res) => {
	const { userId } = req.body;
	try {
		const orders = await Order.find({ userid: userId }).sort({ _id: -1 });
		res.send(orders);
	} catch (error) {
		res.status(400).json({ message: 'Something went wrong' });
	}
});

// Get All Orders (Admin)
router.get('/getallorders', async (req, res) => {
	try {
		const orders = await Order.find({});
		res.send(orders);
	} catch (error) {
		res.status(400).json({ message: 'Something went wrong' });
	}
});

// Deliver Order
router.post('/deliverorder', async (req, res) => {
	const { orderid } = req.body;
	try {
		const order = await Order.findOne({ _id: orderid });
		order.isDelivered = true;
		await order.save();
		res.send('Order Delivered Successfully');
	} catch (error) {
		res.status(400).json({ message: 'Something went wrong' });
	}
});

module.exports = router;
