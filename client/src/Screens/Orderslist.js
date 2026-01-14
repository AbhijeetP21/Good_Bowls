import {
	Alert,
	AlertIcon,
	Button,
	Box,
	Spinner,
	Table,
	TableContainer,
	Tbody,
	Td,
	Th,
	Thead,
	Tr,
	Container,
	Heading,
	Flex,
	Badge,
	Text
} from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deliverOrder, getAllOrders } from '../actions/orderAction';
import AdminScreen from './AdminScreen/AdminScreen';

export default function Orderslist() {
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(getAllOrders());
	}, [dispatch]);
	const orderstate = useSelector((state) => state.getAllOrders);

	const { orders, error, loading } = orderstate;

	return (
		<Box bg="gray.50" minH="100vh">
			<AdminScreen />

			<Container maxW="container.xl">
				<Flex justify="space-between" align="center" mb={6}>
					<Heading size="lg" color="gray.700">Order History</Heading>
					<Badge colorScheme="brand" fontSize="md" p={2} borderRadius="md">
						Total Orders: {orders?.length || 0}
					</Badge>
				</Flex>

				{loading && (
					<Flex justify="center" align="center" minH="200px">
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
					<Alert status='error' borderRadius="md" mb={4}>
						<AlertIcon />
						Something went wrong ! Try again
					</Alert>
				)}

				<Box bg="white" shadow="sm" borderRadius="lg" overflow="hidden" border="1px" borderColor="gray.100">
					<TableContainer>
						<Table variant='simple' size="md">
							<Thead bg="gray.50">
								<Tr>
									<Th>Order ID</Th>
									<Th>Email</Th>
									<Th>User ID</Th>
									<Th>Amount</Th>
									<Th>Date</Th>
									<Th>Status</Th>
								</Tr>
							</Thead>
							<Tbody>
								{orders && orders.map((order) => (
									<Tr key={order._id} _hover={{ bg: "gray.50" }}>
										<Td fontFamily="mono" fontSize="sm" color="gray.500">{order._id}</Td>
										<Td>{order.email}</Td>
										<Td fontFamily="mono" fontSize="sm" color="gray.500">{order.userid}</Td>
										<Td fontWeight="bold">${order.orderAmount}</Td>
										<Td>{order.createdAt.substring(0, 10)}</Td>
										<Td>
											{order.isDelivered ? (
												<Badge colorScheme="green" variant="solid" px={3} py={1} borderRadius="full">
													Delivered
												</Badge>
											) : (
												<Button
													size="sm"
													colorScheme="red"
													onClick={() => {
														dispatch(
															deliverOrder(order._id),
														);
														// Refresh orders after updating
														setTimeout(() => dispatch(getAllOrders()), 100);
													}}
												>
													Mark Delivered
												</Button>
											)}
										</Td>
									</Tr>
								))}
							</Tbody>
						</Table>
					</TableContainer>
				</Box>
			</Container>
		</Box>
	);
}
