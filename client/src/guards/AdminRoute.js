/**
 * Admin Route Guard
 * Redirects to home if user is not an admin
 */
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../app/hooks';
import LoadingState from '../components/shared/LoadingState';

const AdminRoute = ({ children }) => {
  const { isAuthenticated, isAdmin, isLoading, user } = useAuth();
  const location = useLocation();

  // Show loading while checking auth
  if (isLoading) {
    return <LoadingState message="Checking permissions..." />;
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated && !user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Redirect to home if not admin
  if (!isAdmin) {
    return <Navigate to="/home" replace />;
  }

  return children;
};

export default AdminRoute;
