import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseUrl = process.env.REACT_APP_API_URL;

export const bookingApiSlice = createApi({
  reducerPath: 'bookingApi', 
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
  tagTypes: ['Booking'],
  endpoints: (builder) => ({
    createBookingDraft: builder.mutation({
      query: (draftBooking) => ({
        url: '/bookings-confirm',
        method: 'POST',
        body: draftBooking,
      }),
      invalidatesTags: ['Booking'],
    }),
    createBooking: builder.mutation({
      query: (newBooking) => ({
        url: '/bookings',
        method: 'POST',
        body: newBooking,
      }),
      invalidatesTags: ['Booking'],
    }),
    paymentSuccess: builder.query({
      query: ({ orderCode }) => `/payment-success?orderCode=${orderCode}`,
      providesTags: ['Booking'],
      keepUnusedDataFor: 5,
    }),
    getBookingHistory: builder.query({
      query: () => '/booking-history',
      providesTags: ['Booking'],
      keepUnusedDataFor: 60, 
    }),
    getBookingDrafts: builder.query({
      query: () => '/booking-drafts',
      providesTags: ['Booking'],
      keepUnusedDataFor: 5,
    }),
    cancelBooking: builder.mutation({
      query: (bookingId) => ({
        url: `/bookings/${bookingId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Booking'],
    }),
  }),
});

export const {
  useCreateBookingDraftMutation,
  useCreateBookingMutation,
  usePaymentSuccessQuery,
  useGetBookingHistoryQuery,
  useGetBookingDraftsQuery,
  useCancelBookingMutation,
} = bookingApiSlice;
