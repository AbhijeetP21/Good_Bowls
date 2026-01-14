/**
 * Modern Bowl Display Component
 * Hero section + animated bowl grid
 */
import React, { useEffect } from 'react';
import {
  Box,
  Container,
  SimpleGrid,
  Text,
  Heading,
  VStack,
  Button,
  Flex,
  Icon,
  HStack,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Leaf, ForkKnife, Star, Heart } from 'phosphor-react';
import { getAllBowls } from '../../actions/bowlActions';
import BowlCardModern from '../BowlCard/BowlCardModern';

const MotionBox = motion(Box);

// Hero Section
const HeroSection = () => (
  <Box
    position="relative"
    overflow="hidden"
    bg="linear-gradient(135deg, #22c55e 0%, #16a34a 50%, #15803d 100%)"
    py={{ base: 16, md: 24 }}
  >
    {/* Animated background shapes */}
    <MotionBox
      position="absolute"
      top="-20%"
      right="-10%"
      w="500px"
      h="500px"
      borderRadius="full"
      bg="whiteAlpha.100"
      animate={{
        scale: [1, 1.2, 1],
        rotate: [0, 180, 360],
      }}
      transition={{
        duration: 20,
        repeat: Infinity,
        ease: 'linear',
      }}
    />
    <MotionBox
      position="absolute"
      bottom="-30%"
      left="-5%"
      w="400px"
      h="400px"
      borderRadius="full"
      bg="whiteAlpha.100"
      animate={{
        scale: [1.2, 1, 1.2],
        rotate: [360, 180, 0],
      }}
      transition={{
        duration: 15,
        repeat: Infinity,
        ease: 'linear',
      }}
    />
    {/* Additional decorative element */}
    <MotionBox
      position="absolute"
      top="50%"
      left="50%"
      w="200px"
      h="200px"
      borderRadius="full"
      bg="whiteAlpha.50"
      animate={{
        x: ['-50%', '-40%', '-50%'],
        y: ['-50%', '-60%', '-50%'],
      }}
      transition={{
        duration: 8,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    />

    <Container maxW="container.xl" position="relative" zIndex={1}>
      <VStack spacing={8} textAlign="center">
        {/* Animated bowl icon */}
        <MotionBox
          animate={{
            y: [0, -15, 0],
            rotate: [0, 10, -10, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <Box
            bg="whiteAlpha.200"
            borderRadius="full"
            p={5}
            backdropFilter="blur(8px)"
            boxShadow="0 10px 40px rgba(0,0,0,0.2)"
          >
            <Leaf size={64} color="white" weight="fill" />
          </Box>
        </MotionBox>

        {/* Hero text */}
        <VStack spacing={4}>
          <MotionBox
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Text
              fontSize={{ base: 'sm', md: 'md' }}
              color="whiteAlpha.800"
              fontWeight="600"
              letterSpacing="wider"
              textTransform="uppercase"
            >
              San Francisco's Freshest Salad Bar
            </Text>
          </MotionBox>
          <MotionBox
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <Heading
              fontSize={{ base: '4xl', md: '6xl', lg: '7xl' }}
              fontWeight="900"
              color="white"
              textShadow="0 4px 30px rgba(0,0,0,0.3)"
              lineHeight="1.1"
            >
              Fresh Bowls,
              <br />
              <Text as="span" color="accent.300">
                Made Your Way
              </Text>
            </Heading>
          </MotionBox>
          <MotionBox
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Text
              fontSize={{ base: 'lg', md: 'xl' }}
              color="whiteAlpha.900"
              maxW="600px"
              lineHeight="tall"
            >
              Farm-fresh ingredients, hand-tossed salads, customized to perfection.
              Order online for pickup or delivery.
            </Text>
          </MotionBox>
        </VStack>

        {/* CTA Buttons */}
        <HStack spacing={4} flexWrap="wrap" justify="center">
          <MotionBox
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link to="/build-bowl">
              <Button
                size="lg"
                bg="white"
                color="brand.500"
                px={8}
                py={7}
                borderRadius="2xl"
                leftIcon={<ForkKnife size={24} weight="fill" />}
                boxShadow="0 10px 30px -10px rgba(0,0,0,0.3)"
                fontWeight="700"
                fontSize="lg"
                _hover={{
                  bg: 'gray.50',
                  transform: 'translateY(-2px)',
                  boxShadow: '0 15px 40px -15px rgba(0,0,0,0.4)',
                }}
              >
                Build Your Bowl
              </Button>
            </Link>
          </MotionBox>
          <MotionBox
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              size="lg"
              variant="outline"
              color="white"
              borderColor="white"
              borderWidth="2px"
              px={8}
              py={7}
              borderRadius="2xl"
              fontWeight="700"
              fontSize="lg"
              _hover={{
                bg: 'whiteAlpha.200',
              }}
              onClick={() => {
                document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              View Menu
            </Button>
          </MotionBox>
        </HStack>

        {/* Stats/Features */}
        <HStack
          spacing={{ base: 6, md: 12 }}
          pt={8}
          flexWrap="wrap"
          justify="center"
        >
          {[
            { icon: Leaf, text: 'Farm Fresh', subtext: 'Local Produce' },
            { icon: Star, text: '4.9 Rating', subtext: '2000+ Reviews' },
            { icon: Heart, text: 'Healthy', subtext: 'Nutritious' },
          ].map((feature, i) => (
            <MotionBox
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.6 + i * 0.1 }}
            >
              <VStack
                color="white"
                bg="whiteAlpha.150"
                px={6}
                py={4}
                borderRadius="2xl"
                backdropFilter="blur(4px)"
                border="1px solid"
                borderColor="whiteAlpha.200"
                minW="140px"
              >
                <Icon as={feature.icon} weight="fill" boxSize={6} />
                <Text fontSize="lg" fontWeight="800">
                  {feature.text}
                </Text>
                <Text fontSize="xs" color="whiteAlpha.800">
                  {feature.subtext}
                </Text>
              </VStack>
            </MotionBox>
          ))}
        </HStack>
      </VStack>
    </Container>
  </Box>
);



// Loading state
const LoadingState = () => (
  <Flex justify="center" align="center" minH="400px">
    <VStack spacing={4}>
      <MotionBox
        animate={{ rotate: 360 }}
        transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
      >
        <Leaf size={48} color="#22c55e" weight="fill" />
      </MotionBox>
      <Text color="gray.500" fontWeight="500">
        Loading fresh bowls...
      </Text>
    </VStack>
  </Flex>
);

// Error state
const ErrorState = () => (
  <Flex justify="center" align="center" minH="400px">
    <VStack spacing={4} textAlign="center">
      <Text fontSize="4xl">😔</Text>
      <Text fontSize="xl" fontWeight="600" color="gray.700">
        Oops! Something went wrong
      </Text>
      <Text color="gray.500">
        We couldn't load the bowls. Please try again later.
      </Text>
      <Button
        onClick={() => window.location.reload()}
        bg="brand.500"
        color="white"
        _hover={{ bg: 'brand.600' }}
      >
        Try Again
      </Button>
    </VStack>
  </Flex>
);

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 50, damping: 20 } }
};

export default function BowlDisplayModern() {
  const dispatch = useDispatch();
  const bowlstate = useSelector((state) => state.getAllBowls);
  const { bowls, error, loading } = bowlstate;

  useEffect(() => {
    dispatch(getAllBowls());
  }, [dispatch]);

  return (
    <>
      <HeroSection />

      <Container maxW="container.xl" py={10} id="menu">
        {/* Our Bowls Section Header */}
        <VStack spacing={2} mb={10} textAlign="center">
          <MotionBox
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Text
              fontSize="sm"
              color="brand.500"
              fontWeight="600"
              letterSpacing="wider"
              textTransform="uppercase"
            >
              Fresh & Healthy
            </Text>
          </MotionBox>
          <MotionBox
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Heading
              fontSize={{ base: '3xl', md: '4xl', lg: '5xl' }}
              fontWeight="800"
              color="gray.800"
              letterSpacing="tight"
            >
              Our Bowls
            </Heading>
          </MotionBox>
          <MotionBox
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Text
              fontSize={{ base: 'md', md: 'lg' }}
              color="gray.500"
              maxW="500px"
            >
              Handcrafted signature bowls made with farm-fresh ingredients
            </Text>
          </MotionBox>
        </VStack>

        {loading ? (
          <LoadingState />
        ) : error ? (
          <ErrorState />
        ) : (
          <SimpleGrid
            columns={{ base: 1, md: 2, lg: 3 }}
            spacing={8}
            as={motion.div}
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.1 }}
          >
            {bowls && bowls.map((bowl) => (
              <MotionBox
                key={bowl._id}
                variants={itemVariants}
                whileHover={{ y: -8, transition: { duration: 0.2 } }}
              >
                <BowlCardModern bowl={bowl} />
              </MotionBox>
            ))}
          </SimpleGrid>
        )}
      </Container>
    </>
  );
}
