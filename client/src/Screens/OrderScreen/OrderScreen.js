import React from 'react';
import { Box } from '@chakra-ui/react';
import NavbarModern from '../../Components/Navbar/NavbarModern';
import Orders from '../../Components/Orders/Orders';

export default function OrderScreen() {
	return (
		<Box minH="100vh" bg="gray.50">
			<NavbarModern />
			<Orders />
		</Box>
	);
}
