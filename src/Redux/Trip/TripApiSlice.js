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
    deleteExpiredTripsForCompany: builder.mutation({
      query: () => ({
        url: `/api/trips/expired-trips`,
        method: 'DELETE',
      }),
    }),
    searchTrip: builder.query({
      query: ({
        departureLocation,
        arrivalLocation,
        departureDate,
        returnDate,
        ticketCount,
        departureTimeRange,
        busType,
        seatRow,
        floor,
        minPrice,
        maxPrice,
      }) => {
        const queryParams = new URLSearchParams();

        if (departureLocation) queryParams.append('departureLocation', departureLocation);
        if (arrivalLocation) queryParams.append('arrivalLocation', arrivalLocation);
        if (departureDate) queryParams.append('departureDate', departureDate);
        if (returnDate) queryParams.append('returnDate', returnDate);
        if (ticketCount) queryParams.append('ticketCount', ticketCount);
        if (departureTimeRange) queryParams.append('departureTimeRange', departureTimeRange);
        if (busType) queryParams.append('busType', busType);
        if (seatRow) queryParams.append('seatRow', seatRow);
        if (floor) queryParams.append('floor', floor);
        if (minPrice) queryParams.append('minPrice', minPrice);
        if (maxPrice) queryParams.append('maxPrice', maxPrice);

        return {
          url: `/api/trips/search?${queryParams.toString()}`,
        };
      },
    }),
  }),
})
export const {
  useGetAllTripsQuery,
  useGetTripsByCompanyQuery,
  useGetTripByIdQuery,
  useCreateTripMutation,
  useUpdateTripMutation,
  useDeleteExpiredTripsForCompanyMutation,
  useDeleteTripMutation,
  useSearchTripQuery,
} = tripApiSlice;

export default tripApiSlice;
