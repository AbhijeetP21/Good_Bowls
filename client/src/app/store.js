/**
 * Redux Store Configuration
 * Uses Redux Toolkit for modern state management
 */
import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';

// RTK Query APIs
import { api } from '../services/api';

// Feature slices
import authReducer from '../features/auth/authSlice';
import cartReducer from '../features/cart/cartSlice';

// Legacy reducers (for gradual migration)
import { getAllBowlsReducer } from '../reducers/bowlReducer';
import { getAllUsersReducer, setUserDataReducer } from '../reducers/UsersReducer';
import {
  getAllOrdersReducer,
  getUserOrdersReducer,
  placeOrderReducer,
  deliverOrderReducer,
} from '../reducers/orderReducer';
import {
  getAllBasesReducer,
  getAllCheeseReducer,
  getAllSaucesReducer,
  getAllToppingsReducer,
  addBaseReducer,
  getBaseByIdReducer,
  updateBaseReducer,
  addToppingReducer,
  getToppingByIdReducer,
  updateToppingReducer,
} from '../reducers/myoBowlReducer';
import {
  addBowlReducer,
  getBowlByIdReducer,
  updateBowlReducer,
} from '../reducers/bowlReducer';

// Load cart from localStorage
const loadCartFromStorage = () => {
  try {
    const cartItems = localStorage.getItem('cartItems');
    return cartItems ? JSON.parse(cartItems) : [];
  } catch {
    return [];
  }
};

const preloadedState = {
  cart: {
    cartItems: loadCartFromStorage(),
  },
};

export const store = configureStore({
  reducer: {
    // RTK Query API reducer
    [api.reducerPath]: api.reducer,

    // New RTK slices
    auth: authReducer,
    cart: cartReducer,

    // Legacy reducers (will be migrated incrementally)
    getAllBowls: getAllBowlsReducer,
    getAllCheese: getAllCheeseReducer,
    getAllBases: getAllBasesReducer,
    getAllSauces: getAllSaucesReducer,
    getAllToppings: getAllToppingsReducer,
    placeOrder: placeOrderReducer,
    getUserOrders: getUserOrdersReducer,
    addBowl: addBowlReducer,
    getBowlById: getBowlByIdReducer,
    updateBowl: updateBowlReducer,
    getAllOrders: getAllOrdersReducer,
    deliverOrder: deliverOrderReducer,
    getAllUsers: getAllUsersReducer,
    addBase: addBaseReducer,
    getBaseById: getBaseByIdReducer,
    updateBase: updateBaseReducer,
    addTopping: addToppingReducer,
    getToppingById: getToppingByIdReducer,
    updateTopping: updateToppingReducer,
    setUserData: setUserDataReducer,
  },
  preloadedState,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types for serializable check
        ignoredActions: ['persist/PERSIST'],
      },
    }).concat(api.middleware),
  devTools: process.env.NODE_ENV !== 'production',
});

// Enable refetchOnFocus/refetchOnReconnect behaviors
setupListeners(store.dispatch);

export default store;
