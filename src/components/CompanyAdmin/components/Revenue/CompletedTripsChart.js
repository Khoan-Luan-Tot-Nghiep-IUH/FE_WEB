import React from 'react';
import { useGetCompletedTripsByMonthQuery } from '../../../../Redux/Company/companyApiSlice';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Legend,
  LabelList,
  defs,
  linearGradient,
  stop,
} from 'recharts';
import { Spin, Alert } from 'antd';

const CompletedTripsChart = () => {
  const { data: responseData, error, isLoading } = useGetCompletedTripsByMonthQuery();

  if (isLoading) return <Spin tip="Đang tải biểu đồ..." />;
  if (error) return <Alert message="Lỗi khi tải dữ liệu" type="error" showIcon />;

  // Chuyển đổi dữ liệu thành dạng phù hợp cho biểu đồ
  const chartData = responseData?.data?.map((trips, index) => ({
    month: new Date(0, index).toLocaleString('vi', { month: 'short' }), // Chuyển index thành tên tháng viết tắt
    completedTrips: trips, // Số chuyến đi hoàn thành trong mỗi tháng
  }));

  return (
    <div
      className="chart-container"
      style={{
        padding: '20px',
        background: '#fff',
        borderRadius: '8px',
        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
      }}
    >
      <h3 style={{ textAlign: 'center', fontSize: '20px', marginBottom: '20px', color: '#333' }}>
        Số Chuyến Đi Hoàn Thành Theo Tháng
      </h3>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 10 }}>
          {/* Gradient màu cho cột biểu đồ */}
          <defs>
            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#4f85f1" stopOpacity={0.9} />
              <stop offset="95%" stopColor="#4f85f1" stopOpacity={0.5} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
          <XAxis dataKey="month" tick={{ fontSize: 14 }} />
          <YAxis
            tick={{ fontSize: 14 }}
            label={{
              value: 'Số chuyến đi hoàn thành',
              angle: -90,
              position: 'insideLeft',
              
              fontSize: 14,
              color: '#333',
            }}
            allowDecimals={false}
            domain={[0, 'dataMax']}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: '#555',
              color: '#fff',
              borderRadius: '5px',
              border: 'none',
              fontSize: 14,
            }}
            labelStyle={{ color: '#fff', fontWeight: 'bold' }}
            formatter={(value) => `${value} chuyến`}
            labelFormatter={(label) => ` ${label}   `}
          />
          <Legend verticalAlign="top" height={36} formatter={() => 'Số chuyến đi'} />
          <Bar dataKey="completedTrips" fill="url(#colorUv)" radius={[4, 4, 0, 0]} barSize={40}>
            <LabelList dataKey="completedTrips" position="top" style={{ fontSize: 12, fill: '#333', fontWeight: 'bold' }} />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CompletedTripsChart;
