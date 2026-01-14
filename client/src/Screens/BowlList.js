import {
	Alert,
	AlertIcon,
	Box,
	Spinner,
	Table,
	TableCaption,
	TableContainer,
	Tbody,
	Td,
	Text,
	Th,
	Thead,
	Tr,
	Container,
	Heading,
	Flex,
	Badge,
	Image,
	IconButton,
	Tooltip
} from '@chakra-ui/react';
import { Pencil, Trash } from 'phosphor-react';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteBowl, getAllBowls } from '../actions/bowlActions';
import AdminScreen from './AdminScreen/AdminScreen';

export default function BowlList() {
	const dispatch = useDispatch();

	const bowlstate = useSelector((state) => state.getAllBowls);

	const { bowls, error, loading } = bowlstate;

	useEffect(() => {
		dispatch(getAllBowls());
	}, [dispatch]);
	return (
		<Box bg="gray.50" minH="100vh">
			<AdminScreen />

			<Container maxW="container.xl">
				<Flex justify="space-between" align="center" mb={6}>
					<Heading size="lg" color="gray.700">Bowls Menu</Heading>
					<Badge colorScheme="brand" fontSize="md" p={2} borderRadius="md">
						Total: {bowls?.length || 0}
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
									<Th>Name</Th>
									<Th>Prices</Th>
									<Th>Category</Th>
									<Th>Actions</Th>
								</Tr>
							</Thead>
							<Tbody>
								{bowls &&
									bowls.map((bowl) => {
										return (
											<Tr key={bowl._id} _hover={{ bg: "gray.50" }}>
												<Td fontWeight="medium">
													<Flex align="center" gap={3}>
														<Image src={bowl.image} boxSize="40px" objectFit="cover" borderRadius="md" alt={bowl.name} />
														{bowl.name}
													</Flex>
												</Td>
												<Td>
													<Flex direction="column" fontSize="sm" color="gray.600">
														<Text>Small: ${bowl.prices[0]['small']}</Text>
														<Text>Medium: ${bowl.prices[0]['medium']}</Text>
														<Text>Large: ${bowl.prices[0]['large']}</Text>
													</Flex>
												</Td>
												<Td>
													<Badge
														colorScheme={bowl.category === 'veg' || bowl.category === 'vegetarian' || bowl.category === 'vegan' ? 'green' : 'red'}
														variant="subtle"
													>
														{bowl.category}
													</Badge>
												</Td>
												<Td>
													<Flex gap={2}>
														<Tooltip label="Delete Bowl">
															<IconButton
																icon={<Trash size={20} weight="bold" />}
																colorScheme="red"
																variant="ghost"
																size="sm"
																onClick={() => {
																	if (window.confirm('Are you sure you want to delete this bowl?')) {
																		dispatch(deleteBowl(bowl._id));
																	}
																}}
															/>
														</Tooltip>
														<Tooltip label="Edit Bowl">
															<Link to={`/admin/editbowl/${bowl._id}`}>
																<IconButton
																	icon={<Pencil size={20} weight="bold" />}
																	colorScheme="blue"
																	variant="ghost"
																	size="sm"
																/>
															</Link>
														</Tooltip>
													</Flex>
												</Td>
											</Tr>
										);
									})}
							</Tbody>
						</Table>
					</TableContainer>
				</Box>
			</Container>
		</Box>
	);
}
