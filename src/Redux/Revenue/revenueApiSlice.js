import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Tạo API slice cho thống kê doanh thu
export const revenueApi = createApi({
  reducerPath: 'revenueApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api',  // Đường dẫn API cơ sở
    prepareHeaders: (headers, { getState }) => {
      const token = getState().user?.userInfo?.token; // Lấy token từ Redux state
      if (token) {
        headers.set('Authorization', `Bearer ${token}`); // Thêm token vào header nếu có
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getRevenueStatistics: builder.query({
      query: ({ fromDate, toDate }) => ({
        url: '/statistics/revenue',
        params: { fromDate, toDate },
      }),
    }),
  }),
});

export const { useGetRevenueStatisticsQuery } = revenueApi;
