/**
 * Order API
 * RTK Query endpoints for order and payment operations
 */
import { api } from './api';

export const orderApi = api.injectEndpoints({
  endpoints: (builder) => ({
    // Create Razorpay order
    createPaymentOrder: builder.mutation({
      query: (subtotal) => ({
        url: '/payment/orders',
        method: 'POST',
        body: { subtotal },
      }),
    }),

    // Verify payment
    verifyPayment: builder.mutation({
      query: (paymentData) => ({
        url: '/payment/verifypayment',
        method: 'POST',
        body: paymentData,
      }),
      invalidatesTags: [{ type: 'Order', id: 'LIST' }],
    }),

    // Get user orders
    getUserOrders: builder.query({
      query: (userId) => ({
        url: '/payment/getuserorders',
        method: 'POST',
        body: { userId },
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ _id }) => ({ type: 'Order', id: _id })),
              { type: 'Order', id: 'LIST' },
            ]
          : [{ type: 'Order', id: 'LIST' }],
    }),

    // Get all orders (admin)
    getAllOrders: builder.query({
      query: () => '/payment/getallorders',
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ _id }) => ({ type: 'Order', id: _id })),
              { type: 'Order', id: 'LIST' },
            ]
          : [{ type: 'Order', id: 'LIST' }],
    }),

    // Mark order as delivered (admin)
    deliverOrder: builder.mutation({
      query: (orderid) => ({
        url: '/payment/deliverorder',
        method: 'POST',
        body: { orderid },
      }),
      invalidatesTags: (result, error, id) => [
        { type: 'Order', id },
        { type: 'Order', id: 'LIST' },
      ],
    }),
  }),
  overrideExisting: false,
});

export const {
  useCreatePaymentOrderMutation,
  useVerifyPaymentMutation,
  useGetUserOrdersQuery,
  useLazyGetUserOrdersQuery,
  useGetAllOrdersQuery,
  useDeliverOrderMutation,
} = orderApi;
