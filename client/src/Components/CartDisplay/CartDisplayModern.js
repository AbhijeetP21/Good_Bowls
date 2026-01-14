/**
 * Modern Cart Display Component
 * Beautiful, animated shopping cart with Chakra UI
 */
import React from 'react';
import {
  Box,
  Container,
  Flex,
  VStack,
  HStack,
  Text,
  Heading,
  Image,
  Button,
  IconButton,
  Badge,
  Divider,
  useToast,
} from '@chakra-ui/react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  Trash,
  Plus,
  Minus,
  ShoppingCart,
  ArrowLeft,
  Receipt,
  Leaf,
} from 'phosphor-react';
import { addToCart, deleteFromCart } from '../../actions/cartActions';
import StripeDeployment from '../Checkout/StripeDeployment';

const MotionBox = motion(Box);

// Map legacy bowl names to display names
const BOWL_NAME_MAP = {
  'Margherita': 'Mediterranean Bowl',
  'Pepperoni': 'Protein Power Bowl',
  'Farmhouse': 'Garden Fresh Bowl',
  'BBQ Chicken': 'BBQ Ranch Bowl',
  'Veggie Supreme': 'Veggie Delight Bowl',
  'Hawaiian': 'Tropical Bowl',
  'Meat Lovers': 'Carnivore Bowl',
  'Four Cheese': 'Cheese Lovers Bowl',
};

// Fallback salad bowl images
const SALAD_IMAGES = [
  'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800', // Colorful salad
  'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800', // Buddha bowl
  'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=800', // Mixed salad
  'https://images.unsplash.com/photo-1607532941433-304659e8198a?w=800', // Green salad
  'https://images.unsplash.com/photo-1623428187969-5da2dcea5ebf?w=800', // Grain bowl
  'https://images.unsplash.com/photo-1505576399279-565b52d4ac71?w=800', // Fresh bowl
];

// Empty cart state
const EmptyCart = () => (
  <MotionBox
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.5 }}
    textAlign="center"
    py={20}
  >
    <VStack spacing={6}>
      <MotionBox
        animate={{
          y: [0, -10, 0],
          rotate: [0, 5, -5, 0],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        <Box
          bg="brand.100"
          borderRadius="full"
          p={6}
        >
          <ShoppingCart size={64} color="#22c55e" weight="duotone" />
        </Box>
      </MotionBox>
      <VStack spacing={2}>
        <Heading size="lg" color="gray.700">
          Your cart is empty
        </Heading>
        <Text color="gray.500" maxW="300px">
          Looks like you haven't added any fresh bowls yet!
        </Text>
      </VStack>
      <Link to="/home">
        <Button
          bg="brand.500"
          color="white"
          size="lg"
          leftIcon={<Leaf size={20} weight="fill" />}
          _hover={{ bg: 'brand.600', transform: 'translateY(-2px)' }}
          _active={{ bg: 'brand.700' }}
        >
          Browse Bowls
        </Button>
      </Link>
    </VStack>
  </MotionBox>
);

// Cart item component
const CartItem = ({ item, index, onUpdateQuantity, onRemove }) => {
  const toast = useToast();

  // Calculate unit price from total price and quantity
  const unitPrice = item.quantity > 0 ? (item.price / item.quantity) : item.price;
  const lineTotal = item.price;

  const handleIncrement = () => {
    if (item.quantity < 10) {
      onUpdateQuantity(item, item.quantity + 1, unitPrice);
    } else {
      toast({
        title: 'Maximum quantity reached',
        description: 'You can add up to 10 of each item',
        status: 'warning',
        duration: 2000,
      });
    }
  };

  const handleDecrement = () => {
    if (item.quantity > 1) {
      onUpdateQuantity(item, item.quantity - 1, unitPrice);
    }
  };

  return (
    <MotionBox
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20, height: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      bg="white"
      borderRadius="xl"
      p={4}
      boxShadow="md"
      _hover={{ boxShadow: 'lg' }}
    >
      <Flex gap={4} align="center" flexWrap={{ base: 'wrap', md: 'nowrap' }}>
        {/* Image */}
        <Box
          borderRadius="lg"
          overflow="hidden"
          flexShrink={0}
        >
          <Image
            src={item.name === 'Build Your Own Bowl' ? item.image : SALAD_IMAGES[item.name.length % SALAD_IMAGES.length]}
            alt={item.name}
            w={{ base: '80px', md: '100px' }}
            h={{ base: '80px', md: '100px' }}
            objectFit="cover"
          />
        </Box>

        {/* Details */}
        <VStack align="start" flex={1} spacing={1}>
          <Text fontWeight="700" fontSize="lg" color="gray.800">
            {BOWL_NAME_MAP[item.name] || item.name}
          </Text>
          <HStack spacing={2}>
            <Badge
              bg="brand.100"
              color="brand.700"
              borderRadius="full"
              px={2}
              textTransform="capitalize"
            >
              {item.varient}
            </Badge>
          </HStack>
          {item.description && (
            <Text fontSize="sm" color="gray.500" noOfLines={1}>
              {item.description}
            </Text>
          )}
        </VStack>

        {/* Quantity Controls */}
        <HStack
          bg="gray.100"
          borderRadius="full"
          p={1}
        >
          <IconButton
            icon={<Minus size={16} weight="bold" />}
            size="sm"
            variant="ghost"
            borderRadius="full"
            onClick={handleDecrement}
            isDisabled={item.quantity <= 1}
            _hover={{ bg: 'gray.200' }}
          />
          <Text
            fontWeight="700"
            minW="30px"
            textAlign="center"
          >
            {item.quantity}
          </Text>
          <IconButton
            icon={<Plus size={16} weight="bold" />}
            size="sm"
            variant="ghost"
            borderRadius="full"
            onClick={handleIncrement}
            _hover={{ bg: 'gray.200' }}
          />
        </HStack>

        {/* Price */}
        <VStack spacing={0} minW="80px" align="end">
          <Text
            fontWeight="800"
            fontSize="xl"
            color="brand.500"
          >
            ${lineTotal.toFixed(2)}
          </Text>
          {item.quantity > 1 && (
            <Text fontSize="xs" color="gray.500">
              ${unitPrice.toFixed(2)} each
            </Text>
          )}
        </VStack>

        {/* Remove Button */}
        <IconButton
          icon={<Trash size={20} weight="bold" />}
          variant="ghost"
          colorScheme="red"
          borderRadius="full"
          onClick={() => onRemove(item)}
          _hover={{ bg: 'red.100' }}
        />
      </Flex>
    </MotionBox>
  );
};

// Order summary component
const OrderSummary = ({ subtotal, itemCount }) => (
  <MotionBox
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: 0.2 }}
  >
    <Box
      bg="white"
      borderRadius="2xl"
      p={6}
      boxShadow="xl"
      position="sticky"
      top="100px"
    >
      <VStack align="stretch" spacing={4}>
        <HStack justify="space-between">
          <Heading size="md" color="gray.800">
            Order Summary
          </Heading>
          <Receipt size={24} color="#ff6b6b" weight="duotone" />
        </HStack>

        <Divider />

        <HStack justify="space-between">
          <Text color="gray.600">Items ({itemCount})</Text>
          <Text fontWeight="600">${subtotal}</Text>
        </HStack>

        <HStack justify="space-between">
          <Text color="gray.600">Delivery</Text>
          <Badge colorScheme="green" borderRadius="full">
            FREE
          </Badge>
        </HStack>

        <Divider />

        <HStack justify="space-between">
          <Text fontWeight="700" fontSize="lg">
            Total
          </Text>
          <Text fontWeight="800" fontSize="2xl" color="brand.500">
            ${subtotal}
          </Text>
        </HStack>

        <StripeDeployment subtotal={subtotal} />

        Secure checkout powered by Stripe
      </VStack>
    </Box>
  </MotionBox>
);

