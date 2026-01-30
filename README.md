# Good Bowls

A full stack web application for a modern salad bowl restaurant. Customers can browse the menu, customize their own bowls, and complete orders with secure Stripe payment integration.

Read the detailed Technical write-up here: https://www.abhijeetpachpute.com/writing/good-bowls-ecommerce

## Live Demo

The application is deployed on free tier hosting services. Please note that the initial load may take up to 50 seconds as the servers wake up from sleep mode. Local builds or paid hosting deployments load instantly.

Frontend: [Vercel Deployment]
Backend: [Render Deployment]

## Tech Stack

### Frontend
React 17 with Redux for state management. Chakra UI for the component library. Stripe Elements for payment processing on the client side.

### Backend
Node.js and Express server with MongoDB Atlas for the database. Stripe API for payment processing. Resend for transactional emails.

## Features

Browse a menu of signature salad bowls with different sizes and pricing. Build your own custom bowl by selecting a base, toppings, cheese, and sauces. Add items to cart and manage quantities. Secure checkout with Stripe test payments. User authentication with email verification. Order history for logged in users. Admin dashboard for managing bowls, orders, and users.

Note: Email verification functionality is fully implemented using Resend. However, the free tier only allows sending emails to verified domains. For this demo, email verification is disabled to allow immediate account access. To enable it, add a verified domain in Resend and update the server code.

## Local Development

### Prerequisites
Node.js installed on your machine. A MongoDB Atlas account with a cluster. A Stripe account for payment processing. A Resend account for email functionality.

### Environment Variables

Create a `.env` file in the server directory:
```
DB=your_mongodb_connection_string
JWTPRIVATEKEY=your_jwt_secret
SALT=10
STRIPE_SECRET_KEY=sk_test_your_key
RESEND_API_KEY=re_your_key
EMAIL_FROM=onboarding@resend.dev
BASE_URL=http://localhost:3000
```

Create a `.env` file in the client directory:
```
REACT_APP_API_URL=http://localhost:8080/api
REACT_APP_STRIPE_PUBLISHABLE_KEY=pk_test_your_key
```

### Running the Application

Install dependencies for the server:
```
cd server
npm install
```

Install dependencies for the client:
```
cd client
npm install
```

Start the server in development mode:
```
cd server
npm run dev
```

Start the client:
```
cd client
npm start
```

The client runs on http://localhost:3000 and the server runs on http://localhost:8080.

## Test Payment

Use Stripe test card for payment:
Card Number: 4242 4242 4242 4242
Expiry: Any future date
CVC: Any 3 digits

## Project Structure

The project follows a monorepo structure with separate client and server directories. The server uses a layered architecture with controllers, services, and repositories for clean separation of concerns.

## License

This project is for educational and portfolio purposes.
