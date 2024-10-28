import React from 'react';
import { useGetRevenueStatisticsQuery } from '../../../Redux/Revenue/revenueApiSlice'; // Import hook từ slice RTK Query

const Statistics = () => {
  // Gọi API để lấy dữ liệu thống kê doanh thu
  const { data, error, isLoading } = useGetRevenueStatisticsQuery({ });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="statistics-container">
      <h1 className="text-2xl font-bold mb-4">Thống kê doanh thu</h1>
      <div className="statistics-details">
        <p>Tổng doanh thu: {data?.data.totalRevenue} VND</p>
        <p>Tổng số lương đặt vé: {data?.data.totalBookings}</p>
      </div>
    </div>
  );
};

export default Statistics;
