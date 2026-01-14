import axios from 'axios';
import { API_BASE_URL } from '../config/api';

export const placeOrder = (paymentId) => async (dispatch, getState) => {
	dispatch({ type: 'PLACE_ORDER_REQUEST' });
	const cartItems = getState().cart.cartItems;
	const currentUser = getState().setUserData.userData;

	// Debug logging
	console.log('placeOrder called with paymentId:', paymentId);
	console.log('currentUser:', currentUser);
	console.log('cartItems:', cartItems);

	// Validate user data
	if (!currentUser || !currentUser._id) {
		console.error('Error: User data not available in Redux store');
		dispatch({ type: 'PLACE_ORDER_FAILED' });
		return;
	}

	// Calculate subtotal from cartItems
	const subtotal = cartItems.reduce((x, item) => x + item.price, 0);

	try {
		const response = await axios.post(`${API_BASE_URL}/payment/placeorder`, {
			subtotal,
			currentUser,
			cartItems,
			paymentId
		});

		console.log('Order placed successfully:', response.data);
		dispatch({ type: 'PLACE_ORDER_SUCCESS' });

		// Clear cart from localStorage
		localStorage.removeItem('cartItems');

		// Clear cart in Redux state
		dispatch({ type: 'CLEAR_CART' });

		// Redirect to orders page
		window.location.href = '/myorders';
	} catch (error) {
		console.error('Error placing order:', error.response?.data || error.message);
		dispatch({ type: 'PLACE_ORDER_FAILED' });
	}
};


export const getUserOrders = () => async (dispatch, getState) => {
	dispatch({ type: 'GET_USER_ORDERS_REQUEST' });
	const user = getState().setUserData.userData;

	try {
		const response = await axios.post(
			`${API_BASE_URL}/payment/getuserorders`,
			{ userId: user._id },
		);
		console.log(response);
		dispatch({ type: 'GET_USER_ORDERS_SUCCESS', payload: response.data });
	} catch (error) {
		dispatch({ type: 'GET_USER_ORDERS_FAILED', payload: error });
	}
};

//get all orders
export const getAllOrders = () => async (dispatch) => {
	dispatch({ type: 'GET_ALL_ORDERS_REQUEST' });
	try {
		const response = await axios.get(
			`${API_BASE_URL}/payment/getallorders`,
		);
		console.log(response);
		dispatch({ type: 'GET_ALL_ORDERS_SUCCESS', payload: response.data });
	} catch (error) {
		dispatch({ type: 'GET_ALL_ORDERS_FAILED', payload: error });
	}
};

//check delivered order status
export const deliverOrder = (orderid) => async (dispatch) => {
	dispatch({ type: 'CHECK_ORDER_STATUS_REQUEST' });
	try {
		const response = await axios.post(
			`${API_BASE_URL}/payment/deliverorder`,
			{ orderid: orderid },
		);
		console.log(response);
		alert('Order Delivered');
		const orders = await axios.get(
			`${API_BASE_URL}/payment/getallorders`,
		);
		window.location.reload();
		console.log(orders);
		dispatch({
			type: 'CHECK_ORDER_STATUS_SUCCESS',
			payload: orders.data,
		});
	} catch (error) {
		dispatch({ type: 'CHECK_ORDER_STATUS_FAILED', payload: error });
	}
};
