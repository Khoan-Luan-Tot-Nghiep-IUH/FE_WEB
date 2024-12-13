import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';


const baseUrl = process.env.REACT_APP_API_URL;

export const companyApiSlice = createApi({
  reducerPath: 'companyApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${baseUrl}/api`,
    prepareHeaders: (headers, { getState }) => {
      const token = getState().user?.userInfo?.token;
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }

      return headers;
    },
  }),
  endpoints: (builder) => ({
    // Lấy danh sách các công ty
    getCompanies: builder.query({
      query: () => '/companies',
    }),

    // Lấy chi tiết công ty theo ID
    getCompanyById: builder.query({
      query: (companyId) => `/companies/${companyId}`,
    }),

    // Tạo công ty mới
    createCompany: builder.mutation({
      query: (newCompany) => ({
        url: '/companies',
        method: 'POST',
        body: newCompany,
      }),
    }),

    // Cập nhật công ty
    updateCompany: builder.mutation({
      query: ({ companyId, updatedData }) => ({
        url: `/companies/${companyId}`,
        method: 'PUT',
        body: updatedData,
      }),
    }),

    // Thêm admin cho công ty
    addCompanyAdmin: builder.mutation({
      query: ({ companyId, userName, password, email, phoneNumber }) => ({
        url: '/companies/add-admin',
        method: 'POST',
        body: { companyId, userName, password, email, phoneNumber },
      }),
    }),
    toggleCompanyStatus: builder.mutation({
      query: (companyId) => ({
        url: `/companies/${companyId}/status`,
        method: 'PATCH',
      }),
    }),
    createVoucher: builder.mutation({
      query: (voucherData) => ({
        url: '/vouchers/create',
        method: 'POST',
        body: voucherData,
      }),
    }),
    toggleNewUserVoucher: builder.mutation({
      query: (allowNewUserVoucher) => ({
        url: '/system-settings/toggle-new-user-voucher',
        method: 'POST',
        body: { allowNewUserVoucher },
      }),
    }),
    addDriver: builder.mutation({
      query: ({ userName, password, email, phoneNumber, licenseNumber,fullName ,salaryRate, baseSalary }) => ({
        url: '/companies/add-driver',
        method: 'POST',
        body: { userName, password, email, phoneNumber, licenseNumber,fullName , baseSalary ,salaryRate },
      }),
    }),
      disableEmployee: builder.mutation({
      query: (userId) => ({
          url: `/companies/employees/${userId}/disable`,
          method: 'PATCH',
      }),
  }),
    getDrivers: builder.query({
        query: () => '/companies/drivers',
      }),   updateDriver: builder.mutation({
        query: ({ driverId, updatedData }) => ({
          url: `/companies/drivers/${driverId}`,
          method: 'PUT',
          body: updatedData,
        }),
      }),
      deleteDriver: builder.mutation({
        query: (driverId) => ({
          url: `/companies/drivers/${driverId}`,
          method: 'DELETE',
        }),
      }),

      //Thống kê
      getCompletedTripsByMonth: builder.query({
        query: () => '/companies/completed-trips-by-month',
      }),
      getRevenueByPaymentMethod: builder.query({
        query: () => '/companies/revenue-by-payment-method',
      }),
      getRevenueByTimeRange: builder.query({
        query: ({ startDate, endDate, timeFrame }) =>
          `/companies/revenue-by-time?startDate=${startDate}&endDate=${endDate}&timeFrame=${timeFrame}`,
      }),
      getTopBookingUsers: builder.query({
        query: () => '/companies/top-booking-users',
      }),
      getTopBookingUsersByTimeFrame: builder.query({
        query: ({ year, timeFrame }) =>
          `/companies/top-booking-users-by-timeframe?year=${year}&timeFrame=${timeFrame}`,
      }),
      calculateAndRecordDriverSalary: builder.mutation({
        query: ({ userId, startDate, endDate , bonuses , deductions }) => ({
          url: '/companies/calculate-salary',
          method: 'POST',
          body: { userId, startDate, endDate ,bonuses ,deductions },
        }),
      }),
     getNotifications: builder.query({
        query: ({ page = 1, limit = 10 }) => {
                return `/companies/notifications?page=${page}&limit=${limit}`;
            },
    }),
    getBookingStatsAndUsers: builder.query({
      query: () => '/companies/bookings',
    }),
    getTripRequestsForCompany: builder.query({
      query: () => '/companies/trip-requests',
    }),
   
    approveTripRequest: builder.mutation({
    query: ({ requestId, ...data }) => ({
      url: `/companies/trip-requests/${requestId}/approve`,
      method: 'PATCH',
      body: data,
    }),
    }),
    rejectTripRequest: builder.mutation({
      query: ({ requestId, reason }) => ({
        url: `/companies/trip-requests/${requestId}/reject`,
        method: 'PATCH',
        body: { reason },
      }),
    }),
    getRevenueComparison: builder.query({
      query: () => '/companies/revenue/comparison',
    }),
    getCancelledStats: builder.query({
      query: () => "/companies/cancelled-stats",
    }),
    getCompanyExpenses: builder.query({
      query: () => '/companies/expenses',
    }),
    updateExpenseStatus: builder.mutation({
      query: ({ expenseId, status }) => ({
        url: `/companies/expenses/${expenseId}/status`,
        method: 'PATCH',
        body: { status },
      }),
    }),
    getExpenseComparison: builder.query({
      query: () => '/companies/expenses/comparison',
    }),
    getTripPassengers: builder.query({
      query: (tripId) => `/companies/trips/${tripId}/passengers`,
    }),
    collectPayment: builder.mutation({
    query: (bookingId) => ({
        url: `/companies/bookings/${bookingId}/collect-payment`,
        method: 'PATCH',
    }),
  }),
  getCompanyFeedbacks: builder.query({
    query: ({ page = 1, limit = 10 }) => `/companies/feedbacks?page=${page}&limit=${limit}`,
  }),
  getRankedRoutes: builder.query({
    query: () => '/companies/most-booked-route',
  }),
  }),
});

export const {
  useGetCompaniesQuery,
  useGetCompanyByIdQuery,
  useCreateCompanyMutation,
  useUpdateCompanyMutation,
  useAddCompanyAdminMutation,
  useToggleNewUserVoucherMutation,
  useToggleCompanyStatusMutation,
  useCreateVoucherMutation,
  useAddDriverMutation,
  useGetDriversQuery,
  useUpdateDriverMutation,
  useDeleteDriverMutation,
  useGetCompletedTripsByMonthQuery,
  useGetRevenueByPaymentMethodQuery,
  useGetRevenueByTimeRangeQuery,
  useDisableEmployeeMutation,
  useGetTopBookingUsersQuery,
  useGetTopBookingUsersByTimeFrameQuery,
  useCalculateAndRecordDriverSalaryMutation,
  useGetNotificationsQuery,
  useGetBookingStatsAndUsersQuery,
  useGetTripRequestsForCompanyQuery,
  useApproveTripRequestMutation,
  useRejectTripRequestMutation, 
  useGetRevenueComparisonQuery,
  useGetCancelledStatsQuery,
  useGetCompanyExpensesQuery, 
  useUpdateExpenseStatusMutation,
  useGetExpenseComparisonQuery,
  useGetTripPassengersQuery,
  useCollectPaymentMutation,
  useGetCompanyFeedbacksQuery,
  useGetRankedRoutesQuery,
} = companyApiSlice;
