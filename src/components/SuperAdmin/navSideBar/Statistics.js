import React from 'react';
import { Bar, Line, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, LineElement, PointElement, ArcElement } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, LineElement, PointElement, ArcElement);

const Statistics = () => {
  const barChartData = {
    labels: ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6'],
    datasets: [
      {
        label: 'Doanh thu (triệu VND)',
        data: [30, 45, 60, 50, 70, 90],
        backgroundColor: '#4A90E2',
        borderColor: '#357ABD',
        borderWidth: 1,
      },
    ],
  };

  const barChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
      title: {
        display: true,
        text: 'Doanh thu hàng tháng',
      },
    },
  };

  // Fake Data for Line Chart
  const lineChartData = {
    labels: ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6'],
    datasets: [
      {
        label: 'Số lượng người dùng mới',
        data: [50, 65, 80, 120, 100, 150],
        fill: false,
        borderColor: '#50E3C2',
        tension: 0.3,
      },
    ],
  };

  const lineChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
      title: {
        display: true,
        text: 'Số lượng người dùng mới mỗi tháng',
      },
    },
  };

  // Fake Data for Pie Chart
  const pieChartData = {
    labels: ['Công ty A', 'Công ty B', 'Công ty C'],
    datasets: [
      {
        label: 'Tỷ lệ doanh thu',
        data: [300, 150, 100],
        backgroundColor: ['#4A90E2', '#50E3C2', '#F5A623'],
        hoverOffset: 4,
      },
    ],
  };

  const pieChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
      title: {
        display: true,
        text: 'Tỷ lệ doanh thu theo công ty',
      },
    },
  };

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-6">Thống kê doanh thu và người dùng</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Bar Chart */}
        <div className="bg-white shadow-lg rounded-lg p-4">
          <Bar data={barChartData} options={barChartOptions} />
        </div>

        {/* Line Chart */}
        <div className="bg-white shadow-lg rounded-lg p-4">
          <Line data={lineChartData} options={lineChartOptions} />
        </div>
      </div>

      {/* Pie Chart */}
      <div className="bg-white shadow-lg rounded-lg p-4 mt-8">
        <Pie data={pieChartData} options={pieChartOptions} />
      </div>
    </div>
  );
};

export default Statistics;
