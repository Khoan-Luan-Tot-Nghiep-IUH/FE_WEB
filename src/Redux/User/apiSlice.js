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
      headers.delete('Content-Type');
      return headers;
    },
    onError: (error, { dispatch }) => {
      if (error.status === 401) {
        dispatch(logout()); 
        window.location.href = '/login'; 
      }
    }
  }),
  tagTypes: ['UserRequests', 'Notifications' , 'CompanyRequests' , 'BusTypes' , 'TripRequests','LoyaltyPoints','FAQs'],
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
    getAllUsersByLastLogin: builder.query({
      query: () => '/user/getLastLoginUser',
      providesTags: (result) => {
        if (!result || !Array.isArray(result.users)) {
          return [{ type: 'User', id: 'LIST' }];
        }
        return [
          ...result.users.map(({ _id }) => ({ type: 'User', id: _id })),
          { type: 'User', id: 'LIST' }
        ];
      },
    }),
    changePassword: builder.mutation({
      query: (passwordData) => ({
        url: '/user/change-password',
        method: 'PUT',
        body: passwordData,
      }),
    }),
    redeemPointsForVoucher: builder.mutation({
      query: (pointsData) => ({
        url: '/vouchers/redeem',
        method: 'POST',
        body: pointsData,
      }),
    }),
    getAllVouchers: builder.query({
      query: () => '/vouchers/user-vouchers',
      providesTags: (result) =>
        result
          ? [...result.map(({ _id }) => ({ type: 'Voucher', id: _id })), { type: 'Voucher', id: 'LIST' }]
          : [{ type: 'Voucher', id: 'LIST' }],
    }),
    createCompanyRequest: builder.mutation({
      query: (companyData) => ({
        url: '/user/companies/request',
        method: 'POST',
        body: companyData,
      }),
    }),
    getUserRequests: builder.query({
      query: () => '/user/companies/request',
      providesTags: ['UserRequests'],
    }),
    cancelUserRequest: builder.mutation({
      query: (requestId) => ({
        url: '/user/companies/cancel',
        method: 'DELETE',
        body: { requestId },
      }),
      invalidatesTags: ['UserRequests'],
    }),
    sendResetCode: builder.mutation({
      query: (data) => ({
        url: '/user/forgot-password',
        method: 'POST',
        body: data,
      }),
    }),
    verifyResetCode: builder.mutation({
      query: (data) => ({
        url: '/user/verify-reset-code',
        method: 'POST',
        body: data,
      }),
      getCompanyDetails: builder.query({
        query: (companyId) => `/companies/${companyId}/details`,
        providesTags: (result, error, companyId) => [{ type: 'Company', id: companyId }],
      }),
      getCompanyNames: builder.query({
        query: () => '/companies/names', // Route API
      }),
    }),
    getGlobalNotifications: builder.query({
      query: () => '/global-notifications',
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ _id }) => ({ type: 'Notifications', id: _id })),
              { type: 'Notifications', id: 'LIST' },
            ]
          : [{ type: 'Notifications', id: 'LIST' }],
    }),
    markNotificationAsChecked: builder.mutation({
      query: (id) => ({
        url: `/global-notifications/${id}/checked`,
        method: 'PATCH',
      }),
      invalidatesTags: (result, error, id) => [{ type: 'Notifications', id }],
    }),
    getCompanyRequests: builder.query({
      query: () => '/user/requests',
      providesTags: ['CompanyRequests'],
    }),
    updateCompanyRequest: builder.mutation({
      query: (data) => ({
        url: '/user/requests/update',
        method: 'PATCH',
        body: data,
      }),
    }),
   getCompanyNames: builder.query({
    query: () => '/user/companies/names', 
    providesTags: (result) =>
      result && result.data
        ? [
            ...result.data.map((name) => ({ type: 'CompanyRequests', id: name })),
            { type: 'CompanyRequests', id: 'LIST' },
          ]
        : [{ type: 'CompanyRequests', id: 'LIST' }],
  }),

    getBusTypesByCompany: builder.query({
      query: (companyId) => `/user/bustypes/${companyId}`,
      providesTags: (result, error, companyId) => [{ type: 'BusTypes', id: companyId }],
    }),

    createTripRequest: builder.mutation({
      query: (tripData) => ({
        url: '/user/trip-request',
        method: 'POST',
        body: tripData,
      }),
      invalidatesTags: ['TripRequests'],
    }),
    getTripRequests: builder.query({
      query: () => '/user/trip-requests',
      providesTags: ['TripRequests'],
    }),
    cancelTripRequest: builder.mutation({
      query: (requestId) => ({
        url: `/user/trip-requests/${requestId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['TripRequests'],
    }),
    getUserLoyaltyPoints: builder.query({
      query: () => '/vouchers/loyalty-points', 
      providesTags: ['LoyaltyPoints'], 
    }),
    createCompanyFeedback: builder.mutation({
    query: (feedbackData) => ({
      url: '/feedbacks',
      method: 'POST',
      body: feedbackData,
    }),
    invalidatesTags: ['CompanyRequests'],
  }),
  getRootQuestions: builder.query({
    query: () => '/faq/root',
  }),
  getQuestionById: builder.query({
    query: (id) => `/faq/${id}`,
  }),
  createFAQ: builder.mutation({
  query: (faqData) => ({
    url: '/faq',
    method: 'POST',
    body: faqData,
  }),
  invalidatesTags: ['FAQs'],
}),

updateFAQ: builder.mutation({
  query: ({ id, faqData }) => ({
    url: `/faq/${id}`,
    method: 'PUT',
    body: faqData,
  }),
  invalidatesTags: (result, error, { id }) => [{ type: 'FAQs', id }],
}),
deleteFAQ: builder.mutation({
  query: (id) => ({
    url: `/faq/${id}`,
    method: 'DELETE',
  }),
  invalidatesTags: (result, error, id) => [{ type: 'FAQs', id }],
}),
getOnlinePaymentsStatsByCompany: builder.query({
  query: () => '/stats/online-payments',
}),

  }),
}); 

export const { 
  useLoginMutation,  
  useGetUserInfoQuery, 
  useUpdateUserProfileMutation,
  useRegisterMutation, 
  useVerifyOtpMutation,
  useGetAllUsersByLastLoginQuery,
  useChangePasswordMutation,
  useRedeemPointsForVoucherMutation,
  useGetAllVouchersQuery,   
  useCreateCompanyRequestMutation, 
  useGetUserRequestsQuery, 
  useCancelUserRequestMutation,
  useSendResetCodeMutation,
  useVerifyResetCodeMutation,
  useGetCompanyDetailsQuery,
  useGetGlobalNotificationsQuery,
  useMarkNotificationAsCheckedMutation,
  useGetCompanyRequestsQuery, 
  useUpdateCompanyRequestMutation,
  useGetCompanyNamesQuery,
  useGetBusTypesByCompanyQuery,
  useCreateTripRequestMutation,
  useGetTripRequestsQuery,
  useCancelTripRequestMutation,
  useGetUserLoyaltyPointsQuery,
  useCreateCompanyFeedbackMutation,
  useGetRootQuestionsQuery,
  useGetQuestionByIdQuery,
  useCreateFAQMutation,
  useUpdateFAQMutation,
  useDeleteFAQMutation,
  useGetOnlinePaymentsStatsByCompanyQuery,
} = apiSlice;
