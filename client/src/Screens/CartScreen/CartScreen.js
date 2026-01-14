import React from 'react';
import { Box } from '@chakra-ui/react';
import CartDisplayModern from '../../Components/CartDisplay/CartDisplayModern';
import NavbarModern from '../../Components/Navbar/NavbarModern';

export default function CartScreen() {
	return (
		<Box minH="100vh" bg="gray.50">
			<NavbarModern />
			<CartDisplayModern />
		</Box>
	);
}
