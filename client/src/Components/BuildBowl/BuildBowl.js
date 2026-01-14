import {
	Box,
	Button,
	Flex,
	HStack,
	Image,
	Radio,
	RadioGroup,
	Spacer,
	Stack,
	Text,
	VStack,
	IconButton,
} from '@chakra-ui/react';
import { Select } from 'antd';
import 'antd/dist/antd.css';
import { nanoid } from 'nanoid';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../actions/cartActions';
import { Plus, Minus } from 'phosphor-react';

// Salad bowl options - these override the database bowl options
const GREENS_OPTIONS = [
	{ name: 'Romaine Lettuce', price: { small: 0, medium: 0, large: 0 } },
	{ name: 'Baby Spinach', price: { small: 1, medium: 1.5, large: 2 } },
	{ name: 'Mixed Greens', price: { small: 1, medium: 1.5, large: 2 } },
	{ name: 'Kale', price: { small: 1.5, medium: 2, large: 2.5 } },
	{ name: 'Arugula', price: { small: 1.5, medium: 2, large: 2.5 } },
	{ name: 'Spring Mix', price: { small: 1, medium: 1.5, large: 2 } },
];

const TOPPING_OPTIONS = [
	'Cherry Tomatoes',
	'Cucumber',
	'Red Onion',
	'Bell Peppers',
	'Corn',
	'Black Beans',
	'Chickpeas',
	'Avocado',
	'Carrots',
	'Broccoli',
	'Edamame',
	'Roasted Beets',
];

const DRESSING_OPTIONS = [
	'Ranch',
	'Caesar',
	'Balsamic Vinaigrette',
	'Italian',
	'Honey Mustard',
	'Lemon Tahini',
	'Greek Yogurt',
	'Olive Oil & Lemon',
];

const PROTEIN_OPTIONS = [
	'Grilled Chicken',
	'Grilled Salmon',
	'Shrimp',
	'Tofu',
	'Hard-Boiled Egg',
	'Feta Cheese',
	'Goat Cheese',
	'None',
];

// Base prices for bowl sizes
const BASE_PRICES = {
	small: 8,
	medium: 10,
	large: 12,
};

