import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useGetTripsByCompanyQuery } from '../../../Redux/Trip/TripApiSlice';
import TripList from '../components/ManageTrip/TripList';
import TripForm from '../components/ManageTrip/TripForm';
import { Button, Drawer, Typography, Spin, Alert, notification } from 'antd';

const { Title } = Typography;

const ManageTrips = () => {
  const { companyId } = useSelector((state) => state.user.userInfo || {});
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [editingTripId, setEditingTripId] = useState(null);
  const [formMode, setFormMode] = useState('add');

  const { data = {}, isLoading, error, refetch } = useGetTripsByCompanyQuery(companyId, {
    skip: !companyId,
  });

  const trips = data.trips || [];

  // Hàm hiển thị thông báo
  const showNotification = (type, message, description) => {
    notification[type]({
      message,
      description,
    });
  };

  const openDrawer = (trip = null) => {
    if (trip) {
      setEditingTripId(trip._id);
      setFormMode('edit');
    } else {
      setEditingTripId(null);
      setFormMode('add');
    }
    setIsDrawerOpen(true);
  };

  const closeDrawer = (actionSuccess, message) => {
    setIsDrawerOpen(false);
    setEditingTripId(null);
    setFormMode('add');
    if (actionSuccess) {
      showNotification('success', 'Thành công', message);
    }
    refetch();
  };

  return (
    <div className="p-6 bg-white shadow-md rounded-lg">
      <div className="flex justify-between items-center mb-6">
        <Title level={3} className="text-gray-700">Quản Lý Chuyến Đi</Title>
        {!isDrawerOpen && (
          <Button type="primary" size="large" onClick={() => openDrawer()}>
            Tạo Chuyến Đi
          </Button>
        )}
      </div>
      {isLoading ? (
        <div className="flex justify-center items-center py-10">
          <Spin tip="Đang tải danh sách chuyến đi..." size="large" />
        </div>
      ) : error ? (
        <div className="flex justify-center items-center py-10">
          <Alert message="Có lỗi xảy ra khi tải danh sách chuyến đi" description={error.message} type="error" showIcon />
        </div>
      ) : (
        <TripList trips={trips} openDrawer={openDrawer} hideAddButton={isDrawerOpen} showNotification={showNotification}   refetch={refetch} />
      )}
      <Drawer
        title={editingTripId ? 'Chỉnh Sửa Chuyến Đi' : 'Thêm Chuyến Đi Mới'}
        width={500}
        onClose={() => closeDrawer(false)}
        visible={isDrawerOpen}
        destroyOnClose
      >
        <TripForm
          tripId={editingTripId}
          closeDrawer={(successMessage) => closeDrawer(true, successMessage)}
          trips={trips}
          formMode={formMode}
          showNotification={showNotification}
        />
      </Drawer>
    </div>
  );
};

export default ManageTrips;