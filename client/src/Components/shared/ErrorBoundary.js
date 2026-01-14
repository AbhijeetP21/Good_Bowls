/**
 * Error Boundary Component
 * Catches JavaScript errors anywhere in the child component tree
 */
import React from 'react';
import {
    Box,
    VStack,
    Heading,
    Text,
    Button,
    Icon,
    Container,
} from '@chakra-ui/react';
import { WarningCircle, ArrowClockwise, House } from 'phosphor-react';
import { Link } from 'react-router-dom';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null, errorInfo: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        this.setState({
            error: error,
            errorInfo: errorInfo,
        });
        // Log error to console in development
        console.error('Error caught by boundary:', error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <Box minH="100vh" bg="gray.50" display="flex" alignItems="center">
                    <Container maxW="container.md">
                        <VStack
                            spacing={6}
                            bg="white"
                            p={10}
                            borderRadius="2xl"
                            boxShadow="xl"
                            textAlign="center"
                        >
                            <Box
                                bg="red.100"
                                borderRadius="full"
                                p={4}
                            >
                                <Icon as={WarningCircle} boxSize={16} color="red.500" weight="fill" />
                            </Box>

                            <VStack spacing={2}>
                                <Heading size="lg" color="gray.800">
                                    Oops! Something went wrong
                                </Heading>
                                <Text color="gray.500" maxW="400px">
                                    We encountered an unexpected error. Please try refreshing the page or go back to the home page.
                                </Text>
                            </VStack>

                            <VStack spacing={3} w="full" maxW="300px">
                                <Button
                                    w="full"
                                    bg="brand.500"
                                    color="white"
                                    size="lg"
                                    leftIcon={<ArrowClockwise size={20} weight="bold" />}
                                    onClick={() => window.location.reload()}
                                    _hover={{ bg: 'brand.600' }}
                                >
                                    Refresh Page
                                </Button>

                                <Link to="/home" style={{ width: '100%' }}>
                                    <Button
                                        w="full"
                                        variant="outline"
                                        colorScheme="red"
                                        size="lg"
                                        leftIcon={<House size={20} weight="bold" />}
                                    >
                                        Go to Home
                                    </Button>
                                </Link>
                            </VStack>

                            {process.env.NODE_ENV === 'development' && this.state.error && (
                                <Box
                                    mt={4}
                                    p={4}
                                    bg="gray.100"
                                    borderRadius="lg"
                                    w="full"
                                    textAlign="left"
                                    maxH="200px"
                                    overflow="auto"
                                >
                                    <Text fontSize="sm" fontWeight="bold" color="red.600" mb={2}>
                                        Error Details (Development Only):
                                    </Text>
                                    <Text fontSize="xs" fontFamily="mono" color="gray.700">
                                        {this.state.error.toString()}
                                    </Text>
                                </Box>
                            )}
                        </VStack>
                    </Container>
                </Box>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
