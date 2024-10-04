import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useGetTripsByCompanyQuery } from '../../../Redux/Trip/TripApiSlice';
import TripList from '../ManageTrip/TripList';
import TripForm from '../ManageTrip/TripForm';

const ManageTrips = () => {
  const { companyId } = useSelector((state) => state.user.userInfo || {});
  const [isDrawerOpen, setIsDrawerOpen] = useState(false); // Trạng thái để mở/đóng Drawer
  const [editingTripId, setEditingTripId] = useState(null); // Để lưu `tripId` khi chỉnh sửa

  const { data = {}, isLoading, error, refetch } = useGetTripsByCompanyQuery(companyId, {
    skip: !companyId,
  });

  const trips = data.trips || [];

  // Mở Drawer cho việc tạo mới hoặc chỉnh sửa chuyến đi
  const openDrawer = (tripId = null) => {
    setEditingTripId(tripId); // Cập nhật `tripId` nếu đang chỉnh sửa
    setIsDrawerOpen(true);
  };

  // Đóng Drawer
  const closeDrawer = () => {
    setIsDrawerOpen(false);
    setEditingTripId(null); // Đặt lại `tripId`
    refetch(); // Lấy lại danh sách chuyến đi sau khi thêm hoặc chỉnh sửa
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Quản Lý Chuyến Đi</h1>

      {/* Trip List */}
      {isLoading ? (
        <p>Đang tải danh sách chuyến đi...</p>
      ) : error ? (
        <p>Có lỗi xảy ra khi tải danh sách chuyến đi: {error.message}</p>
      ) : (
        <TripList trips={trips} openDrawer={openDrawer} />
      )}

      {/* Nút mở Drawer để tạo mới chuyến đi */}
      <div className="mt-4">
        <button
          onClick={() => openDrawer()}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Tạo Chuyến Đi
        </button>
      </div>

      {/* Drawer */}
      <div
        className={`fixed inset-y-0 right-0 w-96 bg-white shadow-xl z-50 transform transition-transform duration-300 ease-in-out ${
          isDrawerOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Nút đóng Drawer */}
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          onClick={closeDrawer}
        >
          Đóng
        </button>
        <div className="h-full overflow-y-scroll">
          <div className="p-6">
            <TripForm tripId={editingTripId} closeDrawer={closeDrawer} />
          </div>
        </div>
      </div>

      {isDrawerOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={closeDrawer}
        ></div>
      )}
    </div>
  );
};

export default ManageTrips;
