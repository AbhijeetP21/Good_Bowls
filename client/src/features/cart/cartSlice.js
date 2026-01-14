/**
 * Cart Slice
 * Redux Toolkit slice for shopping cart state
 */
import { createSlice } from '@reduxjs/toolkit';

// Helper to persist cart to localStorage
const persistCart = (items) => {
  try {
    localStorage.setItem('cartItems', JSON.stringify(items));
  } catch (error) {
    console.error('Failed to persist cart:', error);
  }
};

// Load initial state from localStorage
const loadCartFromStorage = () => {
  try {
    const cartItems = localStorage.getItem('cartItems');
    return cartItems ? JSON.parse(cartItems) : [];
  } catch {
    return [];
  }
};

const initialState = {
  cartItems: loadCartFromStorage(),
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { _id, name, image, description, varient, quantity, prices, price } = action.payload;

      // Validate quantity
      if (quantity > 10) {
        console.warn('Cannot add more than 10 quantities');
        return;
      }

      if (quantity <= 0) {
        // Remove item if quantity is 0 or less
        state.cartItems = state.cartItems.filter((item) => item._id !== _id);
        persistCart(state.cartItems);
        return;
      }

      // Check if item already exists
      const existingIndex = state.cartItems.findIndex((item) => item._id === _id);

      const cartItem = {
        _id,
        name,
        image,
        description,
        varient,
        quantity,
        prices,
        price,
      };

      if (existingIndex >= 0) {
        // Update existing item
        state.cartItems[existingIndex] = cartItem;
      } else {
        // Add new item
        state.cartItems.push(cartItem);
      }

      persistCart(state.cartItems);
    },

    removeFromCart: (state, action) => {
      const itemId = action.payload._id || action.payload;
      state.cartItems = state.cartItems.filter((item) => item._id !== itemId);
      persistCart(state.cartItems);
    },

    updateQuantity: (state, action) => {
      const { _id, quantity } = action.payload;

      if (quantity > 10) {
        console.warn('Cannot add more than 10 quantities');
        return;
      }

      if (quantity <= 0) {
        state.cartItems = state.cartItems.filter((item) => item._id !== _id);
      } else {
        const item = state.cartItems.find((item) => item._id === _id);
        if (item) {
          item.quantity = quantity;
          // Recalculate price for regular bowls
          if (item.name !== 'Build Your Own Bowl' && item.prices?.[0]?.[item.varient]) {
            item.price = item.prices[0][item.varient] * quantity;
          }
        }
      }

      persistCart(state.cartItems);
    },

    clearCart: (state) => {
      state.cartItems = [];
      persistCart(state.cartItems);
    },
  },
  // Handle legacy action types from cartActions.js for backward compatibility
  extraReducers: (builder) => {
    builder
      .addCase('ADD_TO_CART', (state, action) => {
        const cartItem = action.payload;
        const existingIndex = state.cartItems.findIndex((item) => item._id === cartItem._id);

        if (existingIndex >= 0) {
          state.cartItems[existingIndex] = cartItem;
        } else {
          state.cartItems.push(cartItem);
        }
      })
      .addCase('DELETE_FROM_CART', (state, action) => {
        const itemId = action.payload._id || action.payload;
        state.cartItems = state.cartItems.filter((item) => item._id !== itemId);
      });
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;

// Selectors
export const selectCartItems = (state) => state.cart.cartItems;
export const selectCartItemCount = (state) =>
  state.cart.cartItems.reduce((sum, item) => sum + (item.quantity || 0), 0);
export const selectCartSubtotal = (state) =>
  state.cart.cartItems.reduce((sum, item) => sum + (item.price || 0), 0);
export const selectIsCartEmpty = (state) => state.cart.cartItems.length === 0;

export default cartSlice.reducer;
