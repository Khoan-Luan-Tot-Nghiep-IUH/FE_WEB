import React, { useState, useEffect } from 'react';
import { useGetRevenueByPaymentMethodQuery, useGetRevenueByTimeRangeQuery } from '../../../../Redux/Company/companyApiSlice';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';
import { Spin, Alert, Typography, Select, DatePicker, Space, Card, Divider } from 'antd';
import moment from 'moment';

const { Title, Text } = Typography;
const { Option } = Select;
const COLORS = ['#4f85f1', '#82ca9d'];

const RevenueChart = () => {
  const currentYear = moment().year();
  const currentMonth = moment().month() + 1;
  const [timeFrame, setTimeFrame] = useState('month');
  const [selectedDate, setSelectedDate] = useState({
    day: moment().format('YYYY-MM-DD'),
    month: currentMonth,
    year: currentYear,
  });

  const [dates, setDates] = useState({
    startDate: moment().startOf('month').format('YYYY-MM-DD'),
    endDate: moment().endOf('month').format('YYYY-MM-DD'),
  });

  useEffect(() => {
    let startDate, endDate;

    if (timeFrame === 'day') {
      startDate = selectedDate.day;
      endDate = selectedDate.day;
    } else if (timeFrame === 'month') {
      startDate = moment()
        .year(selectedDate.year)
        .month(selectedDate.month - 1)
        .startOf('month')
        .format('YYYY-MM-DD');
      endDate = moment()
        .year(selectedDate.year)
        .month(selectedDate.month - 1)
        .endOf('month')
        .format('YYYY-MM-DD');
    } else if (timeFrame === 'year') {
      startDate = moment().year(selectedDate.year).startOf('year').format('YYYY-MM-DD');
      endDate = moment().year(selectedDate.year).endOf('year').format('YYYY-MM-DD');
    }

    setDates({ startDate, endDate });
  }, [timeFrame, selectedDate]);

  const handleDateChange = (type, value) => {
    if (type === 'day') {
      setSelectedDate((prev) => ({
        ...prev,
        day: value ? value.format('YYYY-MM-DD') : prev.day,
      }));
    } else if (type === 'month') {
      setSelectedDate((prev) => ({
        ...prev,
        month: value,
        day: moment(`${prev.year}-${value}-01`).format('YYYY-MM-DD'),
      }));
    } else if (type === 'year') {
      setSelectedDate((prev) => ({
        ...prev,
        year: value,
        day: moment(`${value}-${prev.month}-01`).format('YYYY-MM-DD'),
      }));
    }
  };

  const { data: revenueData, isLoading: loadingRevenue, error: errorRevenue } = useGetRevenueByPaymentMethodQuery(undefined, {
    refetchOnReconnect: true,
    refetchOnMountOrArgChange: true,
  });

  const { data: timeRevenueData, isLoading: loadingTimeRevenue, error: errorTimeRevenue } = useGetRevenueByTimeRangeQuery({
    startDate: dates.startDate,
    endDate: dates.endDate,
    timeFrame,
  }, {
    refetchOnReconnect: true,
    refetchOnMountOrArgChange: true,
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

  if (loadingRevenue || loadingTimeRevenue) return <Spin tip="Đang tải dữ liệu biểu đồ doanh thu..." />;
  if (errorRevenue || errorTimeRevenue) return <Alert message="Lỗi khi tải dữ liệu doanh thu" type="error" showIcon />;

  return (
    <Card style={{ borderRadius: '10px', padding: '20px' }}>
      <Title level={3} style={{ textAlign: 'center', marginBottom: '20px' }}>Báo Cáo Doanh Thu</Title>
      <Divider />

      <div style={{ display: 'flex', justifyContent: 'space-between', gap: '20px' }}>
        <Space direction="vertical" style={{ flex: 1 }}>
          <Text strong>Chọn Thời Gian</Text>
          <Select
            defaultValue="month"
            style={{ width: '100%' }}
            onChange={(value) => setTimeFrame(value)}
          >
            <Option value="day">Theo ngày</Option>
            <Option value="month">Theo tháng</Option>
            <Option value="year">Theo năm</Option>
          </Select>

          {timeFrame === 'day' && (
            <DatePicker
              style={{ width: '100%' }}
              onChange={(date) => handleDateChange('day', date)}
              value={moment(selectedDate.day)}
              format="YYYY-MM-DD"
              disabledDate={(current) => current && current > moment().endOf('day')}
            />
          )}

          {timeFrame === 'month' && (
            <Space>
              <Select
                style={{ width: 120 }}
                value={selectedDate.month}
                onChange={(value) => handleDateChange('month', value)}
              >
                {[...Array(12)].map((_, i) => (
                  <Option key={i + 1} value={i + 1}>
                    Tháng {i + 1}
                  </Option>
                ))}
              </Select>
              <Select
                style={{ width: 120 }}
                value={selectedDate.year}
                onChange={(value) => handleDateChange('year', value)}
              >
                {[currentYear - 1, currentYear, currentYear + 1].map((year) => (
                  <Option key={year} value={year}>
                    Năm {year}
                  </Option>
                ))}
              </Select>
            </Space>
          )}

          {timeFrame === 'year' && (
            <Select
              style={{ width: '100%' }}
              value={selectedDate.year}
              onChange={(value) => handleDateChange('year', value)}
            >
              {[currentYear - 1, currentYear, currentYear + 1].map((year) => (
                <Option key={year} value={year}>
                  Năm {year}
                </Option>
              ))}
            </Select>
          )}
        </Space>

        <div style={{ flex: 3, paddingLeft: '20px' }}>
          <Title level={5} style={{ textAlign: 'center' }}>Doanh Thu Theo {timeFrame === 'month' ? 'Tháng' : timeFrame === 'year' ? 'Năm' : 'Ngày'}</Title>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={timeRevenueChartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="period" />
              <YAxis />
              <Tooltip formatter={(value) => `${value.toLocaleString('vi-VN')} VND`} />
              <Bar dataKey="revenue" fill="#4f85f1" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <Divider />

      <div>
        <Title level={5} style={{ textAlign: 'center', marginBottom: '20px' }}>Tỷ Lệ Doanh Thu Theo Phương Thức Thanh Toán</Title>
        <Text strong style={{ display: 'block', textAlign: 'center', fontSize: '18px', marginBottom: '20px' }}>
          Tổng Doanh Thu: {totalRevenue.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
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
    </Card>
  );
};

export default RevenueChart;
