import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from './CheckoutForm';

// Make sure to call loadStripe outside of a component's render to avoid
// recreating the Stripe object on every render.
// Use environment variable or fallback to test key
const stripePromise = loadStripe(
    process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY || 'pk_test_TYooMQauvdEDq54NiTphI7jx'
);

export default function StripeDeployment({ subtotal }) {
    const appearance = {
        theme: 'stripe',
    };
    const options = {
        appearance,
    };

    return (
        <Elements options={options} stripe={stripePromise}>
            <CheckoutForm subtotal={subtotal} />
        </Elements>
    );
}
