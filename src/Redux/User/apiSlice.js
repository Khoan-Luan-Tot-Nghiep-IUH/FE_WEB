import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

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
  }),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: '/user/login',
        method: 'POST',
        body: credentials,
      }),
    }),
    register: builder.mutation({
      query: (userData) => ({
        url: '/user/register',
        method: 'POST',
        body: userData,
      }),
    }),
    getUserInfo: builder.query({
      query: (id) => `/user/profile/${id}`,
      providesTags: (result, error, id) => [{ type: 'User', id }],
    }),
    updateUserProfile: builder.mutation({
      query: ({ id, userData }) => ({
        url: `/user/profile/${id}`,
        method: 'PUT',
        body: userData,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'User', id }],
    }),
  }),
});

export const { 
  useLoginMutation, 
  useRegisterMutation, 
  useGetUserInfoQuery, 
  useUpdateUserProfileMutation 
} = apiSlice;
