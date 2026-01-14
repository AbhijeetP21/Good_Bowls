/**
 * Modern Bowl Card Component
 * Beautiful, animated bowl display with hover effects
 */
import React, { useState } from 'react';
import {
  Box,
  Image,
  Text,
  Button,
  Select,
  HStack,
  VStack,
  Badge,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Flex,
  Icon,
  useToast,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { ShoppingCart, Eye, Barbell, Leaf, Cookie, FlowerLotus } from 'phosphor-react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../actions/cartActions';

const MotionBox = motion(Box);

// Size labels with measurements
const SIZE_LABELS = {
  small: 'Small Bowl',
  medium: 'Regular Bowl',
  large: 'Large Bowl',
};

// Category configurations with colors and icons
const CATEGORY_CONFIG = {
  vegan: {
    label: 'Vegan',
    icon: FlowerLotus,
    bgColor: 'green.500',
    textColor: 'white',
  },
  vegetarian: {
    label: 'Vegetarian',
    icon: Leaf,
    bgColor: 'fresh.500',
    textColor: 'white',
  },
  'gluten-free': {
    label: 'Gluten-Free',
    icon: Cookie,
    bgColor: 'purple.500',
    textColor: 'white',
  },
  'protein-rich': {
    label: 'Protein-Rich',
    icon: Barbell,
    bgColor: 'orange.500',
    textColor: 'white',
  },
  'non-veg': {
    label: 'Protein-Rich',
    icon: Barbell,
    bgColor: 'orange.500',
    textColor: 'white',
  },
  // Legacy support for 'veg' category
  veg: {
    label: 'Vegetarian',
    icon: Leaf,
    bgColor: 'fresh.500',
    textColor: 'white',
  },
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

export default function BowlCardModern({ bowl, index = 0 }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [quantity, setQuantity] = useState(1);
  const [varient, setVarient] = useState('small');
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const dispatch = useDispatch();
  const toast = useToast();

  const handleAddToCart = () => {
    dispatch(addToCart(bowl, quantity, varient));
    toast({
      title: 'Added to cart!',
      description: `${BOWL_NAME_MAP[bowl.name] || bowl.name} (${varient}) x${quantity}`,
      status: 'success',
      duration: 2000,
      isClosable: true,
      position: 'bottom-right',
      icon: <ShoppingCart size={20} weight="fill" />,
    });
  };

  const price = bowl.prices[0][varient] * quantity;
  const categoryInfo = CATEGORY_CONFIG[bowl.category?.toLowerCase()] || CATEGORY_CONFIG['non-veg'];

  return (
    <>
      <MotionBox
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        whileHover={{ y: -8 }}
        bg="white"
        borderRadius="2xl"
        overflow="hidden"
        boxShadow="lg"
        maxW="sm"
        w="full"
        position="relative"
        _hover={{
          boxShadow: '0 20px 40px -15px rgba(34, 197, 94, 0.3)',
        }}
        style={{ transition: 'box-shadow 0.3s ease' }}
      >
        {/* Category Badge */}
        <Badge
          position="absolute"
          top={4}
          left={4}
          zIndex={2}
          bg={categoryInfo.bgColor}
          color={categoryInfo.textColor}
          px={3}
          py={1}
          borderRadius="full"
          fontSize="xs"
          fontWeight="bold"
          display="flex"
          alignItems="center"
          gap={1}
        >
          <Icon as={categoryInfo.icon} weight="fill" />
          {categoryInfo.label}
        </Badge>

        {/* Image Container */}
        <Box
          position="relative"
          overflow="hidden"
          cursor="pointer"
          onClick={onOpen}
        >
          <MotionBox
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.4 }}
          >
            <Image
              src={bowl.image || SALAD_IMAGES[index % SALAD_IMAGES.length]}
              alt={BOWL_NAME_MAP[bowl.name] || bowl.name}
              w="full"
              h="200px"
              objectFit="cover"
              onLoad={() => setIsImageLoaded(true)}
              opacity={isImageLoaded ? 1 : 0}
              transition="opacity 0.3s"
            />
          </MotionBox>

          {/* View Details Overlay */}
          <MotionBox
            position="absolute"
            top={0}
            left={0}
            right={0}
            bottom={0}
            bg="blackAlpha.600"
            display="flex"
            alignItems="center"
            justifyContent="center"
            opacity={0}
            whileHover={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <HStack color="white" fontWeight="bold">
              <Eye size={24} />
              <Text>View Details</Text>
            </HStack>
          </MotionBox>
        </Box>

        {/* Content */}
        <VStack p={5} spacing={4} align="stretch">
          {/* Title */}
          <Text
            fontSize="xl"
            fontWeight="700"
            color="gray.800"
            noOfLines={1}
          >
            {BOWL_NAME_MAP[bowl.name] || bowl.name}
          </Text>

          {/* Description */}
          <Text
            fontSize="sm"
            color="gray.500"
            noOfLines={2}
            minH="40px"
          >
            {bowl.description}
          </Text>

          {/* Selectors */}
          <HStack spacing={3}>
            <Box flex={1}>
              <Text fontSize="xs" color="gray.500" mb={1} fontWeight="600">
                SIZE
              </Text>
              <Select
                size="sm"
                value={varient}
                onChange={(e) => setVarient(e.target.value)}
                borderRadius="lg"
                bg="gray.50"
                borderColor="gray.200"
                _hover={{ borderColor: 'brand.300' }}
                _focus={{ borderColor: 'brand.500', boxShadow: '0 0 0 1px #22c55e' }}
              >
                {bowl.varients.map((v) => (
                  <option key={v} value={v}>
                    {SIZE_LABELS[v] || v.charAt(0).toUpperCase() + v.slice(1)}
                  </option>
                ))}
              </Select>
            </Box>
            <Box flex={1}>
              <Text fontSize="xs" color="gray.500" mb={1} fontWeight="600">
                QTY
              </Text>
              <Select
                size="sm"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                borderRadius="lg"
                bg="gray.50"
                borderColor="gray.200"
                _hover={{ borderColor: 'brand.300' }}
                _focus={{ borderColor: 'brand.500', boxShadow: '0 0 0 1px #22c55e' }}
              >
                {[...Array(10).keys()].map((i) => (
                  <option key={i} value={i + 1}>
                    {i + 1}
                  </option>
                ))}
              </Select>
            </Box>
          </HStack>

          {/* Price & Add to Cart */}
          <Flex justify="space-between" align="center" pt={2}>
            <Box>
              <Text fontSize="xs" color="gray.400">
                Total
              </Text>
              <Text fontSize="2xl" fontWeight="800" color="brand.500">
                ${price}
              </Text>
            </Box>
            <MotionBox whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                bg="brand.500"
                color="white"
                size="md"
                px={6}
                borderRadius="xl"
                leftIcon={<ShoppingCart size={18} weight="bold" />}
                _hover={{
                  bg: 'brand.600',
                  boxShadow: '0 8px 20px -8px rgba(34, 197, 94, 0.5)',
                }}
                _active={{ bg: 'brand.700' }}
                onClick={handleAddToCart}
              >
                Add
              </Button>
            </MotionBox>
          </Flex>
        </VStack>
      </MotionBox>

      {/* Details Modal */}
      <Modal isOpen={isOpen} onClose={onClose} size="lg" isCentered>
        <ModalOverlay bg="blackAlpha.700" backdropFilter="blur(8px)" />
        <ModalContent borderRadius="2xl" overflow="hidden" mx={4}>
          <ModalCloseButton
            bg="white"
            borderRadius="full"
            top={4}
            right={4}
            zIndex={10}
          />
          <Image
            src={bowl.image || SALAD_IMAGES[index % SALAD_IMAGES.length]}
            alt={BOWL_NAME_MAP[bowl.name] || bowl.name}
            w="full"
            h="250px"
            objectFit="cover"
          />
          <ModalHeader pb={2}>
            <HStack justify="space-between" align="start">
              <VStack align="start" spacing={1}>
                <Text fontSize="2xl" fontWeight="800">
                  {BOWL_NAME_MAP[bowl.name] || bowl.name}
                </Text>
                <Badge
                  bg={categoryInfo.bgColor === 'fresh.500' ? 'fresh.100' :
                    categoryInfo.bgColor === 'green.500' ? 'green.100' :
                      categoryInfo.bgColor === 'purple.500' ? 'purple.100' : 'brand.100'}
                  color={categoryInfo.bgColor === 'fresh.500' ? 'fresh.700' :
                    categoryInfo.bgColor === 'green.500' ? 'green.700' :
                      categoryInfo.bgColor === 'purple.500' ? 'purple.700' : 'brand.700'}
                  px={3}
                  py={1}
                  borderRadius="full"
                  display="flex"
                  alignItems="center"
                  gap={1}
                >
                  <Icon as={categoryInfo.icon} weight="fill" size={14} />
                  {categoryInfo.label}
                </Badge>
              </VStack>
              <Text fontSize="2xl" fontWeight="800" color="brand.500">
                ${bowl.prices[0]['small']}+
              </Text>
            </HStack>
          </ModalHeader>
          <ModalBody pb={6}>
            <Text color="gray.600" fontSize="md" lineHeight="tall">
              {bowl.description}
            </Text>
            <HStack mt={4} spacing={4}>
              <Box>
                <Text fontSize="xs" color="gray.400" fontWeight="600">
                  SMALL
                </Text>
                <Text fontWeight="bold">${bowl.prices[0]['small']}</Text>
              </Box>
              <Box>
                <Text fontSize="xs" color="gray.400" fontWeight="600">
                  REGULAR
                </Text>
                <Text fontWeight="bold">${bowl.prices[0]['medium']}</Text>
              </Box>
              <Box>
                <Text fontSize="xs" color="gray.400" fontWeight="600">
                  LARGE
                </Text>
                <Text fontWeight="bold">${bowl.prices[0]['large']}</Text>
              </Box>
            </HStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
