import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useGetBusTypesQuery, useDeleteBusTypeMutation } from '../../../../Redux/Bustype/BusTypeApiSlice';
import { Drawer, Button, Table, Popconfirm } from 'antd';
import BusTypeForm from './BusTypeForm';
import Notification from '../../../../components/shared/Notification/Notification'

const BusTypeList = () => {
  const companyId = useSelector((state) => state.user?.userInfo?.companyId);
  const { data: response, isLoading, error, refetch } = useGetBusTypesQuery({ companyId });

  const busTypes = response?.data || [];
  const [deleteBusType] = useDeleteBusTypeMutation(); // Mutation cho việc xóa loại xe
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [selectedBusType, setSelectedBusType] = useState(null); // Lưu trữ loại xe được chọn khi chỉnh sửa
  const [notification, setNotification] = useState({ open: false, severity: 'info', message: '' });

  if (isLoading) return <p>Đang tải dữ liệu...</p>;
  if (error) return <p>Lỗi khi tải dữ liệu: {error.message}</p>;

  // Hàm mở Drawer và đặt form vào chế độ thêm mới
  const showDrawer = () => {
    setSelectedBusType(null);
    setDrawerVisible(true);
  };

  // Hàm đóng Drawer và hiển thị thông báo sau khi cập nhật
  const closeDrawer = (successMessage) => {
    setDrawerVisible(false);
    if (successMessage) {
      setNotification({ open: true, severity: 'success', message: successMessage });
      refetch(); // Lấy lại danh sách sau khi thêm hoặc cập nhật
    }
  };

  // Hàm chỉnh sửa loại xe
  const handleEdit = (busType) => {
    setSelectedBusType(busType);
    setDrawerVisible(true);
  };

  // Hàm xóa loại xe
  const handleDelete = async (busTypeId) => {
    try {
      await deleteBusType(busTypeId).unwrap();
      setNotification({ open: true, severity: 'success', message: 'Xóa loại xe thành công!' });
      refetch(); // Lấy lại danh sách sau khi xóa
    } catch (error) {
      setNotification({ open: true, severity: 'error', message: `Lỗi khi xóa loại xe: ${error.message}` });
    }
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
        <span>
          <Button type="link" onClick={() => handleEdit(record)}>
            Sửa
          </Button>
          <Popconfirm
            title="Bạn có chắc chắn muốn xóa loại xe này không?"
            onConfirm={() => handleDelete(record._id)} // Xác nhận xóa
            okText="Có"
            cancelText="Không"
          >
            <Button type="link" danger>
              Xóa
            </Button>
          </Popconfirm>
        </span>
      ),
    },
  ];

  return (
    <>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-700">Danh Sách Các Loại Xe</h1>
          <Button type="primary" onClick={showDrawer}>
            Thêm Loại Xe Mới
          </Button>
        </div>

        <Table dataSource={busTypes} columns={columns} rowKey="_id" pagination={false} />

        <Drawer
          title={selectedBusType ? 'Chỉnh Sửa Loại Xe' : 'Thêm Loại Xe Mới'}
          width={500}
          onClose={() => closeDrawer()}
          visible={drawerVisible}
          destroyOnClose
        >
          <BusTypeForm busType={selectedBusType} closeDrawer={(successMessage) => closeDrawer(successMessage)} />
        </Drawer>
      </div>

      {/* Hiển thị thông báo */}
      <Notification
        open={notification.open}
        severity={notification.severity}
        message={notification.message}
        onClose={() => setNotification({ ...notification, open: false })}
      />
    </>
  );
};

export default BusTypeList;
