import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useGetBusTypesQuery } from '../../../../Redux/Bustype/BusTypeApiSlice';
import { Drawer, Button, Table } from 'antd'; 
import BusTypeForm from './BusTypeForm'; 

const BusTypeList = () => {
  const companyId = useSelector((state) => state.user?.userInfo?.companyId);
  const { data: response, isLoading, error } = useGetBusTypesQuery({ companyId });

  // Lấy dữ liệu từ API trả về
  const busTypes = response?.data || [];

  // State để điều khiển Drawer
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [selectedBusType, setSelectedBusType] = useState(null); // Lưu trữ loại xe được chọn khi chỉnh sửa

  if (isLoading) return <p>Đang tải dữ liệu...</p>;
  if (error) return <p>Lỗi khi tải dữ liệu: {error.message}</p>;

  // Hàm mở Drawer và đặt form vào chế độ thêm mới
  const showDrawer = () => {
    setSelectedBusType(null);
    setDrawerVisible(true);
  };

  // Hàm đóng Drawer
  const closeDrawer = () => {
    setDrawerVisible(false);
  };

  // Cấu hình các cột cho bảng loại xe
  const columns = [
    {
      title: 'Tên Loại Xe',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Mô Tả',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Số Ghế',
      dataIndex: 'seats',
      key: 'seats',
    },
    {
      title: 'Số Tầng',
      dataIndex: 'floorCount',
      key: 'floorCount',
    },
    {
      title: 'Thao Tác',
      key: 'action',
      render: (text, record) => (
        <Button type="link" onClick={() => handleEdit(record)}>
          Sửa
        </Button>
      ),
    },
  ];

  // Hàm chỉnh sửa loại xe
  const handleEdit = (busType) => {
    setSelectedBusType(busType);
    setDrawerVisible(true);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-700">Danh Sách Các Loại Xe</h1>
        <Button type="primary" onClick={showDrawer}>
          Thêm Loại Xe Mới
        </Button>
      </div>
      
      {/* Bảng hiển thị danh sách loại xe */}
      <Table dataSource={busTypes} columns={columns} rowKey="_id" pagination={false} />

      {/* Drawer chứa form thêm hoặc chỉnh sửa */}
      <Drawer
        title={selectedBusType ? 'Chỉnh Sửa Loại Xe' : 'Thêm Loại Xe Mới'}
        width={500}
        onClose={closeDrawer}
        visible={drawerVisible}
        destroyOnClose
      >
        <BusTypeForm busType={selectedBusType} closeDrawer={closeDrawer} />
      </Drawer>
    </div>
  );
};

export default BusTypeList;
