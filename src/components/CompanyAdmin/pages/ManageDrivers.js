import React, { useState, useEffect } from 'react';
import { useGetDriversQuery } from '../../../Redux/Company/companyApiSlice';
import { Button, Table, Typography, Space, Spin, notification, Alert } from 'antd';
import AddDriverDrawer from '../components/ManageDriver/AddDriverDrawer';

const { Title } = Typography;

const ManageDrivers = () => {
  const { data: driversData, isLoading, isError, refetch } = useGetDriversQuery();
  const [drivers, setDrivers] = useState([]);
  const [drawerVisible, setDrawerVisible] = useState(false);

  useEffect(() => {
    if (driversData && driversData.drivers) {
      setDrivers(driversData.drivers);
    }
  }, [driversData]);

  const handleAddDriverClick = () => {
    setDrawerVisible(true);
  };

  const handleCloseDrawer = () => {
    setDrawerVisible(false);
  };

  // Hàm callback để cập nhật danh sách tài xế mới
  const handleAddDriverSuccess = (newDriver) => {
    setDrivers((prevDrivers) => [...prevDrivers, newDriver]);
    refetch(); // Lấy lại danh sách nếu cần thiết
    notification.success({
      message: 'Thêm tài xế thành công',
      description: `Tài xế ${newDriver.userId.fullName} đã được thêm thành công.`,
    });
  };

  const columns = [
    {
      title: 'Tên tài xế',
      dataIndex: ['userId', 'fullName'],
      key: 'fullName',
    },
    {
      title: 'Email',
      dataIndex: ['userId', 'email'],
      key: 'email',
    },
    {
      title: 'Số điện thoại',
      dataIndex: ['userId', 'phoneNumber'],
      key: 'phoneNumber',
    },
    {
      title: 'Giấy phép lái xe',
      dataIndex: 'licenseNumber',
      key: 'licenseNumber',
    },
    {
      title: 'Thao tác',
      key: 'action',
      render: (text, record) => (
        <Space size="middle">
          <Button type="link">Sửa</Button>
          <Button type="link" danger>Xóa</Button>
        </Space>
      ),
    },
  ];

  return (
    <div className="manage-drivers bg-white p-6 shadow-md rounded-lg">
      <div className="flex justify-between items-center mb-6">
        <Title level={3} className="text-gray-700">Quản Lý Tài Xế</Title>
        <Button type="primary" onClick={handleAddDriverClick}>
          Thêm Tài Xế Mới
        </Button>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center py-10">
          <Spin tip="Đang tải danh sách tài xế..." size="large" />
        </div>
      ) : isError ? (
        <div className="flex justify-center items-center py-10">
          <Alert message="Có lỗi xảy ra khi tải danh sách tài xế" description={isError.message} type="error" showIcon />
        </div>
      ) : (
        <Table
          dataSource={drivers}
          columns={columns}
          rowKey="_id"
          pagination={{ pageSize: 5 }}
        />
      )}

      <AddDriverDrawer
        visible={drawerVisible}
        onClose={handleCloseDrawer}
        onAddDriverSuccess={handleAddDriverSuccess}
      />
    </div>
  );
};

export default ManageDrivers;
