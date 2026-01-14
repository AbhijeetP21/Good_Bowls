
import {
	Box,
	Button,
	Flex,
	Heading,
	HStack,
	Icon,
	Menu,
	MenuButton,
	MenuItem,
	MenuList,
	Container,
	useColorModeValue
} from '@chakra-ui/react';
import {
	Users,
	Receipt,
	Pizza,
	PlusCircle,
	SignOut,
	CaretDown,
	Cookie
} from 'phosphor-react';
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function AdminScreen() {
	const location = useLocation();
	const bgColor = useColorModeValue('white', 'gray.800');
	const borderColor = useColorModeValue('gray.200', 'gray.700');

	function handleLogout() {
		localStorage.removeItem('user');
		localStorage.removeItem('token');
		window.location.replace('/');
	}

	const isActive = (path) => location.pathname === path;

	const NavItem = ({ to, icon, children }) => {
		const active = isActive(to);
		return (
			<Link to={to}>
				<Button
					variant={active ? "solid" : "ghost"}
					colorScheme="brand"
					leftIcon={<Icon as={icon} weight={active ? "fill" : "regular"} />}
					size="sm"
					bg={active ? "brand.500" : "transparent"}
					color={active ? "white" : "gray.600"}
					_hover={{ bg: active ? "brand.600" : "gray.100" }}
				>
					{children}
				</Button>
			</Link>
		);
	};

	return (
		<Box bg={bgColor} borderBottom="1px" borderColor={borderColor} mb={8} px={4} py={3} shadow="sm">
			<Container maxW="container.xl">
				<Flex alignItems="center" justifyContent="space-between">
					{/* Brand / Title */}
					<HStack spacing={4}>
						<Link to="/admin">
							<Heading size="md" color="brand.500" fontFamily="Lobster">Good Bowl Admin</Heading>
						</Link>
					</HStack>

					{/* Desktop Navigation */}
					<HStack spacing={2} display={{ base: 'none', lg: 'flex' }}>
						<NavItem to="/admin/userslist" icon={Users}>Users</NavItem>
						<NavItem to="/admin/orderslist" icon={Receipt}>Orders</NavItem>
						<NavItem to="/admin/bowlslist" icon={Pizza}>Bowls</NavItem>
						<NavItem to="/admin/addbowl" icon={PlusCircle}>Add Bowl</NavItem>

						{/* Dropdown for Extras */}
						<Menu>
							<MenuButton as={Button} size="sm" variant="ghost" rightIcon={<CaretDown />}>
								Extras
							</MenuButton>
							<MenuList>
								<Link to="/admin/baseslist"><MenuItem icon={<Pizza size={18} />}>Bases</MenuItem></Link>
								<Link to="/admin/addbases"><MenuItem icon={<PlusCircle size={18} />}>Add Base</MenuItem></Link>
								<Link to="/admin/toppingslist"><MenuItem icon={<Cookie size={18} />}>Toppings</MenuItem></Link>
								<Link to="/admin/addtopping"><MenuItem icon={<PlusCircle size={18} />}>Add Topping</MenuItem></Link>
							</MenuList>
						</Menu>
					</HStack>

					{/* User / Logout */}
					<Button
						size="sm"
						colorScheme="red"
						variant="outline"
						leftIcon={<SignOut />}
						onClick={handleLogout}
					>
						Logout
					</Button>
				</Flex>
			</Container>
		</Box>
	);
}
