import React, { useState, useEffect } from 'react';
import { useGetDriversQuery } from '../../../Redux/Company/companyApiSlice';
import { Button, Table } from 'antd';
import AddDriverDrawer from '../components/ManageDriver/AddDriverDrawer';

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
    refetch();  // Lấy lại danh sách nếu cần thiết
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
        <>
          <Button type="link">Sửa</Button>
          <Button type="link" danger>Xóa</Button>
        </>
      ),
    },
  ];

  return (
    <div className="manage-drivers">
      <h2>Quản Lý Tài Xế</h2>
      <Button type="primary" onClick={handleAddDriverClick}>
        Thêm Tài Xế Mới
      </Button>

      <Table
        dataSource={drivers}
        columns={columns}
        rowKey="_id"
        loading={isLoading}
      />

      <AddDriverDrawer
        visible={drawerVisible}
        onClose={handleCloseDrawer}
        onAddDriverSuccess={handleAddDriverSuccess}
      />
    </div>
  );
};

export default ManageDrivers;
