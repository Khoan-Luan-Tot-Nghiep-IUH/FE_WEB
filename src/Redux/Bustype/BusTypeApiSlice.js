import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseUrl = process.env.REACT_APP_API_URL;

export const busTypeApiSlice = createApi({
  reducerPath: 'busTypeApi', 
  baseQuery: fetchBaseQuery({
    baseUrl: '/api', 
    prepareHeaders: (headers, { getState }) => {
      const token = getState().user?.userInfo?.token;
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['BusType'],
  endpoints: (builder) => ({
    getBusTypes: builder.query({
      query: ({ companyId }) => `/bus-types?companyId=${companyId}`, // Thêm `companyId` vào query
      providesTags: ['BusType'],
    }),
    getBusTypeById: builder.query({
      query: (id) => `/bus-types/${id}`,
      providesTags: (result, error, id) => [{ type: 'BusType', id }],
    }),
    createBusType: builder.mutation({
      query: (newBusType) => ({
        url: '/bus-types',
        method: 'POST',
        body: newBusType,
      }),
      invalidatesTags: ['BusType'],
    }),
    updateBusType: builder.mutation({
      query: ({ id, updatedBusType }) => ({
        url: `/bus-types/${id}`,
        method: 'PUT',
        body: updatedBusType,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'BusType', id }],
    }),
    deleteBusType: builder.mutation({
      query: (id) => ({
        url: `/bus-types/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, id) => [{ type: 'BusType', id }],
    }),
    getBusTypeNames: builder.query({
      query: () => '/bus-types/names',
      providesTags: ['BusType'],
    }),
  }),
});

export const {
  useGetBusTypesQuery,
  useGetBusTypeByIdQuery,
  useCreateBusTypeMutation,
  useUpdateBusTypeMutation,
  useDeleteBusTypeMutation,
  useGetBusTypeNamesQuery,
} = busTypeApiSlice;
