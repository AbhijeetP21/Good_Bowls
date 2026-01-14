export const addToCart = (bowl, quantity, varient) => (dispatch, getState) => {
	console.log('Added2');
	var cartItem;
	if (bowl?.name === 'Build Your Own Bowl') {
		cartItem = {
			name: bowl?.name,
			_id: bowl?._id,
			image: bowl?.image,
			description: bowl?.description,
			varient: varient,
			quantity: quantity,
			prices: bowl?.prices,
			price: bowl?.prices,
		};
	} else {
		cartItem = {
			name: bowl?.name,
			_id: bowl?._id,
			image: bowl?.image,
			description: bowl?.description,
			varient: varient,
			quantity: Number(quantity),
			prices: bowl?.prices,
			price: bowl?.prices[0][varient] * quantity,
		};
	}
	console.log(cartItem);
	if (cartItem.quantity > 10) {
		alert('You cannot add more than 10 quantities');
	} else {
		if (cartItem.quantity <= 0) {
			dispatch({
				type: 'DELETE_FROM_CART',
				payload: bowl,
			});
		} else {
			dispatch({ type: 'ADD_TO_CART', payload: cartItem });
			const cartItems = getState().cart.cartItems;
			localStorage.setItem('cartItems', JSON.stringify(cartItems));
		}
	}
};

export const deleteFromCart = (bowl) => (dispatch, getState) => {
	dispatch({ type: 'DELETE_FROM_CART', payload: bowl });
	const cartItems = getState().cart.cartItems;
	localStorage.setItem('cartItems', JSON.stringify(cartItems));
};
