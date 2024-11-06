import React, { useState, useMemo, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useGetTripsByCompanyQuery, useDeleteExpiredTripsForCompanyMutation } from '../../../Redux/Trip/TripApiSlice';
import TripList from '../components/ManageTrip/TripList';
import TripForm from '../components/ManageTrip/TripForm';
import { Button, Drawer, Typography, Spin, Alert, notification, Popconfirm, Space, Tabs } from 'antd';

const { Title } = Typography;
const { TabPane } = Tabs;

const ManageTrips = () => {
  const companyId = useSelector((state) => state.user.userInfo?.companyId);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [editingTripId, setEditingTripId] = useState(null);
  const [formMode, setFormMode] = useState('add');
  const [activeTab, setActiveTab] = useState('active');

  const { data = {}, isLoading, error, refetch } = useGetTripsByCompanyQuery(companyId, {
    skip: !companyId,
  });

  const trips = data.trips || [];
  const { activeTrips, completedTrips } = useMemo(() => {
    const active = [];
    const completed = [];
    trips.forEach((trip) => {
      if (trip.status === 'Completed') {
        completed.push(trip);
      } else {
        active.push(trip);
      }
    });
    return { activeTrips: active, completedTrips: completed };
  }, [trips]);

  const [deleteExpiredTripsForCompany, { isLoading: isDeleting }] = useDeleteExpiredTripsForCompanyMutation();

  const showNotification = useCallback((type, message, description) => {
    notification[type]({
      message,
      description,
    });
  }, []);

  const openDrawer = useCallback((trip = null) => {
    setEditingTripId(trip ? trip._id : null);
    setFormMode(trip ? 'edit' : 'add');
    setIsDrawerOpen(true);
  }, []);

  const closeDrawer = useCallback((success = false, message) => {
    setIsDrawerOpen(false);
    setEditingTripId(null);
    setFormMode('add');
    if (success) {
      showNotification('success', 'Thành công', message);
    }
    refetch();
  }, [showNotification, refetch]);

  const handleDeleteExpiredTrips = async () => {
    try {
      const response = await deleteExpiredTripsForCompany().unwrap();
      showNotification('success', 'Thành công', response.message || 'Các chuyến đi đã quá hạn đã được xóa thành công.');
      refetch();
    } catch (error) {
      const errorMessage = error?.data?.message || 'Có lỗi xảy ra khi xóa các chuyến đi đã quá hạn.';
      showNotification('error', 'Lỗi', errorMessage);
    }
  };

  const onTabChange = (key) => {
    setActiveTab(key);
  };

  return (
    <div className="container mx-auto p-8 bg-white shadow-md rounded-md">
      <div className="header flex justify-between items-center mb-6">
        <Title level={3} className="text-gray-800">Quản Lý Chuyến Đi</Title>
        <Space size="large">
          {activeTab === 'active' && (
            <Popconfirm
              title="Bạn có chắc chắn muốn xóa tất cả các chuyến đi đã quá hạn?"
              onConfirm={handleDeleteExpiredTrips}
              okText="Xóa"
              cancelText="Hủy"
            >
              <Button 
                type="primary" 
                danger 
                loading={isDeleting} 
                style={{ backgroundColor: '#ff4d4f', borderColor: '#ff4d4f' }}
              >
                Xóa Chuyến Đi Quá Hạn
              </Button>
            </Popconfirm>
          )}
          {activeTab === 'active' && (
            <Button type="primary" onClick={() => openDrawer()}>
              Tạo Chuyến Đi
            </Button>
          )}
        </Space>
      </div>

      <div className="content">
        <Tabs activeKey={activeTab} onChange={onTabChange} type="card">
          <TabPane tab="Chuyến đi đang hoạt động" key="active">
            {isLoading ? (
              <div className="loading-spinner flex justify-center py-10">
                <Spin tip="Đang tải danh sách chuyến đi..." size="large" />
              </div>
            ) : error ? (
              <Alert
                message="Có lỗi xảy ra khi tải danh sách chuyến đi"
                description={error.message}
                type="error"
                showIcon
                className="error-alert"
              />
            ) : (
              <TripList 
                trips={activeTrips} 
                openDrawer={openDrawer} 
                hideAddButton={isDrawerOpen} 
                showNotification={showNotification} 
                refetch={refetch} 
              />
            )}
          </TabPane>
          <TabPane tab="Chuyến đi đã hoàn thành" key="completed">
            {isLoading ? (
              <div className="loading-spinner flex justify-center py-10">
                <Spin tip="Đang tải danh sách chuyến đi..." size="large" />
              </div>
            ) : error ? (
              <Alert
                message="Có lỗi xảy ra khi tải danh sách chuyến đi"
                description={error.message}
                type="error"
                showIcon
                className="error-alert"
              />
            ) : (
              <TripList 
                trips={completedTrips} 
                openDrawer={openDrawer} 
                hideAddButton={isDrawerOpen} 
                showNotification={showNotification} 
                refetch={refetch} 
                isCompleted
              />
            )}
          </TabPane>
        </Tabs>
      </div>

      <Drawer
        title={editingTripId ? 'Chỉnh Sửa Chuyến Đi' : 'Thêm Chuyến Đi Mới'}
        width={500}
        onClose={() => closeDrawer(false)}
        open={isDrawerOpen}
        destroyOnClose
      >
        <TripForm
          tripId={editingTripId}
          closeDrawer={(message) => closeDrawer(true, message)}
          trips={trips}
          formMode={formMode}
          showNotification={showNotification}
        />
      </Drawer>
    </div>
  );
};

export default ManageTrips;
