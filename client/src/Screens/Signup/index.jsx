import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
	Box,
	Button,
	FormControl,
	FormLabel,
	Input,
	VStack,
	Text,
	Heading,
	useToast,
	Flex,
	InputGroup,
	InputLeftElement,
	HStack
} from '@chakra-ui/react';
import { Envelope, LockKey, User, House, UserPlus } from 'phosphor-react';
import axios from 'axios';
import { API_BASE_URL } from '../../config/api';

const Signup = () => {
	const navigate = useNavigate();
	const [data, setData] = useState({
		firstName: '',
		lastName: '',
		address: '',
		email: '',
		password: '',
	});
	const [error, setError] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const toast = useToast();

	const handleChange = ({ currentTarget: input }) => {
		setData({ ...data, [input.name]: input.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setIsLoading(true);
		setError('');
		try {
			const url = `${API_BASE_URL}/users`;
			const { data: res } = await axios.post(url, data);

			toast({
				title: 'Account Created!',
				description: 'You can now sign in with your new account.',
				status: 'success',
				duration: 5000,
				isClosable: true,
				position: 'top'
			});

			// Redirect to login after short delay
			setTimeout(() => {
				navigate('/login');
			}, 1000);

		} catch (error) {
			setIsLoading(false);
			if (
				error.response &&
				error.response.status >= 400 &&
				error.response.status <= 500
			) {
				setError(error.response.data.message);
				toast({
					title: 'Signup Failed',
					description: error.response.data.message,
					status: 'error',
					duration: 3000,
					isClosable: true,
					position: 'top'
				});
			}
		}
	};

	return (
		<Flex minH="100vh" align="center" justify="center" bg="gray.50" py={12}>
			{/* Split Screen Layout */}
			<Flex w="full" maxW="1200px" bg="white" borderRadius="2xl" overflow="hidden" boxShadow="2xl" mx={4} flexDirection={{ base: 'column-reverse', md: 'row' }}>

				{/* Left Side - Form */}
				<Flex w={{ base: "100%", md: "60%" }} p={{ base: 8, md: 12 }} direction="column" justify="center">
					<VStack spacing={6} w="full" as="form" onSubmit={handleSubmit}>
						<VStack spacing={2} align="start" w="full" mb={2}>
							<Heading size="xl" color="brand.700">Create Account</Heading>
							<Text color="gray.500">Join Good Bowl today for fresh rewards!</Text>
						</VStack>

						<HStack w="full" spacing={4}>
							<FormControl isRequired>
								<FormLabel>First Name</FormLabel>
								<InputGroup>
									<InputLeftElement pointerEvents="none">
										<User color="gray" size={20} />
									</InputLeftElement>
									<Input
										type="text"
										name="firstName"
										placeholder="John"
										value={data.firstName}
										onChange={handleChange}
										borderRadius="lg"
										_focus={{ borderColor: 'brand.500', boxShadow: '0 0 0 1px #22c55e' }}
									/>
								</InputGroup>
							</FormControl>
							<FormControl isRequired>
								<FormLabel>Last Name</FormLabel>
								<InputGroup>
									<InputLeftElement pointerEvents="none">
										<User color="gray" size={20} />
									</InputLeftElement>
									<Input
										type="text"
										name="lastName"
										placeholder="Doe"
										value={data.lastName}
										onChange={handleChange}
										borderRadius="lg"
										_focus={{ borderColor: 'brand.500', boxShadow: '0 0 0 1px #22c55e' }}
									/>
								</InputGroup>
							</FormControl>
						</HStack>

						<FormControl isRequired>
							<FormLabel>Address</FormLabel>
							<InputGroup>
								<InputLeftElement pointerEvents="none">
									<House color="gray" size={20} />
								</InputLeftElement>
								<Input
									type="text"
									name="address"
									placeholder="123 Salad St, Bowl City"
									value={data.address}
									onChange={handleChange}
									borderRadius="lg"
									_focus={{ borderColor: 'brand.500', boxShadow: '0 0 0 1px #22c55e' }}
								/>
							</InputGroup>
						</FormControl>

						<FormControl isRequired>
							<FormLabel>Email</FormLabel>
							<InputGroup>
								<InputLeftElement pointerEvents="none">
									<Envelope color="gray" size={20} />
								</InputLeftElement>
								<Input
									type="email"
									name="email"
									placeholder="your@email.com"
									value={data.email}
									onChange={handleChange}
									borderRadius="lg"
									_focus={{ borderColor: 'brand.500', boxShadow: '0 0 0 1px #22c55e' }}
								/>
							</InputGroup>
						</FormControl>

						<FormControl isRequired>
							<FormLabel>Password</FormLabel>
							<InputGroup>
								<InputLeftElement pointerEvents="none">
									<LockKey color="gray" size={20} />
								</InputLeftElement>
								<Input
									type="password"
									name="password"
									placeholder="Create a strong password"
									value={data.password}
									onChange={handleChange}
									borderRadius="lg"
									_focus={{ borderColor: 'brand.500', boxShadow: '0 0 0 1px #22c55e' }}
								/>
							</InputGroup>
						</FormControl>

						{error && (
							<Box w="full" p={3} bg="red.50" color="red.500" borderRadius="md" fontSize="sm" textAlign="center">
								{error}
							</Box>
						)}

						<Button
							type="submit"
							w="full"
							size="lg"
							bg="brand.500"
							color="white"
							_hover={{ bg: 'brand.600' }}
							isLoading={isLoading}
							leftIcon={<UserPlus size={20} weight="bold" />}
							borderRadius="lg"
							mt={2}
						>
							Create Account
						</Button>

						<Text fontSize="sm" color="gray.500" pt={2} textAlign="center" w="full">
							Already have an account?{' '}
							<Link to="/login">
								<Text as="span" color="brand.500" fontWeight="bold" _hover={{ textDecoration: 'underline' }}>
									Sign In
								</Text>
							</Link>
						</Text>
					</VStack>
				</Flex>

				{/* Right Side - Image/Brand */}
				<Box
					w={{ base: "100%", md: "40%" }}
					bg="brand.600"
					position="relative"
					backgroundImage="url('https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=800')"
					backgroundSize="cover"
					backgroundPosition="center"
					minH={{ base: "200px", md: "auto" }}
				>
					<Box
						position="absolute"
						top={0}
						left={0}
						right={0}
						bottom={0}
						bg="blackAlpha.400"
						display="flex"
						flexDirection="column"
						alignItems="center"
						justifyContent="center"
						color="white"
						p={8}
						textAlign="center"
					>
						<Heading size="2xl" mb={4} fontFamily="Lobster" display={{ base: 'none', md: 'block' }} color="white">Fresh Start</Heading>
					</Box>
				</Box>
			</Flex>
		</Flex>
	);
};

export default Signup;
