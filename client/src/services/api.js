/**
 * RTK Query Base API
 * Configures the base API for all endpoints
 */
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// API base URL - update this to your backend URL
const BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080/api';

// Base query with auth header
const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  prepareHeaders: (headers, { getState }) => {
    // Get token from auth state or localStorage
    const token = getState().auth?.token || localStorage.getItem('token');

    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }

    return headers;
  },
});

// Base query with re-auth logic
const baseQueryWithReauth = async (args, api, extraOptions) => {
  const result = await baseQuery(args, api, extraOptions);

  // Handle 401 unauthorized - clear auth state
  if (result.error?.status === 401) {
    localStorage.removeItem('token');
    api.dispatch({ type: 'auth/logout' });
  }

  return result;
};

// Create the API
export const api = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Bowl', 'Order', 'User', 'Base', 'Topping', 'Auth'],
  endpoints: () => ({}),
});

export default api;
