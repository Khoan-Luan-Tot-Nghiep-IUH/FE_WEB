import React, { useState, useEffect } from 'react';
import { useGetRevenueByPaymentMethodQuery, useGetRevenueByTimeRangeQuery } from '../../../../Redux/Company/companyApiSlice';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';
import { Spin, Alert, Typography, Select, DatePicker, Space } from 'antd';
import moment from 'moment';

const { Title, Text } = Typography;
const { Option } = Select;
const { RangePicker } = DatePicker;

const COLORS = ['#4f85f1', '#82ca9d']; // Colors for the pie chart segments

const RevenueChart = () => {
  const [timeFrame, setTimeFrame] = useState('month');
  const [dates, setDates] = useState([moment().startOf('month').format('YYYY-MM-DD'), moment().endOf('month').format('YYYY-MM-DD')]);

  // Update date range based on selected time frame
  useEffect(() => {
    if (timeFrame === 'day') {
      setDates([moment().subtract(1, 'days').format('YYYY-MM-DD'), moment().format('YYYY-MM-DD')]);
    } else if (timeFrame === 'month') {
      setDates([moment().startOf('month').format('YYYY-MM-DD'), moment().endOf('month').format('YYYY-MM-DD')]);
    } else if (timeFrame === 'year') {
      setDates([moment().startOf('year').format('YYYY-MM-DD'), moment().endOf('year').format('YYYY-MM-DD')]);
    }
  }, [timeFrame]);

  const { data: revenueData, isLoading: loadingRevenue, error: errorRevenue } = useGetRevenueByPaymentMethodQuery();
  const { data: timeRevenueData, isLoading: loadingTimeRevenue, error: errorTimeRevenue } = useGetRevenueByTimeRangeQuery({
    startDate: dates[0],
    endDate: dates[1],
    timeFrame,
  });

  const totalRevenue = revenueData?.data?.reduce((sum, item) => sum + item.revenue, 0) || 0;
  const paymentMethodData = revenueData?.data?.map((item) => ({
    name: item.method === 'OnBoard' ? 'Thanh toán trực tiếp' : 'Thanh toán trực tuyến',
    value: item.revenue,
  }));

  const timeRevenueChartData = timeRevenueData?.data?.map((item) => ({
    period: item.date,
    revenue: item.revenue,
  }));

  const onDateRangeChange = (dates, dateStrings) => {
    setDates(dateStrings);
  };

  if (loadingRevenue || loadingTimeRevenue) return <Spin tip="Đang tải dữ liệu biểu đồ doanh thu..." />;
  if (errorRevenue || errorTimeRevenue) return <Alert message="Lỗi khi tải dữ liệu doanh thu" type="error" showIcon />;

  return (
    <div style={{ display: 'flex', gap: '20px', padding: '20px', background: '#fff', borderRadius: '8px' }}>
      {/* Time-based revenue bar chart */}
      <div style={{ flex: 1 }}>
        <Title level={4} style={{ textAlign: 'center' }}>Doanh thu theo {timeFrame === 'month' ? 'tháng' : timeFrame === 'year' ? 'năm' : 'ngày'}</Title>
        <Space direction="vertical" style={{ width: '100%', marginBottom: 20 }}>
          <Select
            defaultValue="month"
            style={{ width: '100%' }}
            onChange={(value) => setTimeFrame(value)}
          >
            <Option value="day">Theo ngày</Option>
            <Option value="month">Theo tháng</Option>
            <Option value="year">Theo năm</Option>
          </Select>
          <RangePicker
            style={{ width: '100%' }}
            onChange={onDateRangeChange}
            format="YYYY-MM-DD"
            value={[moment(dates[0]), moment(dates[1])]} // Display selected dates
          />
        </Space>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={timeRevenueChartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="period" />
            <YAxis />
            <Tooltip formatter={(value) => `${value.toLocaleString('vi-VN')} VND`} />
            <Bar dataKey="revenue" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Payment method revenue pie chart */}
      <div style={{ flex: 1 }}>
        <Title level={4} style={{ textAlign: 'center' }}>Tỷ lệ doanh thu theo phương thức thanh toán</Title>
        <Text strong style={{ display: 'block', textAlign: 'center', fontSize: '18px', marginBottom: '20px' }}>
          Tổng doanh thu: {totalRevenue.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
        </Text>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={paymentMethodData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              fill="#8884d8"
              label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(1)}%`}
            >
              {paymentMethodData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip formatter={(value) => `${value.toLocaleString('vi-VN')} VND`} />
            <Legend verticalAlign="bottom" height={36} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default RevenueChart;
