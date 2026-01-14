import { useState } from 'react';
import { Link } from 'react-router-dom';
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
	Container,
	Flex,
	Image,
	InputGroup,
	InputLeftElement
} from '@chakra-ui/react';
import { Envelope, LockKey, SignIn } from 'phosphor-react';
import axios from 'axios';
import { API_BASE_URL } from '../../config/api';

const Login = () => {
	const [data, setData] = useState({ email: '', password: '' });
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
			const url = `${API_BASE_URL}/auth`;
			const res = await axios.post(url, data);
			localStorage.setItem('token', res?.data?.data);

			// Redirect based on role
			if (res?.data?.user?.role === 'admin') {
				window.location.href = '/admin';
			} else {
				window.location.href = '/';
			}
		} catch (error) {
			setIsLoading(false);
			if (
				error.response &&
				error.response.status >= 400 &&
				error.response.status <= 500
			) {
				setError(error.response.data.message);
				toast({
					title: 'Login Failed',
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
		<Flex minH="100vh" align="center" justify="center" bg="gray.50">
			{/* Split Screen Layout */}
			<Flex w="full" maxW="1200px" h={{ base: "auto", md: "700px" }} borderRadius="2xl" overflow="hidden" boxShadow="2xl" mx={4} bg="white">

				{/* Left Side - Image/Brand */}
				<Box
					w={{ base: "0%", md: "50%" }}
					display={{ base: "none", md: "block" }}
					bg="brand.500"
					position="relative"
					backgroundImage="url('https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800')"
					backgroundSize="cover"
					backgroundPosition="center"
				>
					<Box
						position="absolute"
						top={0}
						left={0}
						right={0}
						bottom={0}
						bg="blackAlpha.500"
						display="flex"
						flexDirection="column"
						alignItems="center"
						justifyContent="center"
						color="white"
						p={8}
						textAlign="center"
					>
						<Heading size="3xl" mb={4} fontFamily="Lobster" color="white">Good Bowl</Heading>
						<Text fontSize="xl" fontWeight="medium">Fresh Ingredients. Healthy Life.</Text>
					</Box>
				</Box>

				{/* Right Side - Form */}
				<Flex w={{ base: "100%", md: "50%" }} p={12} direction="column" justify="center" align="center">
					<VStack spacing={6} w="full" maxW="400px" as="form" onSubmit={handleSubmit}>
						<VStack spacing={2} align="center" w="full" mb={4}>
							<Heading size="xl" color="brand.700">Welcome Back</Heading>
							<Text color="gray.500">Sign in to your account</Text>
						</VStack>

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
									placeholder="••••••••"
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
							leftIcon={<SignIn size={20} weight="bold" />}
							borderRadius="lg"
						>
							Sign In
						</Button>

						<Text fontSize="sm" color="gray.500" pt={4}>
							Don't have an account?{' '}
							<Link to="/signup">
								<Text as="span" color="brand.500" fontWeight="bold" _hover={{ textDecoration: 'underline' }}>
									Sign Up
								</Text>
							</Link>
						</Text>
					</VStack>
				</Flex>
			</Flex>
		</Flex>
	);
};

export default Login;
