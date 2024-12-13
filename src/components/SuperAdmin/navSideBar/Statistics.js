import React from 'react';
import { Tabs } from 'antd'; // Import Ant Design Tabs
import { Bar, Pie } from 'react-chartjs-2';
import { useGetRevenueByCompanyQuery, useGetCancellationStatisticsQuery } from '../../../Redux/Revenue/revenueApiSlice'; // Import hooks from RTK Query
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Register chart components
ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend);

const { TabPane } = Tabs;

const Statistics = () => {
  // Fetch revenue data
  const { data: revenueData, error: revenueError, isLoading: revenueLoading } = useGetRevenueByCompanyQuery({});

  // Fetch cancellation statistics data
  const { data: cancellationData, error: cancellationError, isLoading: cancellationLoading } = useGetCancellationStatisticsQuery({});

  // Revenue Chart Data
  const revenueChartData = {
    labels: revenueData?.data.map((item) => item.companyName),
    datasets: [
      {
        label: 'Tổng Doanh Thu',
        data: revenueData?.data.map((item) => item.totalRevenue),
        backgroundColor: 'rgba(54, 162, 235, 0.5)',
      },
      {
        label: 'Doanh Thu Online',
        data: revenueData?.data.map((item) => item.onlineRevenue || 0),
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
      },
      {
        label: 'Doanh Thu OnBoard',
        data: revenueData?.data.map((item) => item.onboardRevenue || 0),
        backgroundColor: 'rgba(255, 206, 86, 0.5)',
      },
    ],
  };

  const revenueChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Thống kê doanh thu các công ty',
      },
    },
  };

  // Cancellation Chart Data
  const cancellationChartData = {
    labels: cancellationData?.data.map((item) => item.companyName),
    datasets: [
      {
        label: 'Tỷ lệ hủy (%)',
        data: cancellationData?.data.map((item) => item.cancellationPercentage),
        backgroundColor: [
          'rgba(255, 99, 132, 0.5)',
          'rgba(54, 162, 235, 0.5)',
          'rgba(255, 206, 86, 0.5)',
          'rgba(75, 192, 192, 0.5)',
          'rgba(153, 102, 255, 0.5)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const cancellationChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Tỷ lệ hủy vé theo công ty (%)',
      },
    },
  };

  return (
    <div className="statistics-container">
      <h1 className="text-2xl font-bold mb-6">Thống kê</h1>
      <Tabs defaultActiveKey="1">
        {/* Tab 1: Revenue */}
        <TabPane tab="Doanh Thu" key="1">
          {revenueLoading ? (
            <p>Loading...</p>
          ) : revenueError ? (
            <p>Error: {revenueError.message}</p>
          ) : (
            <div className="chart-container bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-lg font-semibold mb-4">Thống kê doanh thu các công ty</h2>
              <Bar data={revenueChartData} options={revenueChartOptions} />
            </div>
          )}
        </TabPane>

        {/* Tab 2: Cancellations */}
        <TabPane tab="Hủy Vé" key="2">
          {cancellationLoading ? (
            <p>Loading...</p>
          ) : cancellationError ? (
            <p>Error: {cancellationError.message}</p>
          ) : (
            <div className="chart-container bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-lg font-semibold mb-4">Thống kê tỷ lệ hủy vé</h2>
              <Pie data={cancellationChartData} options={cancellationChartOptions} />
            </div>
          )}
        </TabPane>
      </Tabs>
    </div>
  );
};

export default Statistics;
