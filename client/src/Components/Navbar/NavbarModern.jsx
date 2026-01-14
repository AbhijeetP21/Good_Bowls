/**
 * Modern Navbar Component
 * Animated, responsive navigation with Chakra UI
 */
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  Box,
  Flex,
  HStack,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  Stack,
  Text,
  Badge,
  Avatar,
  Container,
} from '@chakra-ui/react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  List,
  X,
  Leaf,
  ShoppingCart,
  User,
  SignOut,
  Receipt,
  House,
  ForkKnife,
} from 'phosphor-react';

const MotionBox = motion(Box);
const MotionFlex = motion(Flex);

// Nav link component with hover animation
const NavLink = ({ to, children, icon: Icon }) => (
  <RouterLink to={to}>
    <MotionBox
      px={4}
      py={2}
      rounded="lg"
      display="flex"
      alignItems="center"
      gap={2}
      color="white"
      fontWeight="500"
      whileHover={{
        backgroundColor: 'rgba(255, 255, 255, 0.15)',
        scale: 1.05,
      }}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.2 }}
      cursor="pointer"
    >
      {Icon && <Icon size={20} weight="bold" />}
      {children}
    </MotionBox>
  </RouterLink>
);

export default function NavbarModern() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cartstate = useSelector((state) => state.cart);
  const userstate = useSelector((state) => state.setUserData);
  const user = userstate?.userData;

  const cartItemCount = cartstate?.cartItems?.length || 0;

  const handleLogout = () => {
    localStorage.removeItem('cartItems');
    localStorage.removeItem('token');
    window.location.replace('/');
  };

  return (
    <Box
      position="sticky"
      top={0}
      zIndex={100}
      bg="linear-gradient(135deg, #22c55e 0%, #16a34a 50%, #15803d 100%)"
      boxShadow="0 4px 20px rgba(34, 197, 94, 0.3)"
    >
      <Container maxW="container.xl">
        <Flex h={16} alignItems="center" justifyContent="space-between">
          {/* Logo */}
          <RouterLink to="/home">
            <MotionFlex
              alignItems="center"
              gap={2}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <MotionBox
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
              >
                <Leaf size={32} color="white" weight="fill" />
              </MotionBox>
              <Text
                fontSize="xl"
                fontWeight="800"
                color="white"
                letterSpacing="tight"
                textShadow="0 2px 4px rgba(0,0,0,0.2)"
              >
                GOOD BOWL
              </Text>
            </MotionFlex>
          </RouterLink>

          {/* Desktop Nav */}
          <HStack spacing={2} display={{ base: 'none', md: 'flex' }}>
            <NavLink to="/home" icon={House}>Home</NavLink>
            <NavLink to="/build-bowl" icon={ForkKnife}>Build Your Bowl</NavLink>
          </HStack>

          {/* Right side - Cart & User */}
          <HStack spacing={4}>
            {/* Cart Button */}
            <RouterLink to="/cart">
              <MotionBox
                position="relative"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <IconButton
                  icon={<ShoppingCart size={24} weight="bold" />}
                  variant="ghost"
                  color="white"
                  aria-label="Cart"
                  _hover={{ bg: 'whiteAlpha.200' }}
                />
                {cartItemCount > 0 && (
                  <MotionBox
                    position="absolute"
                    top="-2px"
                    right="-2px"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 500, damping: 15 }}
                  >
                    <Badge
                      bg="accent.500"
                      color="gray.900"
                      borderRadius="full"
                      px={2}
                      py={0.5}
                      fontSize="xs"
                      fontWeight="bold"
                      boxShadow="0 2px 8px rgba(0,0,0,0.2)"
                    >
                      {cartItemCount}
                    </Badge>
                  </MotionBox>
                )}
              </MotionBox>
            </RouterLink>

            {/* User Menu */}
            {user && user?.email ? (
              <Menu>
                <MenuButton
                  as={Button}
                  variant="ghost"
                  _hover={{ bg: 'whiteAlpha.200' }}
                  _active={{ bg: 'whiteAlpha.300' }}
                >
                  <HStack spacing={2}>
                    <Avatar
                      size="sm"
                      name={user?.firstName}
                      bg="accent.500"
                      color="gray.900"
                    />
                    <Text
                      color="white"
                      fontWeight="600"
                      display={{ base: 'none', md: 'block' }}
                    >
                      {user?.firstName}
                    </Text>
                  </HStack>
                </MenuButton>
                <MenuList
                  bg="white"
                  borderColor="gray.200"
                  boxShadow="xl"
                  py={2}
                  borderRadius="xl"
                >
                  <MenuItem
                    as={RouterLink}
                    to="/account"
                    icon={<User size={18} />}
                    _hover={{ bg: 'brand.50', color: 'brand.600' }}
                  >
                    My Account
                  </MenuItem>
                  <MenuItem
                    as={RouterLink}
                    to="/myorders"
                    icon={<Receipt size={18} />}
                    _hover={{ bg: 'brand.50', color: 'brand.600' }}
                  >
                    My Orders
                  </MenuItem>
                  {user?.isAdmin && (
                    <>
                      <MenuDivider />
                      <MenuItem
                        as={RouterLink}
                        to="/admin"
                        icon={<ForkKnife size={18} />}
                        _hover={{ bg: 'brand.50', color: 'brand.600' }}
                      >
                        Admin Panel
                      </MenuItem>
                    </>
                  )}
                  <MenuDivider />
                  <MenuItem
                    icon={<SignOut size={18} />}
                    onClick={handleLogout}
                    _hover={{ bg: 'red.50', color: 'red.600' }}
                  >
                    Logout
                  </MenuItem>
                </MenuList>
              </Menu>
            ) : (
              <RouterLink to="/login">
                <Button
                  variant="outline"
                  color="white"
                  borderColor="white"
                  _hover={{
                    bg: 'white',
                    color: 'brand.500',
                  }}
                  leftIcon={<User size={18} weight="bold" />}
                  size="sm"
                >
                  Login
                </Button>
              </RouterLink>
            )}

            {/* Mobile menu button */}
            <IconButton
              display={{ base: 'flex', md: 'none' }}
              onClick={isOpen ? onClose : onOpen}
              icon={isOpen ? <X size={24} /> : <List size={24} />}
              variant="ghost"
              color="white"
              aria-label="Toggle Navigation"
              _hover={{ bg: 'whiteAlpha.200' }}
            />
          </HStack>
        </Flex>

        {/* Mobile Nav */}
        <AnimatePresence>
          {isOpen && (
            <MotionBox
              display={{ md: 'none' }}
              pb={4}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Stack spacing={2}>
                <NavLink to="/home" icon={House}>Home</NavLink>
                <NavLink to="/build-bowl" icon={ForkKnife}>Build Your Bowl</NavLink>
              </Stack>
            </MotionBox>
          )}
        </AnimatePresence>
      </Container>
    </Box>
  );
}
