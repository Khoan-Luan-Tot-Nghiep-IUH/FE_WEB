import React from 'react';
import { formatCurrency } from 'utils/formatUtils';

const TripDetails = ({ trip, onToggle, isOpen, loading }) => {
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
            src={trip.busType.image || "https://static.vexere.com/production/images/1702527338553.jpeg"}
            alt="Bus"
            className="w-full h-full object-cover"
          />
          <div className="absolute top-1 left-1 bg-green-500 text-white text-xs px-2 py-1 rounded">
            Xác nhận ngay
          </div>
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
    </div>
  );
};

export default TripDetails;
