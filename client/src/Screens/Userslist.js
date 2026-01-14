import {
	Alert,
	AlertIcon,
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
	Avatar
} from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsers } from '../actions/userAction';
import AdminScreen from './AdminScreen/AdminScreen';

export default function Userslist() {
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(getAllUsers());
	}, [dispatch]);
	const userstate = useSelector((state) => state.getAllUsers);

	const { users, error, loading } = userstate;

	return (
		<Box bg="gray.50" minH="100vh">
			<AdminScreen />

			<Container maxW="container.xl">
				<Flex justify="space-between" align="center" mb={6}>
					<Heading size="lg" color="gray.700">Customer List</Heading>
					<Badge colorScheme="brand" fontSize="md" p={2} borderRadius="md">
						Total Users: {users?.length || 0}
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
									<Th>User</Th>
									<Th>Email</Th>
									<Th>User ID</Th>
									<Th>Address</Th>
								</Tr>
							</Thead>
							<Tbody>
								{users && users.map((user) => (
									<Tr key={user._id} _hover={{ bg: "gray.50" }}>
										<Td fontWeight="medium">
											<Flex align="center" gap={3}>
												<Avatar size="sm" name={`${user.firstName} ${user.lastName}`} bg="brand.500" color="white" />
												{user.firstName} {user.lastName}
											</Flex>
										</Td>
										<Td>{user.email}</Td>
										<Td fontFamily="mono" fontSize="sm" color="gray.500">{user._id}</Td>
										<Td>{user.address}</Td>
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
