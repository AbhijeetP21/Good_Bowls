/**
 * Auth API
 * RTK Query endpoints for authentication
 */
import { api } from './api';

export const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    // Login user
    login: builder.mutation({
      query: (credentials) => ({
        url: '/auth',
        method: 'POST',
        body: credentials,
      }),
      invalidatesTags: ['Auth'],
    }),

    // Register user
    register: builder.mutation({
      query: (userData) => ({
        url: '/users',
        method: 'POST',
        body: userData,
      }),
    }),

    // Verify JWT token
    verifyToken: builder.query({
      query: (token) => ({
        url: '/auth/jwt/verify',
        params: { token },
      }),
      providesTags: ['Auth'],
    }),

    // Verify email
    verifyEmail: builder.mutation({
      query: ({ id, token }) => ({
        url: `/users/${id}/verify/${token}`,
        method: 'GET',
      }),
    }),

    // Request password reset
    requestPasswordReset: builder.mutation({
      query: (email) => ({
        url: '/password-reset',
        method: 'POST',
        body: { email },
      }),
    }),

    // Verify password reset link
    verifyPasswordResetLink: builder.query({
      query: ({ id, token }) => `/password-reset/${id}/${token}`,
    }),

    // Reset password
    resetPassword: builder.mutation({
      query: ({ id, token, password }) => ({
        url: `/password-reset/${id}/${token}`,
        method: 'POST',
        body: { password },
      }),
    }),
  }),
  overrideExisting: false,
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useVerifyTokenQuery,
  useLazyVerifyTokenQuery,
  useVerifyEmailMutation,
  useRequestPasswordResetMutation,
  useVerifyPasswordResetLinkQuery,
  useResetPasswordMutation,
} = authApi;
