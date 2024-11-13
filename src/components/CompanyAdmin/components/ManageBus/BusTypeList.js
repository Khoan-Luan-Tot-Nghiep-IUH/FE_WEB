import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useGetBusTypesQuery, useDeleteBusTypeMutation } from '../../../../Redux/Bustype/BusTypeApiSlice';
import { Drawer, Button, Table, Popconfirm, Spin, Typography, Empty, Modal } from 'antd';
import BusTypeForm from './BusTypeForm';
import Notification from '../../../../components/shared/Notification/Notification';

const { Title } = Typography;

const BusTypeList = () => {
  const companyId = useSelector((state) => state.user?.userInfo?.companyId);
  const { data: response, isLoading, error, refetch } = useGetBusTypesQuery({ companyId });

  const busTypes = response?.data || [];
  const [deleteBusType] = useDeleteBusTypeMutation();
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [selectedBusType, setSelectedBusType] = useState(null);
  const [notification, setNotification] = useState({ open: false, severity: 'info', message: '' });
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentImages, setCurrentImages] = useState([]);

  // Open drawer for adding a new bus type
  const showDrawer = () => {
    setSelectedBusType(null);
    setDrawerVisible(true);
  };

  // Close drawer and show notification if successful
  const closeDrawer = (successMessage) => {
    setDrawerVisible(false);
    if (successMessage) {
      setNotification({ open: true, severity: 'success', message: successMessage });
      refetch();
    }
  };

  // Open drawer for editing a bus type
  const handleEdit = (busType) => {
    setSelectedBusType(busType);
    setDrawerVisible(true);
  };

  // Delete a bus type
  const handleDelete = async (busTypeId) => {
    try {
      await deleteBusType(busTypeId).unwrap();
      setNotification({ open: true, severity: 'success', message: 'Xóa loại xe thành công!' });
      refetch();
    } catch (error) {
      setNotification({ open: true, severity: 'error', message: `Lỗi khi xóa loại xe: ${error.message}` });
    }
  };

  // Show modal with all images of a bus type
  const showModal = (images) => {
    setCurrentImages(images);
    setIsModalVisible(true);
  };

  // Close modal
  const handleCancel = () => {
    setIsModalVisible(false);
    setCurrentImages([]);
  };

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
      title: 'Hình Ảnh',
      dataIndex: 'images',
      key: 'images',
      render: (images) => (
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          {images.slice(0, 2).map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Bus type preview ${index + 1}`}
              style={{ width: 50, height: 50, objectFit: 'cover', borderRadius: '4px' }}
            />
          ))}
          {images.length > 2 && (
            <Button type="link" onClick={() => showModal(images)}>
              Xem Thêm
            </Button>
          )}
        </div>
      ),
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
            onConfirm={() => handleDelete(record._id)}
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
    <div className="p-6 bg-white shadow-md rounded-lg">
      <div className="flex justify-between items-center mb-6">
        <Title level={3} className="text-gray-700">Danh Sách Các Loại Xe</Title>
        <Button type="primary" onClick={showDrawer}>
          Thêm Loại Xe Mới
        </Button>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center py-10">
          <Spin tip="Đang tải danh sách loại xe..." size="large" />
        </div>
      ) : error ? (
        <div className="flex justify-center items-center py-10">
          <p>Lỗi khi tải dữ liệu: {error.message}</p>
        </div>
      ) : busTypes.length === 0 ? (
        <div className="flex justify-center items-center py-10">
          <Empty description="Không có loại xe nào" />
        </div>
      ) : (
        <Table dataSource={busTypes} columns={columns} rowKey="_id" pagination={{ pageSize: 5 }} />
      )}

      <Drawer
        title={selectedBusType ? 'Chỉnh Sửa Loại Xe' : 'Thêm Loại Xe Mới'}
        width={500}
        onClose={() => closeDrawer()}
        visible={drawerVisible}
        destroyOnClose
      >
        <BusTypeForm
          busType={selectedBusType}
          closeDrawer={(successMessage) => closeDrawer(successMessage)}
        />
      </Drawer>

      <Modal
        title="Tất Cả Hình Ảnh"
        visible={isModalVisible}
        footer={null}
        onCancel={handleCancel}
      >
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
          {currentImages.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Bus type full view ${index + 1}`}
              style={{ width: 100, height: 100, objectFit: 'cover', borderRadius: '4px' }}
            />
          ))}
        </div>
      </Modal>

      <Notification
        open={notification.open}
        severity={notification.severity}
        message={notification.message}
        onClose={() => setNotification({ ...notification, open: false })}
      />
    </div>
  );
};

export default BusTypeList;
