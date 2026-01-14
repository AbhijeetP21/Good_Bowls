import { Alert, AlertIcon, Button, Spinner } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { placeOrder } from '../../actions/orderAction';

export default function Checkout({ subtotal }) {
	const orderstate = useSelector((state) => state.placeOrder);
	const { loading, error, success } = orderstate;
	const dispatch = useDispatch();
	//if success is true, then redirect to orders page and clear the cart
	useEffect(() => {
		if (success) {
			localStorage.removeItem('cartItems');
		} else {
			return;
		}
	}, [success]);

	return (
		<>
			{loading && (
				<Spinner
					thickness='4px'
					speed='0.65s'
					emptyColor='gray.200'
					color='blue.500'
					size='xl'
				/>
			)}

			{error && (
				<Alert status='error'>
					<AlertIcon />
					Something went wrong ! Try again
				</Alert>
			)}

			{success && (
				<Alert status='success'>
					<AlertIcon />
					Payment Done ! Order Placed Successfully . Go to My Orders!
				</Alert>
			)}

			<Button
				backgroundColor='#22c55e'
				color='white'
				width='100%'
				_hover={{ bg: '#16a34a' }}
				onClick={() => {
					dispatch(placeOrder(subtotal));
				}}
			>
				PAY NOW
			</Button>
		</>
	);
}
