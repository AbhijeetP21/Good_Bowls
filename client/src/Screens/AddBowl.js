import {
	Alert,
	AlertIcon,
	Button,
	FormControl,
	FormLabel,
	Input,
	Spinner,
	Text,
	Box,
	Container,
	Heading,
	Flex,
	VStack,
	SimpleGrid,
	InputGroup,
	InputLeftAddon,
	Textarea
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addBowl } from '../actions/bowlActions';
import AdminScreen from './AdminScreen/AdminScreen';

export default function AddBowl() {
	const [name, setName] = useState('');
	const [smallPrice, setSmallPrice] = useState('');
	const [largePrice, setLargePrice] = useState('');
	const [mediumPrice, setMediumPrice] = useState('');
	const [description, setDescription] = useState('');
	const [image, setImage] = useState('');
	const [category, setCategory] = useState('');
	const dispatch = useDispatch();
	const addbowlstate = useSelector((state) => state.addBowl);

	const { success, error, loading } = addbowlstate;

	function formHandler(e) {
		e.preventDefault();
		const bowl = {
			name: name,
			image: image,
			description: description,
			category: category,
			prices: {
				small: Number(smallPrice),
				medium: Number(mediumPrice),
				large: Number(largePrice),
			},
		};
		console.log(bowl);
		dispatch(addBowl(bowl));
	}
	return (
		<Box bg="gray.50" minH="100vh">
			<AdminScreen />

			<Container maxW="container.md" py={10}>

				<Box bg="white" p={8} borderRadius="lg" shadow="sm" border="1px" borderColor="gray.100">
					<VStack spacing={6} as="form" onSubmit={formHandler}>
						<Heading size="lg" color="gray.700" w="full" textAlign="left">Add New Bowl</Heading>

						{loading && (
							<Spinner
								thickness='4px'
								speed='0.65s'
								emptyColor='gray.200'
								color='brand.500'
								size='xl'
							/>
						)}

						{error && (
							<Alert status='error' borderRadius="md">
								<AlertIcon />
								Something went wrong ! Try again
							</Alert>
						)}

						{success && (
							<Alert status='success' borderRadius="md">
								<AlertIcon />
								New bowl added successfully
							</Alert>
						)}

						<FormControl isRequired>
							<FormLabel>Bowl Name</FormLabel>
							<Input
								value={name}
								onChange={(e) => setName(e.target.value)}
								placeholder='e.g. Quinoa Power Bowl'
							/>
						</FormControl>

						<SimpleGrid columns={3} spacing={4} w="full">
							<FormControl isRequired>
								<FormLabel>Small Price</FormLabel>
								<InputGroup>
									<InputLeftAddon children="$" />
									<Input
										value={smallPrice}
										onChange={(e) => setSmallPrice(e.target.value)}
										placeholder='0.00'
										type="number"
									/>
								</InputGroup>
							</FormControl>
							<FormControl isRequired>
								<FormLabel>Medium Price</FormLabel>
								<InputGroup>
									<InputLeftAddon children="$" />
									<Input
										value={mediumPrice}
										onChange={(e) => setMediumPrice(e.target.value)}
										placeholder='0.00'
										type="number"
									/>
								</InputGroup>
							</FormControl>
							<FormControl isRequired>
								<FormLabel>Large Price</FormLabel>
								<InputGroup>
									<InputLeftAddon children="$" />
									<Input
										value={largePrice}
										onChange={(e) => setLargePrice(e.target.value)}
										placeholder='0.00'
										type="number"
									/>
								</InputGroup>
							</FormControl>
						</SimpleGrid>

						<FormControl isRequired>
							<FormLabel>Image URL</FormLabel>
							<Input
								value={image}
								onChange={(e) => setImage(e.target.value)}
								placeholder='https://...'
							/>
						</FormControl>

						<FormControl isRequired>
							<FormLabel>Category</FormLabel>
							<Input
								value={category}
								onChange={(e) => setCategory(e.target.value)}
								placeholder='e.g. veg, non-veg, vegan'
							/>
						</FormControl>

						<FormControl isRequired>
							<FormLabel>Description</FormLabel>
							<Textarea
								value={description}
								onChange={(e) => setDescription(e.target.value)}
								placeholder='Describe the ingredients and flavors...'
							/>
						</FormControl>

						<Button
							colorScheme="brand"
							size="lg"
							width='full'
							type='submit'
							isLoading={loading}
						>
							Add Bowl
						</Button>
					</VStack>
				</Box>
			</Container>
		</Box>
	);
}
