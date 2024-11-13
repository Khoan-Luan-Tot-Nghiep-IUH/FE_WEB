import React, { useState } from 'react';
import { Modal } from 'antd';
import { formatCurrency } from 'utils/formatUtils';

const TripDetails = ({ trip, onToggle, isOpen, loading }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  // Use the first image if available, otherwise use a fallback image
  const mainImage = trip.busType.images && trip.busType.images.length > 0
    ? trip.busType.images[0]
    : "https://static.vexere.com/production/images/1702527338553.jpeg"; // Fallback image

  const handleViewMore = () => {
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-4 mb-4">
      {/* Thời gian và địa điểm khởi hành - đến */}
      <div className="flex justify-between items-center border-b pb-3">
        <div className="flex flex-col items-start text-left">
          <p className="text-lg font-semibold text-gray-800">
            {new Date(trip.departureTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </p>
          <p className="text-xl text-gray-600">{trip.departureLocation.name}</p>
        </div>

        <div className="text-center text-gray-500 text-sm">
          <p>{Math.round((new Date(trip.arrivalTime) - new Date(trip.departureTime)) / 3600000)} giờ</p>
        </div>

        <div className="flex flex-col items-end text-right">
          <p className="text-lg font-semibold text-gray-800">
            {new Date(trip.arrivalTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </p>
          <p className="text-xl text-gray-600">{trip.arrivalLocation.name}</p>
        </div>
      </div>

      {/* Thông tin hình ảnh, loại xe và số ghế trống */}
      <div className="flex justify-between items-center mt-3">
        {/* Hình ảnh xe, ẩn trên màn hình nhỏ */}
        <div className="relative flex-shrink-0 hidden sm:block w-24 h-24 rounded-lg overflow-hidden">
          <img
            src={mainImage}
            alt="Bus"
            className="w-full h-full object-cover"
          />
          {trip.busType.images && trip.busType.images.length > 1 && (
            <button
              onClick={handleViewMore}
              className="absolute top-1 left-1 bg-blue-500 text-white text-xs px-2 py-1 rounded"
            >
              Xem Thêm
            </button>
          )}
        </div>

        <div className="flex flex-col items-start sm:ml-4 flex-1">
          <h3 className="font-semibold text-lg sm:text-base">{trip.busType.name}</h3>
          <p className="mt-2 text-green-600">{trip.availableSeats} ghế còn trống</p>
        </div>

        {/* Giá vé */}
        <div className="text-right">
          <p className="text-xl font-bold text-blue-600">
            {formatCurrency(trip.basePrice)} VND
          </p>
        </div>
      </div>

      {/* Nút chọn chuyến */}
      <div className="flex justify-between items-center mt-4">
        <button
          onClick={onToggle}
          className="w-full sm:w-auto bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition duration-300"
          disabled={loading}
        >
          {isOpen ? 'Ẩn chi tiết' : 'Chọn chuyến'}
        </button>
        <p className="text-xs text-gray-500 mt-2 sm:mt-0 pl-3">KHÔNG YÊU CẦU THANH TOÁN TRƯỚC</p>
      </div>

      {/* Modal to show additional images */}
      <Modal
        visible={isModalVisible}
        footer={null}
        onCancel={handleCloseModal}
        title="Hình Ảnh Xe"
      >
        <div className="flex flex-wrap gap-4">
          {trip.busType.images && trip.busType.images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Bus image ${index + 1}`}
              className="w-32 h-32 object-cover rounded-lg"
            />
          ))}
        </div>
      </Modal>
    </div>
  );
};

export default TripDetails;
