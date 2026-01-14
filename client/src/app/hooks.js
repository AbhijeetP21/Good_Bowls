/**
 * Redux Hooks
 * Typed hooks for use throughout the app
 */
import { useDispatch, useSelector } from 'react-redux';

// Use throughout the app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch();
export const useAppSelector = useSelector;

/**
 * Custom hook to get authentication state
 */
export const useAuth = () => {
  const auth = useAppSelector((state) => state.auth);
  const legacyUser = useAppSelector((state) => state.setUserData?.userData);

  return {
    user: auth.user || legacyUser,
    token: auth.token,
    isAuthenticated: auth.isAuthenticated || !!legacyUser?.role,
    isAdmin: auth.user?.role === 'admin' || legacyUser?.role === 'admin',
    isLoading: auth.isLoading,
  };
};

/**
 * Custom hook to get cart state
 */
export const useCart = () => {
  const cart = useAppSelector((state) => state.cart);

  const subtotal = cart.items.reduce((sum, item) => sum + (item.price || 0), 0);
  const itemCount = cart.items.reduce((sum, item) => sum + (item.quantity || 0), 0);

  return {
    items: cart.items,
    subtotal,
    itemCount,
    isEmpty: cart.items.length === 0,
  };
};
