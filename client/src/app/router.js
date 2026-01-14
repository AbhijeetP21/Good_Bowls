/**
 * App Router
 * Centralized routing configuration with React Router v6
 */
import React, { Suspense, lazy } from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';

// Layouts
import MainLayout from '../layouts/MainLayout';
import AdminLayout from '../layouts/AdminLayout';

// Route guards
import ProtectedRoute from '../guards/ProtectedRoute';
import AdminRoute from '../guards/AdminRoute';

// Shared components
import LoadingState from '../components/shared/LoadingState';

// Lazy load pages for code splitting
// Auth pages
const Login = lazy(() => import('../Screens/Login'));
const Signup = lazy(() => import('../Screens/Signup'));
const ForgotPassword = lazy(() => import('../Screens/ForgotPassword'));
const PasswordReset = lazy(() => import('../Screens/PasswordReset'));
const EmailVerify = lazy(() => import('../Screens/EmailVerify'));

// Main pages
const Main = lazy(() => import('../Screens/Main'));
const Home = lazy(() => import('../Screens/Home'));
const CartScreen = lazy(() => import('../Screens/CartScreen/CartScreen'));
const MyoPizza = lazy(() => import('../Screens/myoPizza/MyoPizza'));
const OrderScreen = lazy(() => import('../Screens/OrderScreen/OrderScreen'));

// Admin pages
const AdminScreen = lazy(() => import('../Screens/AdminScreen/AdminScreen'));
const Addpizza = lazy(() => import('../Screens/Addpizza'));
const Editpizza = lazy(() => import('../Screens/Editpizza'));
const Pizzaslist = lazy(() => import('../Screens/Pizzaslist'));
const Userslist = lazy(() => import('../Screens/Userslist'));
const Orderslist = lazy(() => import('../Screens/Orderslist'));
const Baseslist = lazy(() => import('../Screens/Baseslist'));
const Addbases = lazy(() => import('../Screens/Addbases'));
const Editbase = lazy(() => import('../Screens/Editbase'));
const Toppingslist = lazy(() => import('../Screens/Toppingslist'));
const Addtopping = lazy(() => import('../Screens/Addtopping'));
const Edittopping = lazy(() => import('../Screens/Edittopping'));

// Suspense wrapper for lazy components
const SuspenseWrapper = ({ children }) => (
  <Suspense fallback={<LoadingState message="Loading..." />}>
    {children}
  </Suspense>
);

// Router configuration
export const router = createBrowserRouter([
  // Public routes (no layout)
  {
    path: '/login',
    element: (
      <SuspenseWrapper>
        <Login />
      </SuspenseWrapper>
    ),
  },
  {
    path: '/signup',
    element: (
      <SuspenseWrapper>
        <Signup />
      </SuspenseWrapper>
    ),
  },
  {
    path: '/forgot-password',
    element: (
      <SuspenseWrapper>
        <ForgotPassword />
      </SuspenseWrapper>
    ),
  },
  {
    path: '/password-reset/:id/:token',
    element: (
      <SuspenseWrapper>
        <PasswordReset />
      </SuspenseWrapper>
    ),
  },
  {
    path: '/users/:id/verify/:token',
    element: (
      <SuspenseWrapper>
        <EmailVerify />
      </SuspenseWrapper>
    ),
  },

  // Protected routes with MainLayout
  {
    element: <MainLayout />,
    children: [
      {
        path: '/home',
        element: (
          <ProtectedRoute>
            <SuspenseWrapper>
              <Home />
            </SuspenseWrapper>
          </ProtectedRoute>
        ),
      },
      {
        path: '/cart',
        element: (
          <ProtectedRoute>
            <SuspenseWrapper>
              <CartScreen />
            </SuspenseWrapper>
          </ProtectedRoute>
        ),
      },
      {
        path: '/myoPizza',
        element: (
          <ProtectedRoute>
            <SuspenseWrapper>
              <MyoPizza />
            </SuspenseWrapper>
          </ProtectedRoute>
        ),
      },
      {
        path: '/myorders',
        element: (
          <ProtectedRoute>
            <SuspenseWrapper>
              <OrderScreen />
            </SuspenseWrapper>
          </ProtectedRoute>
        ),
      },
    ],
  },

  // Admin routes with AdminLayout
  {
    path: '/admin',
    element: (
      <AdminRoute>
        <AdminLayout />
      </AdminRoute>
    ),
    children: [
      {
        index: true,
        element: (
          <SuspenseWrapper>
            <AdminScreen />
          </SuspenseWrapper>
        ),
      },
      {
        path: 'addpizzas',
        element: (
          <SuspenseWrapper>
            <Addpizza />
          </SuspenseWrapper>
        ),
      },
      {
        path: 'pizzaslist',
        element: (
          <SuspenseWrapper>
            <Pizzaslist />
          </SuspenseWrapper>
        ),
      },
      {
        path: 'editpizza/:pizzaid',
        element: (
          <SuspenseWrapper>
            <Editpizza />
          </SuspenseWrapper>
        ),
      },
      {
        path: 'userslist',
        element: (
          <SuspenseWrapper>
            <Userslist />
          </SuspenseWrapper>
        ),
      },
      {
        path: 'orderslist',
        element: (
          <SuspenseWrapper>
            <Orderslist />
          </SuspenseWrapper>
        ),
      },
      {
        path: 'baseslist',
        element: (
          <SuspenseWrapper>
            <Baseslist />
          </SuspenseWrapper>
        ),
      },
      {
        path: 'addbases',
        element: (
          <SuspenseWrapper>
            <Addbases />
          </SuspenseWrapper>
        ),
      },
      {
        path: 'editbase/:baseid',
        element: (
          <SuspenseWrapper>
            <Editbase />
          </SuspenseWrapper>
        ),
      },
      {
        path: 'toppingslist',
        element: (
          <SuspenseWrapper>
            <Toppingslist />
          </SuspenseWrapper>
        ),
      },
      {
        path: 'addtopping',
        element: (
          <SuspenseWrapper>
            <Addtopping />
          </SuspenseWrapper>
        ),
      },
      {
        path: 'edittopping/:toppingid',
        element: (
          <SuspenseWrapper>
            <Edittopping />
          </SuspenseWrapper>
        ),
      },
    ],
  },

  // Landing page
  {
    path: '/',
    element: (
      <SuspenseWrapper>
        <Main />
      </SuspenseWrapper>
    ),
  },

  // Catch all - redirect to landing
  {
    path: '*',
    element: <Navigate to="/" replace />,
  },
]);

export default router;
