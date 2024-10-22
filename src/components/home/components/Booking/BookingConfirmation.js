import React, { useState } from 'react';
import { FaBusAlt, FaClock, FaMapMarkerAlt } from 'react-icons/fa';

const BookingConfirmation = ({ trip }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-lg mx-auto">
      <h3 className="text-xl font-semibold mb-4">Thông tin chuyến đi</h3>
      {trip ? (
        <>
          {/* Display main trip details */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <FaBusAlt className="text-blue-500" />
              <p className="text-sm text-gray-500">
                {trip.departureTime
                  ? new Date(trip.departureTime).toLocaleDateString('vi-VN', {
                      weekday: 'short',
                      day: '2-digit',
                      month: '2-digit',
                      year: 'numeric',
                    })
                  : 'Chưa có ngày đi'}
              </p>
            </div>
            <button onClick={toggleDrawer} className="text-blue-500 text-sm">
              Chi tiết
            </button>
          </div>

          {/* Bus Type and Description */}
          <div className="mb-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium">{trip.busType?.name || 'Chưa có thông tin xe'}</p>
                <p className="text-sm text-gray-500">{trip.busType?.description || 'Chưa có mô tả'}</p>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-200 my-4"></div>

          {/* Departure Details */}
          <div className="mb-4">
            <div className="flex justify-between">
              <div className="flex items-start space-x-2">
                <FaClock className="text-blue-500 mt-1" />
                <div>
                  <p className="text-lg font-semibold">
                    {trip.departureTime
                      ? new Date(trip.departureTime).toLocaleTimeString('vi-VN', {
                          hour: '2-digit',
                          minute: '2-digit',
                        })
                      : 'Chưa có giờ đi'}
                  </p>
                  <p className="text-sm text-gray-500">{trip.departureLocation?.name || 'Chưa có điểm đi'}</p>
                  <p className="text-sm text-gray-500">{trip.departureLocation?.address || 'Chưa có địa chỉ'}</p>
                </div>
              </div>
              <button className="text-blue-500 text-sm">Thay đổi</button>
            </div>
          </div>

          {/* Arrival Details */}
          <div className="mb-4">
            <div className="flex justify-between">
              <div className="flex items-start space-x-2">
                <FaMapMarkerAlt className="text-red-500 mt-1" />
                <div>
                  <p className="text-lg font-semibold">
                    {trip.arrivalTime
                      ? new Date(trip.arrivalTime).toLocaleTimeString('vi-VN', {
                          hour: '2-digit',
                          minute: '2-digit',
                        })
                      : 'Chưa có giờ đến'}
                  </p>
                  <p className="text-sm text-gray-500">{trip.arrivalLocation?.name || 'Chưa có điểm đến'}</p>
                  <p className="text-sm text-gray-500">{trip.arrivalLocation?.address || 'Chưa có địa chỉ'}</p>
                </div>
              </div>
              <button className="text-blue-500 text-sm">Thay đổi</button>
            </div>
          </div>

          {/* Drawer for Detailed Info */}
          <div
            className={`fixed inset-y-0 right-0 transform ${
              drawerOpen ? 'translate-x-0' : 'translate-x-full'
            } transition-transform duration-300 w-full max-w-md bg-white shadow-lg z-50`}
          >
            {/* Header */}
            <div className="bg-blue-600 p-4 text-white">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-semibold">{trip.busType?.name || 'Vie Limousine'}</h2>
                <p className="text-sm">
                  {new Date(trip.departureTime).toLocaleTimeString('vi-VN', {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}{' '}
                  •{' '}
                  {new Date(trip.departureTime).toLocaleDateString('vi-VN', {
                    weekday: 'short',
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                  })}
                </p>
              </div>
            </div>

            <div className="p-6">
              <h3 className="text-xl font-semibold mb-4">Chi tiết chuyến đi</h3>

              {/* Vehicle Information */}
              <div className="mb-4">
                <p className="text-sm text-gray-500">Loại xe: {trip.busType?.name || 'Chưa có thông tin xe'}</p>
                <p className="text-sm text-gray-500">Số ghế/giường: {trip.seat || 'Chưa có thông tin ghế'}</p>
                <p className="text-sm text-gray-500">
                  Giá vé: {trip.price ? `${trip.price.toLocaleString()}đ` : 'Chưa có giá vé'}
                </p>
              </div>

              {/* Departure Point */}
              <div className="mb-4">
                <h4 className="font-semibold text-lg">Điểm đón</h4>
                <p>{trip.departureLocation?.name || 'Chưa có điểm đón'}</p>
                <p className="text-sm text-gray-500">{trip.departureLocation?.address || 'Chưa có địa chỉ'}</p>
                <p className="text-sm text-gray-500">
                  Dự kiến đón lúc:{' '}
                  {trip.departureTime
                    ? new Date(trip.departureTime).toLocaleTimeString('vi-VN', {
                        hour: '2-digit',
                        minute: '2-digit',
                      })
                    : 'Chưa có giờ đón'}
                </p>
              </div>

              {/* Arrival Point */}
              <div className="mb-4">
                <h4 className="font-semibold text-lg">Điểm trả</h4>
                <p>{trip.arrivalLocation?.name || 'Chưa có điểm trả'}</p>
                <p className="text-sm text-gray-500">{trip.arrivalLocation?.address || 'Chưa có địa chỉ'}</p>
                <p className="text-sm text-gray-500">
                  Dự kiến trả lúc:{' '}
                  {trip.arrivalTime
                    ? new Date(trip.arrivalTime).toLocaleTimeString('vi-VN', {
                        hour: '2-digit',
                        minute: '2-digit',
                      })
                    : 'Chưa có giờ trả'}
                </p>
              </div>

              <button
                onClick={toggleDrawer}
                className="mt-4 w-full bg-blue-500 text-white font-medium py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200"
              >
                Đóng
              </button>
            </div>
          </div>

          {/* Overlay for closing drawer when clicking outside */}
          {drawerOpen && (
            <div onClick={toggleDrawer} className="fixed inset-0 bg-black opacity-50 z-40"></div>
          )}
        </>
      ) : (
        <p>Chưa có thông tin chuyến đi.</p>
      )}
    </div>
  );
};

export default BookingConfirmation;
