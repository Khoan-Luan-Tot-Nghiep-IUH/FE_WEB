import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const BASE_URL = process.env.REACT_APP_API_URL;
const baseQueryWithAuth = fetchBaseQuery({
  baseUrl: BASE_URL,
  prepareHeaders: (headers, { getState }) => {
    const token = getState().user?.userInfo?.token;
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
});

export const tripApiSlice = createApi({
  reducerPath: 'tripApi',
  baseQuery: baseQueryWithAuth, 
  endpoints: (builder) => ({
    getAllTrips: builder.query({
      query: () => '/api/trips',
    }),
    getTripsByCompany: builder.query({
      query: (companyId) => `/api/trips/company/${companyId}`,
    }),
    getTripById: builder.query({
      query: (tripId) => {
        console.log("Fetching Trip ID:", tripId);
        return `/api/trips/${tripId}`;
      },
    }),
    createTrip: builder.mutation({
      query: (newTrip) => {
        return {
          url: '/api/trips',
          method: 'POST',
          body: {
            ...newTrip,
            companyId: newTrip.companyId,
          },
        };
      },
    }),
    updateTrip: builder.mutation({
      query: ({ tripId, updatedTrip }) => ({
        url: `/api/trips/${tripId}`,
        method: 'PUT',
        body: updatedTrip,
      }),
    }),
    deleteTrip: builder.mutation({
      query: (tripId) => ({
        url: `/api/trips/${tripId}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useGetAllTripsQuery,
  useGetTripsByCompanyQuery,
  useGetTripByIdQuery,
  useCreateTripMutation,
  useUpdateTripMutation,
  useDeleteTripMutation,
} = tripApiSlice;

export default tripApiSlice;
