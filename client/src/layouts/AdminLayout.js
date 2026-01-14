/**
 * Admin Layout
 * Layout wrapper for admin pages
 */
import React from 'react';
import { Outlet, Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Flex,
  VStack,
  HStack,
  Link,
  Text,
  Icon,
  useColorModeValue,
} from '@chakra-ui/react';
import {
  House,
  Pizza,
  Users,
  Package,
  Hamburger,
  Leaf,
  SignOut,
} from 'phosphor-react';

const NavItem = ({ icon, children, to, ...rest }) => {
  const hoverBg = useColorModeValue('orange.100', 'orange.700');
  const activeBg = useColorModeValue('orange.200', 'orange.600');

  return (
    <Link
      as={RouterLink}
      to={to}
      style={{ textDecoration: 'none' }}
      _focus={{ boxShadow: 'none' }}
    >
      <Flex
        align="center"
        p="3"
        mx="2"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{
          bg: hoverBg,
        }}
        {...rest}
      >
        {icon && (
          <Icon
            mr="3"
            fontSize="20"
            as={icon}
            weight="fill"
          />
        )}
        <Text fontSize="sm" fontWeight="medium">
          {children}
        </Text>
      </Flex>
    </Link>
  );
};

const AdminLayout = () => {
  const bgColor = useColorModeValue('white', 'gray.900');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  return (
    <Flex minH="100vh">
      {/* Sidebar */}
      <Box
        bg={bgColor}
        borderRight="1px"
        borderRightColor={borderColor}
        w={{ base: 'full', md: '240px' }}
        pos="fixed"
        h="full"
        display={{ base: 'none', md: 'block' }}
      >
        <Flex h="20" alignItems="center" mx="6" justifyContent="space-between">
          <Text fontSize="xl" fontWeight="bold" color="orange.500">
            🍕 Admin Panel
          </Text>
        </Flex>

        <VStack spacing="1" align="stretch" mt="4">
          <NavItem icon={House} to="/admin">
            Dashboard
          </NavItem>
          <NavItem icon={Pizza} to="/admin/pizzaslist">
            Pizzas
          </NavItem>
          <NavItem icon={Package} to="/admin/orderslist">
            Orders
          </NavItem>
          <NavItem icon={Users} to="/admin/userslist">
            Users
          </NavItem>
          <NavItem icon={Hamburger} to="/admin/baseslist">
            Bases
          </NavItem>
          <NavItem icon={Leaf} to="/admin/toppingslist">
            Toppings
          </NavItem>
        </VStack>

        <Box position="absolute" bottom="4" left="0" right="0" px="4">
          <HStack
            as="button"
            w="full"
            p="3"
            borderRadius="lg"
            onClick={handleLogout}
            _hover={{ bg: 'red.100' }}
            color="red.500"
          >
            <Icon as={SignOut} weight="fill" />
            <Text fontSize="sm" fontWeight="medium">
              Logout
            </Text>
          </HStack>
          <Link as={RouterLink} to="/home">
            <Text fontSize="sm" color="gray.500" textAlign="center" mt="2">
              ← Back to Store
            </Text>
          </Link>
        </Box>
      </Box>

      {/* Main content */}
      <Box ml={{ base: 0, md: '240px' }} w="full">
        <Box as="main" p="6">
          <Outlet />
        </Box>
      </Box>
    </Flex>
  );
};

export default AdminLayout;