export default function CartDisplayModern() {
  const dispatch = useDispatch();
  const cartstate = useSelector((state) => state.cart);
  const cartItems = cartstate?.cartItems || [];

  const subtotal = cartItems.reduce((acc, item) => acc + (item.price || 0), 0);

  const handleUpdateQuantity = (item, newQuantity, unitPrice) => {
    // Create a modified item with the original prices structure for addToCart
    const updatedItem = {
      ...item,
      prices: item.name === 'Build Your Own Bowl'
        ? unitPrice * newQuantity // Custom bowl uses flat price
        : { 0: { [item.varient]: unitPrice } }, // Regular bowl needs prices object
    };
    dispatch(addToCart(updatedItem, newQuantity, item.varient));
  };

  const handleRemove = (item) => {
    dispatch(deleteFromCart(item));
  };

  if (cartItems.length === 0) {
    return (
      <Container maxW="container.xl" py={8}>
        <EmptyCart />
      </Container>
    );
  }

  return (
    <Container maxW="container.xl" py={8}>
      {/* Back link */}
      <MotionBox
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        mb={6}
      >
        <Link to="/home">
          <Button
            variant="ghost"
            leftIcon={<ArrowLeft size={20} />}
            color="gray.600"
            _hover={{ color: 'brand.500' }}
          >
            Continue Shopping
          </Button>
        </Link>
      </MotionBox>

      {/* Header */}
      <MotionBox
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        mb={8}
      >
        <HStack spacing={3}>
          <ShoppingCart size={32} color="#ff6b6b" weight="fill" />
          <Heading size="xl" color="gray.800">
            Your Cart
          </Heading>
          <Badge
            bg="brand.500"
            color="white"
            borderRadius="full"
            px={3}
            py={1}
            fontSize="md"
          >
            {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'}
          </Badge>
        </HStack>
      </MotionBox>

      {/* Cart content */}
      <Flex
        gap={8}
        direction={{ base: 'column', lg: 'row' }}
        align="flex-start"
      >
        {/* Cart items */}
        <VStack flex={1} spacing={4} align="stretch" w="full">
          <AnimatePresence>
            {cartItems.map((item, index) => (
              <CartItem
                key={item._id}
                item={item}
                index={index}
                onUpdateQuantity={handleUpdateQuantity}
                onRemove={handleRemove}
              />
            ))}
          </AnimatePresence>
        </VStack>

        {/* Order summary */}
        <Box w={{ base: 'full', lg: '350px' }} flexShrink={0}>
          <OrderSummary subtotal={subtotal} itemCount={cartItems.length} />
        </Box>
      </Flex>
    </Container>
  );
}