export default function BuildBowl() {
	const dispatch = useDispatch();
	const [selectedGreens, setSelectedGreens] = useState('');
	const [selectedToppings, setSelectedToppings] = useState([]);
	const [selectedDressing, setSelectedDressing] = useState('');
	const [selectedProtein, setSelectedProtein] = useState('');
	const [quantity, setQuantity] = useState(1);
	const [cartItem, setCartItem] = useState({
		name: 'Build Your Own Bowl',
		_id: '',
		image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800',
		description: '',
		varient: '',
		quantity: 1,
		prices: 0,
	});

	// Calculate price based on selections
	const calculatePrice = (size, greensName, qty) => {
		let basePrice = BASE_PRICES[size] || 0;
		let greensPrice = 0;

		const greens = GREENS_OPTIONS.find(g => g.name === greensName);
		if (greens) {
			greensPrice = greens.price[size] || 0;
		}

		return (basePrice + greensPrice) * qty;
	};

	// Handle size change
	const handleSizeChange = (value) => {
		const newPrice = calculatePrice(value, selectedGreens, quantity);
		setCartItem({
			...cartItem,
			varient: value,
			prices: newPrice,
		});
	};

	// Handle greens change
	const handleGreensChange = (value) => {
		setSelectedGreens(value);
		const newPrice = calculatePrice(cartItem.varient, value, quantity);
		setCartItem({
			...cartItem,
			prices: newPrice,
		});
	};

	// Handle quantity increment
	const handleIncrement = () => {
		if (quantity < 10) {
			const newQty = quantity + 1;
			setQuantity(newQty);
			const newPrice = calculatePrice(cartItem.varient, selectedGreens, newQty);
			setCartItem({
				...cartItem,
				quantity: newQty,
				prices: newPrice,
			});
		}
	};

	// Handle quantity decrement
	const handleDecrement = () => {
		if (quantity > 1) {
			const newQty = quantity - 1;
			setQuantity(newQty);
			const newPrice = calculatePrice(cartItem.varient, selectedGreens, newQty);
			setCartItem({
				...cartItem,
				quantity: newQty,
				prices: newPrice,
			});
		}
	};

	// Create greens options for Select
	const greensOptions = GREENS_OPTIONS.map((g) => ({
		value: g.name,
		label: `${g.name} | +$${g.price[cartItem?.varient] || 0}`,
	}));

	// Create topping options for Select
	const toppingOptions = TOPPING_OPTIONS.map((t) => ({
		value: t,
		label: t,
	}));

	// Create dressing options for Select
	const dressingOptions = DRESSING_OPTIONS.map((d) => ({
		value: d,
		label: d,
	}));

	// Create protein options for Select
	const proteinOptions = PROTEIN_OPTIONS.map((p) => ({
		value: p,
		label: p,
	}));

	// Handle add to cart
	const handleAddToCart = () => {
		const description = `${selectedGreens}, ${selectedToppings.join(', ')}, ${selectedDressing}, ${selectedProtein}`;
		const newItem = {
			...cartItem,
			description,
			_id: nanoid(24),
		};
		dispatch(addToCart(newItem, quantity, cartItem.varient));
		alert("Added to Cart!");
	};

	return (
		<Flex justifyContent='center' width="100%" px={{ base: 2, md: 0 }}>
			{/* Global override for Ant Design Select to ensure rounded corners */}
			<style>
				{`
          .ant-select-selector {
            border-radius: 12px !important;
          }
        `}
			</style>
			<VStack margin={{ base: 3, md: 5 }} width="100%">
				<Box
					borderRadius={{ base: '20px', md: '25px' }}
					borderWidth='3px'
					borderColor='#22c55e'
					padding={{ base: '15px', md: '20px' }}
					width={{ base: '100%', md: '800px' }}
					bg="white"
					boxShadow="xl"
				>
					<Image
						src='https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800'
						borderTopRadius={{ base: '17px', md: '22px' }}
						width="100%"
						height={{ base: '180px', md: '300px' }}
						objectFit="cover"
						marginBottom={{ base: '15px', md: '20px' }}
					></Image>
					<Box padding={{ base: '0', md: '5px' }}>
						<Text fontSize={{ base: '2xl', md: '3xl' }} textAlign='center' fontWeight="bold" mb={{ base: 3, md: 5 }}>
							Build Your Own Bowl!
						</Text>
						<HStack mb={{ base: 3, md: 5 }} flexDirection={{ base: 'column', sm: 'row' }} gap={{ base: 2, sm: 0 }}>
							<Text fontSize={{ base: 'xl', md: '2xl' }} fontWeight="600">
								SIZE
							</Text>
							<Spacer />
							<Text fontSize={{ base: 'xl', md: '2xl' }} fontWeight="600" color="#22c55e">
								TOTAL: ${cartItem?.prices.toFixed(2)}
							</Text>
						</HStack>
						<HStack mb={{ base: 4, md: 6 }} justify="center" spacing={4}>
							<Button
								onClick={() => handleSizeChange('small')}
								borderRadius="full"
								w={{ base: '80px', md: '100px' }}
								h={{ base: '80px', md: '100px' }}
								bg={cartItem.varient === 'small' ? '#22c55e' : 'gray.100'}
								color={cartItem.varient === 'small' ? 'white' : 'gray.800'}
								_hover={{ bg: cartItem.varient === 'small' ? '#16a34a' : 'gray.200' }}
								flexDirection="column"
								p={2}
								boxShadow={cartItem.varient === 'small' ? 'lg' : 'none'}
							>
								<Text fontSize={{ base: 'sm', md: 'md' }} fontWeight="bold">Small</Text>
								<Text fontSize="xs">$8</Text>
							</Button>
							<Button
								onClick={() => handleSizeChange('medium')}
								borderRadius="full"
								w={{ base: '80px', md: '100px' }}
								h={{ base: '80px', md: '100px' }}
								bg={cartItem.varient === 'medium' ? '#22c55e' : 'gray.100'}
								color={cartItem.varient === 'medium' ? 'white' : 'gray.800'}
								_hover={{ bg: cartItem.varient === 'medium' ? '#16a34a' : 'gray.200' }}
								flexDirection="column"
								p={2}
								boxShadow={cartItem.varient === 'medium' ? 'lg' : 'none'}
							>
								<Text fontSize={{ base: 'sm', md: 'md' }} fontWeight="bold">Regular</Text>
								<Text fontSize="xs">$10</Text>
							</Button>
							<Button
								onClick={() => handleSizeChange('large')}
								borderRadius="full"
								w={{ base: '80px', md: '100px' }}
								h={{ base: '80px', md: '100px' }}
								bg={cartItem.varient === 'large' ? '#22c55e' : 'gray.100'}
								color={cartItem.varient === 'large' ? 'white' : 'gray.800'}
								_hover={{ bg: cartItem.varient === 'large' ? '#16a34a' : 'gray.200' }}
								flexDirection="column"
								p={2}
								boxShadow={cartItem.varient === 'large' ? 'lg' : 'none'}
							>
								<Text fontSize={{ base: 'sm', md: 'md' }} fontWeight="bold">Large</Text>
								<Text fontSize="xs">$12</Text>
							</Button>
						</HStack>

						<Text fontSize={{ base: 'lg', md: '2xl' }} mb={2}>
							Select your greens:
						</Text>
						<Select
							style={{ width: '100%', marginBottom: '20px', borderRadius: '12px' }}
							placeholder='Select greens'
							onChange={handleGreensChange}
							options={greensOptions}
							size="large"
						/>

						<Text fontSize={{ base: 'lg', md: '2xl' }} mb={2}>
							Select up to 4 toppings:
						</Text>
						<Select
							mode="multiple"
							onChange={(value) => {
								if (value?.length > 4) {
									alert('Cannot select more than 4 toppings');
									setSelectedToppings(value.slice(0, 4));
								} else {
									setSelectedToppings(value);
								}
							}}
							value={selectedToppings}
							maxTagCount={4}
							style={{ width: '100%', marginBottom: '20px', borderRadius: '12px' }}
							placeholder='Select up to 4 toppings'
							options={toppingOptions}
							size="large"
						/>

						<Text fontSize={{ base: 'lg', md: '2xl' }} mb={2}>
							Select your dressing:
						</Text>
						<Select
							style={{ width: '100%', marginBottom: '20px', borderRadius: '12px' }}
							placeholder='Select a dressing'
							onChange={(value) => setSelectedDressing(value)}
							options={dressingOptions}
							size="large"
						/>

						<Text fontSize={{ base: 'lg', md: '2xl' }} mb={2}>
							Add protein (optional):
						</Text>
						<Select
							style={{ width: '100%', marginBottom: '20px', borderRadius: '12px' }}
							placeholder='Select a protein'
							onChange={(value) => setSelectedProtein(value)}
							options={proteinOptions}
							size="large"
						/>

						<Text fontSize={{ base: 'lg', md: '2xl' }} mb={2}>
							Quantity:
						</Text>
						<HStack spacing={4} mb={4} justify="center">
							<IconButton
								icon={<Minus size={20} weight="bold" />}
								onClick={handleDecrement}
								isDisabled={quantity <= 1}
								bg="gray.200"
								_hover={{ bg: 'gray.300' }}
								borderRadius="full"
								size="lg"
								aria-label="Decrease quantity"
							/>
							<Text fontSize="2xl" fontWeight="bold" minW="50px" textAlign="center">
								{quantity}
							</Text>
							<IconButton
								icon={<Plus size={20} weight="bold" />}
								onClick={handleIncrement}
								isDisabled={quantity >= 10}
								bg="#22c55e"
								color="white"
								_hover={{ bg: '#16a34a' }}
								borderRadius="full"
								size="lg"
								aria-label="Increase quantity"
							/>
						</HStack>

						<Button
							marginTop='15px'
							width='100%'
							backgroundColor='#22c55e'
							color='white'
							size="lg"
							_hover={{ bg: '#16a34a' }}
							onClick={handleAddToCart}
							isDisabled={!cartItem.varient || !selectedGreens}
						>
							Add to Cart
						</Button>
					</Box>
				</Box>
			</VStack>
		</Flex>
	);
}
