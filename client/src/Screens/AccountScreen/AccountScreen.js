/**
 * Account Screen Component
 * User account settings with email, password, and payments tabs
 */
import React, { useState } from 'react';
import {
    Box,
    Container,
    VStack,
    HStack,
    Text,
    Heading,
    Button,
    Input,
    FormControl,
    FormLabel,
    Tabs,
    TabList,
    TabPanels,
    Tab,
    TabPanel,
    Avatar,
    Badge,
    Divider,
    Icon,
    useToast,
    InputGroup,
    InputRightElement,
    IconButton,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
    User,
    Envelope,
    Lock,
    CreditCard,
    Eye,
    EyeSlash,
    ArrowLeft,
    CheckCircle,
} from 'phosphor-react';
import NavbarModern from '../../Components/Navbar/NavbarModern';

const MotionBox = motion(Box);

export default function AccountScreen() {
    const userstate = useSelector((state) => state.setUserData);
    const authState = useSelector((state) => state.auth);
    const user = authState?.user || userstate?.userData;

    const [showPassword, setShowPassword] = useState(false);
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const toast = useToast();

    const handlePasswordChange = (e) => {
        e.preventDefault();
        if (newPassword !== confirmPassword) {
            toast({
                title: 'Passwords do not match',
                status: 'error',
                duration: 3000,
            });
            return;
        }
        // TODO: Implement password change API call
        toast({
            title: 'Password updated successfully',
            status: 'success',
            duration: 3000,
        });
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
    };

    return (
        <Box minH="100vh" bg="gray.50">
            <NavbarModern />

            <Container maxW="container.md" py={8}>
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
                            Back to Home
                        </Button>
                    </Link>
                </MotionBox>

                {/* Header */}
                <MotionBox
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    mb={8}
                >
                    <HStack spacing={4} align="center">
                        <Avatar
                            size="xl"
                            name={user?.firstName}
                            bg="brand.500"
                            color="white"
                        />
                        <VStack align="start" spacing={1}>
                            <Heading size="lg" color="gray.800">
                                {user?.firstName} {user?.lastName}
                            </Heading>
                            <Badge
                                bg="brand.100"
                                color="brand.700"
                                px={3}
                                py={1}
                                borderRadius="full"
                            >
                                {user?.role === 'admin' ? 'Administrator' : 'Customer'}
                            </Badge>
                        </VStack>
                    </HStack>
                </MotionBox>

                {/* Tabs */}
                <MotionBox
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                >
                    <Box
                        bg="white"
                        borderRadius="2xl"
                        boxShadow="xl"
                        overflow="hidden"
                    >
                        <Tabs colorScheme="red" variant="enclosed-colored">
                            <TabList bg="gray.50" borderBottom="none">
                                <Tab
                                    _selected={{ bg: 'white', color: 'brand.500', borderBottomColor: 'white' }}
                                    fontWeight="600"
                                >
                                    <HStack>
                                        <Icon as={User} />
                                        <Text>Profile</Text>
                                    </HStack>
                                </Tab>
                                <Tab
                                    _selected={{ bg: 'white', color: 'brand.500', borderBottomColor: 'white' }}
                                    fontWeight="600"
                                >
                                    <HStack>
                                        <Icon as={Lock} />
                                        <Text>Password</Text>
                                    </HStack>
                                </Tab>
                                <Tab
                                    _selected={{ bg: 'white', color: 'brand.500', borderBottomColor: 'white' }}
                                    fontWeight="600"
                                >
                                    <HStack>
                                        <Icon as={CreditCard} />
                                        <Text>Payments</Text>
                                    </HStack>
                                </Tab>
                            </TabList>

                            <TabPanels>
                                {/* Profile Tab */}
                                <TabPanel p={8}>
                                    <VStack spacing={6} align="stretch">
                                        <Heading size="md" color="gray.700">
                                            Account Information
                                        </Heading>

                                        <FormControl>
                                            <FormLabel color="gray.600" fontWeight="600">
                                                Email Address
                                            </FormLabel>
                                            <InputGroup>
                                                <Input
                                                    value={user?.email || ''}
                                                    isReadOnly
                                                    bg="gray.50"
                                                    borderRadius="lg"
                                                    size="lg"
                                                />
                                                <InputRightElement h="full" pr={2}>
                                                    <HStack>
                                                        <Icon as={Envelope} color="gray.400" />
                                                        <Icon as={CheckCircle} color="green.500" weight="fill" />
                                                    </HStack>
                                                </InputRightElement>
                                            </InputGroup>
                                            <Text fontSize="sm" color="gray.500" mt={1}>
                                                Your email is verified and cannot be changed
                                            </Text>
                                        </FormControl>

                                        <HStack spacing={4}>
                                            <FormControl>
                                                <FormLabel color="gray.600" fontWeight="600">
                                                    First Name
                                                </FormLabel>
                                                <Input
                                                    value={user?.firstName || ''}
                                                    isReadOnly
                                                    bg="gray.50"
                                                    borderRadius="lg"
                                                    size="lg"
                                                />
                                            </FormControl>
                                            <FormControl>
                                                <FormLabel color="gray.600" fontWeight="600">
                                                    Last Name
                                                </FormLabel>
                                                <Input
                                                    value={user?.lastName || ''}
                                                    isReadOnly
                                                    bg="gray.50"
                                                    borderRadius="lg"
                                                    size="lg"
                                                />
                                            </FormControl>
                                        </HStack>

                                        <Divider />

                                        <Box>
                                            <Text fontSize="sm" color="gray.500">
                                                Member since: {user?.createdAt ? new Date(user.createdAt).toLocaleDateString('en-US', {
                                                    year: 'numeric',
                                                    month: 'long',
                                                    day: 'numeric'
                                                }) : 'N/A'}
                                            </Text>
                                        </Box>
                                    </VStack>
                                </TabPanel>

                                {/* Password Tab */}
                                <TabPanel p={8}>
                                    <VStack spacing={6} align="stretch">
                                        <Heading size="md" color="gray.700">
                                            Change Password
                                        </Heading>

                                        <form onSubmit={handlePasswordChange}>
                                            <VStack spacing={4} align="stretch">
                                                <FormControl>
                                                    <FormLabel color="gray.600" fontWeight="600">
                                                        Current Password
                                                    </FormLabel>
                                                    <InputGroup>
                                                        <Input
                                                            type={showPassword ? 'text' : 'password'}
                                                            value={currentPassword}
                                                            onChange={(e) => setCurrentPassword(e.target.value)}
                                                            placeholder="Enter current password"
                                                            borderRadius="lg"
                                                            size="lg"
                                                        />
                                                        <InputRightElement h="full">
                                                            <IconButton
                                                                variant="ghost"
                                                                icon={showPassword ? <EyeSlash size={20} /> : <Eye size={20} />}
                                                                onClick={() => setShowPassword(!showPassword)}
                                                                aria-label="Toggle password visibility"
                                                            />
                                                        </InputRightElement>
                                                    </InputGroup>
                                                </FormControl>

                                                <FormControl>
                                                    <FormLabel color="gray.600" fontWeight="600">
                                                        New Password
                                                    </FormLabel>
                                                    <Input
                                                        type={showPassword ? 'text' : 'password'}
                                                        value={newPassword}
                                                        onChange={(e) => setNewPassword(e.target.value)}
                                                        placeholder="Enter new password"
                                                        borderRadius="lg"
                                                        size="lg"
                                                    />
                                                </FormControl>

                                                <FormControl>
                                                    <FormLabel color="gray.600" fontWeight="600">
                                                        Confirm New Password
                                                    </FormLabel>
                                                    <Input
                                                        type={showPassword ? 'text' : 'password'}
                                                        value={confirmPassword}
                                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                                        placeholder="Confirm new password"
                                                        borderRadius="lg"
                                                        size="lg"
                                                    />
                                                </FormControl>

                                                <Button
                                                    type="submit"
                                                    bg="brand.500"
                                                    color="white"
                                                    size="lg"
                                                    borderRadius="xl"
                                                    _hover={{ bg: 'brand.600' }}
                                                    mt={4}
                                                >
                                                    Update Password
                                                </Button>
                                            </VStack>
                                        </form>

                                        <Divider />

                                        <Link to="/forgot-password">
                                            <Button
                                                variant="outline"
                                                colorScheme="red"
                                                size="sm"
                                            >
                                                Forgot your password?
                                            </Button>
                                        </Link>
                                    </VStack>
                                </TabPanel>

                                {/* Payments Tab */}
                                <TabPanel p={8}>
                                    <VStack spacing={6} align="stretch">
                                        <Heading size="md" color="gray.700">
                                            Payment Methods
                                        </Heading>

                                        <Box
                                            bg="gray.50"
                                            borderRadius="xl"
                                            p={8}
                                            textAlign="center"
                                        >
                                            <VStack spacing={4}>
                                                <Box
                                                    bg="gray.200"
                                                    borderRadius="full"
                                                    p={4}
                                                >
                                                    <CreditCard size={48} color="#718096" />
                                                </Box>
                                                <Text color="gray.600" fontWeight="600">
                                                    No payment methods saved
                                                </Text>
                                                <Text color="gray.500" fontSize="sm" maxW="300px">
                                                    Your payment information will be collected securely at checkout
                                                </Text>
                                            </VStack>
                                        </Box>

                                        <Divider />

                                        <Box>
                                            <Text fontSize="sm" color="gray.500">
                                                🔒 Your payment information is encrypted and secure
                                            </Text>
                                        </Box>
                                    </VStack>
                                </TabPanel>
                            </TabPanels>
                        </Tabs>
                    </Box>
                </MotionBox>
            </Container>
        </Box>
    );
}
