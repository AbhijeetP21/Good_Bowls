/**
 * Bowl API
 * RTK Query endpoints for bowl operations
 */
import { api } from './api';

export const bowlApi = api.injectEndpoints({
  endpoints: (builder) => ({
    // Get all bowls
    getAllBowls: builder.query({
      query: () => '/bowls/getallbowls',
      providesTags: (result) =>
        result
          ? [
            ...result.map(({ _id }) => ({ type: 'Bowl', id: _id })),
            { type: 'Bowl', id: 'LIST' },
          ]
          : [{ type: 'Bowl', id: 'LIST' }],
    }),

    // Get bowl by ID
    getBowlById: builder.query({
      query: (bowlid) => ({
        url: '/bowls/getbowlbyid',
        method: 'POST',
        body: { bowlid },
      }),
      providesTags: (result, error, id) => [{ type: 'Bowl', id }],
    }),

    // Add bowl (admin)
    addBowl: builder.mutation({
      query: (bowl) => ({
        url: '/bowls/addbowl',
        method: 'POST',
        body: { bowl },
      }),
      invalidatesTags: [{ type: 'Bowl', id: 'LIST' }],
    }),

    // Update bowl (admin)
    updateBowl: builder.mutation({
      query: (updatedBowl) => ({
        url: '/bowls/updatebowl',
        method: 'POST',
        body: { updatedBowl },
      }),
      invalidatesTags: (result, error, { _id }) => [
        { type: 'Bowl', id: _id },
        { type: 'Bowl', id: 'LIST' },
      ],
    }),

    // Delete bowl (admin)
    deleteBowl: builder.mutation({
      query: (bowlid) => ({
        url: '/bowls/deletebowl',
        method: 'POST',
        body: { bowlid },
      }),
      invalidatesTags: [{ type: 'Bowl', id: 'LIST' }],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetAllBowlsQuery,
  useGetBowlByIdQuery,
  useLazyGetBowlByIdQuery,
  useAddBowlMutation,
  useUpdateBowlMutation,
  useDeleteBowlMutation,
} = bowlApi;
