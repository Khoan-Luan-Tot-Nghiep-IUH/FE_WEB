import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Lấy base URL từ biến môi trường
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
    addDriver: builder.mutation({
      query: ({ userName, password, email, phoneNumber, licenseNumber,fullName ,salaryRate, baseSalary }) => ({
        url: '/companies/add-driver',
        method: 'POST',
        body: { userName, password, email, phoneNumber, licenseNumber,fullName , baseSalary ,salaryRate },
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
  
      // Xóa tài xế
      deleteDriver: builder.mutation({
        query: (driverId) => ({
          url: `/companies/drivers/${driverId}`,
          method: 'DELETE',
        }),
      }),
    }),
});

export const {
  useGetCompaniesQuery,
  useGetCompanyByIdQuery,
  useCreateCompanyMutation,
  useUpdateCompanyMutation,
  useAddCompanyAdminMutation,
  useToggleCompanyStatusMutation,
  useAddDriverMutation,
  useGetDriversQuery,
  useUpdateDriverMutation,
  useDeleteDriverMutation,
} = companyApiSlice;
