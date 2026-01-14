import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { Box, Button, Text, Alert, AlertIcon, VStack, useToast } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { placeOrder } from '../../actions/orderAction';
import axios from 'axios';
import { API_BASE_URL } from '../../config/api';

export default function CheckoutForm({ subtotal }) {
    const stripe = useStripe();
    const elements = useElements();
    const [error, setError] = useState(null);
    const [processing, setProcessing] = useState(false);
    const toast = useToast();
    const dispatch = useDispatch();

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        setProcessing(true);

        // 1. Create PaymentIntent on the server
        try {
            const url = `${API_BASE_URL}/payment/create-payment-intent`;
            console.log('Requesting Payment Intent URL:', url);
            const { data: { clientSecret } } = await axios.post(url, {
                amount: subtotal
            });

            // 2. Confirm Card Payment
            const result = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: elements.getElement(CardElement), // This line is needed to associate the card with the payment method
                    billing_details: {
                        name: JSON.parse(localStorage.getItem('user'))?.name || 'Guest',
                    },
                },
            });

            if (result.error) {
                setError(result.error.message);
                setProcessing(false);
            } else {
                if (result.paymentIntent.status === 'succeeded') {
                    toast({
                        title: 'Payment Successful',
                        status: 'success',
                        duration: 3000,
                        isClosable: true,
                    });

                    // 3. Place Order in DB
                    dispatch(placeOrder(result.paymentIntent.id));
                    // Note: Ensure placeOrder action handles the payment ID correctly or update it if needed.
                    setProcessing(false);
                }
            }
        } catch (err) {
            setError(err.message || 'Payment failed');
            setProcessing(false);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <VStack spacing={4} align="stretch" p={4} borderWidth="1px" borderRadius="lg" bg="white">
                <Box p={4} border="1px" borderColor="gray.200" borderRadius="md">
                    <CardElement options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                            },
                        },
                    }} />
                </Box>

                {error && (
                    <Alert status="error" borderRadius="md">
                        <AlertIcon />
                        {error}
                    </Alert>
                )}

                <Button
                    type="submit"
                    colorScheme="brand"
                    isLoading={processing}
                    loadingText="Processing..."
                    disabled={!stripe}
                    width="full"
                >
                    Pay ${subtotal}
                </Button>
                <Text fontSize="xs" color="gray.500" textAlign="center">
                    Secure checkout with Stripe 🔒
                </Text>
            </VStack>
        </form>
    );
}
