/**
 * Admin API
 * RTK Query endpoints for admin operations (MYO Bowl components)
 */
import { api } from './api';

export const adminApi = api.injectEndpoints({
  endpoints: (builder) => ({
    // ============ USERS ============

    getAllUsers: builder.query({
      query: () => '/users/getallusers',
      providesTags: (result) =>
        result
          ? [
            ...result.map(({ _id }) => ({ type: 'User', id: _id })),
            { type: 'User', id: 'LIST' },
          ]
          : [{ type: 'User', id: 'LIST' }],
    }),

    // ============ BASES ============

    getAllBases: builder.query({
      query: () => '/myobowl/getallbases',
      providesTags: (result) =>
        result
          ? [
            ...result.map(({ _id }) => ({ type: 'Base', id: _id })),
            { type: 'Base', id: 'LIST' },
          ]
          : [{ type: 'Base', id: 'LIST' }],
    }),

    getBaseById: builder.query({
      query: (baseid) => ({
        url: '/myobowl/getbasebyid',
        method: 'POST',
        body: { baseid },
      }),
      providesTags: (result, error, id) => [{ type: 'Base', id }],
    }),

    addBase: builder.mutation({
      query: (base) => ({
        url: '/myobowl/addbase',
        method: 'POST',
        body: { base },
      }),
      invalidatesTags: [{ type: 'Base', id: 'LIST' }],
    }),

    updateBase: builder.mutation({
      query: (updatedBase) => ({
        url: '/myobowl/updatebase',
        method: 'POST',
        body: { updatedBase },
      }),
      invalidatesTags: (result, error, { _id }) => [
        { type: 'Base', id: _id },
        { type: 'Base', id: 'LIST' },
      ],
    }),

    deleteBase: builder.mutation({
      query: (baseid) => ({
        url: '/myobowl/deletebase',
        method: 'POST',
        body: { baseid },
      }),
      invalidatesTags: [{ type: 'Base', id: 'LIST' }],
    }),

    // ============ TOPPINGS ============

    getAllToppings: builder.query({
      query: () => '/myobowl/getalltoppings',
      providesTags: (result) =>
        result
          ? [
            ...result.map(({ _id }) => ({ type: 'Topping', id: _id })),
            { type: 'Topping', id: 'LIST' },
          ]
          : [{ type: 'Topping', id: 'LIST' }],
    }),

    getToppingById: builder.query({
      query: (toppingid) => ({
        url: '/myobowl/gettoppingbyid',
        method: 'POST',
        body: { toppingid },
      }),
      providesTags: (result, error, id) => [{ type: 'Topping', id }],
    }),

    addTopping: builder.mutation({
      query: (topping) => ({
        url: '/myobowl/addtopping',
        method: 'POST',
        body: { topping },
      }),
      invalidatesTags: [{ type: 'Topping', id: 'LIST' }],
    }),

    updateTopping: builder.mutation({
      query: (updatedTopping) => ({
        url: '/myobowl/updatetopping',
        method: 'POST',
        body: { updatedTopping },
      }),
      invalidatesTags: (result, error, { _id }) => [
        { type: 'Topping', id: _id },
        { type: 'Topping', id: 'LIST' },
      ],
    }),

    deleteTopping: builder.mutation({
      query: (toppingid) => ({
        url: '/myobowl/deletetopping',
        method: 'POST',
        body: { toppingid },
      }),
      invalidatesTags: [{ type: 'Topping', id: 'LIST' }],
    }),

    // ============ CHEESE & SAUCES ============

    getAllCheese: builder.query({
      query: () => '/myobowl/getallcheese',
    }),

    getAllSauces: builder.query({
      query: () => '/myobowl/getallsauces',
    }),
  }),
  overrideExisting: false,
});

export const {
  // Users
  useGetAllUsersQuery,
  // Bases
  useGetAllBasesQuery,
  useGetBaseByIdQuery,
  useLazyGetBaseByIdQuery,
  useAddBaseMutation,
  useUpdateBaseMutation,
  useDeleteBaseMutation,
  // Toppings
  useGetAllToppingsQuery,
  useGetToppingByIdQuery,
  useLazyGetToppingByIdQuery,
  useAddToppingMutation,
  useUpdateToppingMutation,
  useDeleteToppingMutation,
  // Cheese & Sauces
  useGetAllCheeseQuery,
  useGetAllSaucesQuery,
} = adminApi;
