import React, { useEffect } from 'react';
import { Table, Button, Tag, Space, Spin } from 'antd';
import { useGetAllUsersByLastLoginQuery } from '../../../Redux/User/apiSlice'; // Chỉnh đường dẫn nếu cần
import moment from 'moment';

const ManageUsers = () => {
  const { data: usersData, isLoading, refetch } = useGetAllUsersByLastLoginQuery();

  // Định nghĩa các cột cho bảng người dùng
  const columns = [
    {
      title: 'Tên người dùng',
      dataIndex: 'userName',
      key: 'userName',
      render: (text) => <span className="font-semibold">{text}</span>,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Vai trò',
      dataIndex: 'roleId',
      key: 'roleId',
      render: (roleId) => {
        let color = roleId === 'superadmin' ? 'volcano' : roleId === 'companyadmin' ? 'green' : 'blue';
        return <Tag color={color}>{roleId.toUpperCase()}</Tag>;
      },
    },
    {
      title: 'Ngày đăng nhập cuối',
      dataIndex: 'lastLogin',
      key: 'lastLogin',
      render: (lastLogin) => (lastLogin ? moment(lastLogin).format('DD-MM-YYYY HH:mm') : 'Chưa đăng nhập'),
    },
    {
      title: 'Trạng thái',
      dataIndex: 'isActive',
      key: 'isActive',
      render: (isActive) => (
        <Tag color={isActive ? 'green' : 'red'}>
          {isActive ? 'Hoạt động' : 'Vô hiệu hóa'}
        </Tag>
      ),
    },
    {
      title: 'Hành động',
      key: 'action',
      render: (record) => (
        <Space size="middle">
          <Button type="primary" onClick={() => handleEditUser(record)}>
            Sửa
          </Button>
          <Button danger onClick={() => handleToggleStatus(record)}>
            {record.isActive ? 'Vô hiệu hóa' : 'Kích hoạt'}
          </Button>
        </Space>
      ),
    },
  ];

  const handleEditUser = (user) => {
    // Logic mở modal hoặc điều hướng đến trang chỉnh sửa người dùng
    console.log('Chỉnh sửa người dùng:', user);
  };

  const handleToggleStatus = async (user) => {
    try {
      // Gọi API để cập nhật trạng thái của người dùng
      console.log('Thay đổi trạng thái người dùng:', user);
    } catch (error) {
      console.error('Không thể thay đổi trạng thái:', error);
    }
  };

  useEffect(() => {
    // Hàm refetch để cập nhật lại dữ liệu
    refetch();
  }, [refetch]);

  return (
    <div className="p-6 bg-gradient-to-r from-blue-50 to-blue-100 min-h-screen">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-3xl font-bold">Quản lý người dùng</h2>
        <Button type="primary" onClick={refetch}>
          Cập nhật danh sách
        </Button>
      </div>
      
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <Spin size="large" />
        </div>
      ) : (
        <Table 
          columns={columns} 
          dataSource={Array.isArray(usersData?.users) ? usersData.users : []} 
          rowKey={(record) => record._id} 
          className="bg-white shadow-lg rounded-lg overflow-hidden"
          pagination={{ pageSize: 10 }}
        />
      )}
    </div>
  );
};

export default ManageUsers;
