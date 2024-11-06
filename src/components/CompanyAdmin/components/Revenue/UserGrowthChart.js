import React from 'react';
import { useGetTopBookingUsersQuery } from '../../../../Redux/Company/companyApiSlice';
import { Table, Typography, Card } from 'antd';

const { Title } = Typography;

const Top10UsersTable = () => {
  const { data, isLoading, isError } = useGetTopBookingUsersQuery();

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error loading data...</p>;

  const columns = [
    {
      title: 'STT',
      dataIndex: 'rank',
      key: 'rank',
      align: 'center',
      render: (_, __, index) => {
        const rank = index + 1;
        return (
          <span style={{ fontWeight: rank <= 3 ? 'bold' : 'normal', color: rank <= 3 ? '#d48806' : 'inherit' }}>
            {rank}
          </span>
        );
      },
    },
    {
      title: 'Tên người dùng',
      dataIndex: 'userName',
      key: 'userName',
      render: (text, record, index) => (
        <span style={{ fontWeight: index < 3 ? 'bold' : 'normal', color: index < 3 ? '#d48806' : 'inherit' }}>
          {text}
        </span>
      ),
    },
    {
      title: 'Tổng doanh thu',
      dataIndex: 'totalRevenue',
      key: 'totalRevenue',
      align: 'right',
      render: (value) => (
        <span style={{ color: '#3f8600', fontWeight: 'bold' }}>
          {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value)}
        </span>
      ),
    },
  ];

  const tableData = data?.data.map((user, index) => ({
    key: index,
    userName: user._id.fullName,
    totalRevenue: user.totalRevenue,
  }));

  return (
    <Card
      style={{
        maxWidth: '600px',
        padding: '16px',
        boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
        borderRadius: '8px',
        backgroundColor: '#f5f5f5',
      }}
    >
      <Title level={4} style={{ textAlign: 'center', color: '#1890ff', marginBottom: '16px', fontSize: '18px' }}>
        Top 10 Người Dùng Đặt Vé Nhiều Nhất
      </Title>
      <Table
        columns={columns}
        dataSource={tableData}
        pagination={false}
        bordered
        size="small"
        rowKey="key"
        rowClassName={(record, index) => (index % 2 === 0 ? 'table-row-light' : 'table-row-dark')}
        style={{ backgroundColor: '#fff', fontSize: '12px' }}
      />
    </Card>
  );
};

export default Top10UsersTable;
