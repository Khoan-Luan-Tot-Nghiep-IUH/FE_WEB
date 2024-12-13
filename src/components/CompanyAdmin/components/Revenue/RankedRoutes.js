import React from 'react';
import { useGetRankedRoutesQuery } from '../../../../Redux/Company/companyApiSlice';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Đăng ký các thành phần Chart.js cần thiết
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const RankedRoutes = () => {
  const { data, isLoading, isError, error } = useGetRankedRoutesQuery();

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error?.message || 'Có lỗi xảy ra!'}</div>;

  // Chuẩn bị dữ liệu cho biểu đồ
  const labels = data?.data.map((route) => `${route.route.departure} - ${route.route.arrival}`);
  const totalSeats = data?.data.map((route) => route.totalSeatsBooked);

  // Tạo màu sắc cho từng mức top
  const colors = totalSeats.map((_, index) => {
    if (index === 0) return 'rgba(255, 223, 0, 0.8)'; // Top 1: Vàng
    if (index === 1) return 'rgba(255, 165, 0, 0.8)'; // Top 2: Cam
    if (index === 2) return 'rgba(255, 69, 0, 0.8)';  // Top 3: Đỏ
    return 'rgba(75, 192, 192, 0.5)'; // Các vị trí khác: Xanh nhạt
  });

  const chartData = {
    labels,
    datasets: [
      {
        label: 'Số lượng vé đặt',
        data: totalSeats,
        backgroundColor: colors, // Sử dụng mảng màu sắc
        borderColor: colors.map((color) => color.replace('0.8', '1')), // Border màu sắc tương ứng
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
      title: {
        display: true,
        text: 'Tuyến đường được đặt vé nhiều nhất',
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            return `${context.dataset.label}: ${context.raw} vé`;
          },
        },
      },
    },
  };

  return (
    <div>
      <Bar data={chartData} options={chartOptions} />
    </div>
  );
};

export default RankedRoutes;
