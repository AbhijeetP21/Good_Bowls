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
	VStack,
	SimpleGrid,
	InputGroup,
	InputLeftAddon,
	Textarea
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getBowlById, updateBowl } from '../actions/bowlActions';
import AdminScreen from './AdminScreen/AdminScreen';
export default function EditBowl() {
	const { bowlid } = useParams();
	const dispatch = useDispatch();
	const updatebowlstate = useSelector((state) => state.updateBowl);
	const getbowlbyidstate = useSelector((state) => state.getBowlById);
	const { bowl, error, loading } = getbowlbyidstate;
	const { updatesuccess, updateloading, updateerror } = updatebowlstate;

	const [name, setName] = useState('');
	const [smallPrice, setSmallPrice] = useState('');
	const [largePrice, setLargePrice] = useState('');
	const [mediumPrice, setMediumPrice] = useState('');
	const [description, setDescription] = useState('');
	const [image, setImage] = useState('');
	const [category, setCategory] = useState('');

	useEffect(() => {
		if (bowl) {
			if (bowl._id === bowlid) {
				setName(bowl.name);
				setSmallPrice(bowl.prices[0]['small']);
				setMediumPrice(bowl.prices[0]['medium']);
				setLargePrice(bowl.prices[0]['large']);
				setDescription(bowl.description);
				setImage(bowl.image);
				setCategory(bowl.category);
			} else {
				dispatch(getBowlById(bowlid));
			}
		} else {
			dispatch(getBowlById(bowlid));
		}
	}, [dispatch, bowl, bowlid]);

	function formHandler(e) {
		e.preventDefault();
		const updatedBowl = {
			_id: bowlid,
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
		dispatch(updateBowl(updatedBowl));
	}


	return (
		<Box bg="gray.50" minH="100vh">
			<AdminScreen />

			<Container maxW="container.md" py={10}>
				<Box bg="white" p={8} borderRadius="lg" shadow="sm" border="1px" borderColor="gray.100">
					<VStack spacing={6} as="form" onSubmit={formHandler}>
						<Heading size="lg" color="gray.700" w="full" textAlign="left">Edit Bowl</Heading>

						{(loading || updateloading) && (
							<Spinner
								thickness='4px'
								speed='0.65s'
								emptyColor='gray.200'
								color='brand.500'
								size='xl'
							/>
						)}

						{(error || updateerror) && (
							<Alert status='error' borderRadius="md">
								<AlertIcon />
								Something went wrong ! Try again
							</Alert>
						)}

						{updatesuccess && (
							<Alert status='success' borderRadius="md">
								<AlertIcon />
								Bowl details updated successfully
							</Alert>
						)}

						<FormControl isRequired>
							<FormLabel>Bowl Name</FormLabel>
							<Input
								value={name}
								onChange={(e) => setName(e.target.value)}
								placeholder='Bowl Name'
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
								placeholder='category'
							/>
						</FormControl>

						<FormControl isRequired>
							<FormLabel>Description</FormLabel>
							<Textarea
								value={description}
								onChange={(e) => setDescription(e.target.value)}
								placeholder='Description'
							/>
						</FormControl>

						<Button
							colorScheme="brand"
							size="lg"
							width='full'
							type='submit'
							isLoading={updateloading}
						>
							Update Bowl
						</Button>
					</VStack>
				</Box>
			</Container>
		</Box>
	);
}
