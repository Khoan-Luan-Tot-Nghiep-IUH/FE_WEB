import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { logout } from './userSlice';

const baseUrl = process.env.REACT_APP_API_URL;

export const apiSlice = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: `${baseUrl}/api`,
    prepareHeaders: (headers, { getState }) => {
      const token = getState().user.userInfo?.token;
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
    onError: (error, { dispatch }) => {
      if (error.status === 401) {
        dispatch(logout()); 
        window.location.href = '/login'; 
      }
    }
  }),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: '/user/login',
        method: 'POST',
        body: credentials,
      }),
    }),
   getUserInfo: builder.query({
      query: (id) => `/user/profile/${id}`,
      async  onError (error, { dispatch }) {
        if (error.error?.status === 401) {
          dispatch(logout()); 
          window.location.href = '/login';
        }
      },
    }),
    updateUserProfile: builder.mutation({
      query: ({ id, userData }) => ({
        url: `/user/profile/${id}`,
        method: 'PUT',
        body: userData,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'User', id }],
    }),
    register: builder.mutation({
      query: (userData) => ({
        url: '/user/register',
        method: 'POST',
        body: userData,
      }),
    }),
    verifyOtp: builder.mutation({
      query: (otpData) => ({
        url: '/user/verify',
        method: 'POST',
        body: otpData,
      }),
    }),
  }),
});

export const { 
  useLoginMutation,  
  useGetUserInfoQuery, 
  useUpdateUserProfileMutation,
  useRegisterMutation, 
  useVerifyOtpMutation 
} = apiSlice;
