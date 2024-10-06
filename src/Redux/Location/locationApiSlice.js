import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';


const baseUrl = process.env.REACT_APP_API_URL;

export const locationApiSlice = createApi({
  reducerPath: 'locationApi', 
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  tagTypes: ['Location'], 
  endpoints: (builder) => ({
    getLocations: builder.query({
      query: (params) => ({
        url: '/locations',
        method: 'GET',
        params, 
      }),
      providesTags: ['Location'],
    }),
    getLocationById: builder.query({
      query: (id) => `/locations/${id}`,
      providesTags: ['Location'],
    }),
    createLocation: builder.mutation({
      query: (newLocation) => ({
        url: '/locations',
        method: 'POST',
        body: newLocation,
      }),
      invalidatesTags: ['Location'],
    }),
    updateLocation: builder.mutation({
      query: ({ id, updatedLocation }) => ({
        url: `/locations/${id}`,
        method: 'PUT',
        body: updatedLocation,
      }),
      invalidatesTags: ['Location'],
    }),
    deleteLocation: builder.mutation({
      query: (id) => ({
        url: `/locations/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Location'],
    }),
  }),
});

export const {
  useGetLocationsQuery,
  useGetLocationByIdQuery,
  useCreateLocationMutation,
  useUpdateLocationMutation,
  useDeleteLocationMutation,
} = locationApiSlice;
