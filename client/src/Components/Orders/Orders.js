import {
	Alert,
	AlertIcon,
	Flex,
	Spinner,
	Text,
	VStack,
	Container,
	Heading,
	SimpleGrid,
	Box
} from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserOrders } from '../../actions/orderAction';
import OrderDisplay from '../OrderDisplay/OrderDisplay';

export default function Orders() {
	const dispatch = useDispatch();
	const orderstate = useSelector((state) => state.getUserOrders);
	const { loading, error, orders } = orderstate;

	useEffect(() => {
		dispatch(getUserOrders());
	}, [dispatch]);
	return (
		<Box w="full" py={10}>
			<Container maxW="container.xl">
				<Heading textAlign='center' mb={10} color="gray.700">My Order History</Heading>

				{loading && (
					<Flex justify="center">
						<Spinner
							thickness='4px'
							speed='0.65s'
							emptyColor='gray.200'
							color='brand.500'
							size='xl'
						/>
					</Flex>
				)}

				{error && (
					<Alert status='error' borderRadius="md" mb={6}>
						<AlertIcon />
						Something went wrong ! Try again
					</Alert>
				)}

				<SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
					{orders && orders.map((order) => (
						<OrderDisplay key={order._id} order={order} />
					))}
				</SimpleGrid>

				{!loading && !error && orders?.length === 0 && (
					<Text textAlign="center" fontSize="xl" color="gray.500">No orders found.</Text>
				)}
			</Container>
		</Box>
	);
}
