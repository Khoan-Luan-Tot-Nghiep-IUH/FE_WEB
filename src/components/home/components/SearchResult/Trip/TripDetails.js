import React from 'react';
import { formatCurrency } from 'utils/formatUtils';

const TripDetails = ({ trip, onToggle, isOpen, loading }) => {
  return (
    <div className="flex justify-between">
      <div className="flex items-start">
        <div className="relative">
          <img
            src={trip.busType.image || "https://static.vexere.com/production/images/1702527338553.jpeg"}
            alt="Bus"
            className="w-28 h-28 object-cover rounded-lg"
          />
          <div className="absolute top-1 left-1 bg-green-500 text-white text-xs px-2 py-1 rounded">
            Xác nhận ngay
          </div>
        </div>

        <div className="ml-4">
          <h3 className="font-semibold text-lg">{trip.busType.name}</h3>
          <p className="text-sm text-gray-600">{trip.busType.seats} ghế</p>

          <div className="mt-2 text-sm space-y-1">
            <div>Khởi hành: {new Date(trip.departureTime).toLocaleTimeString()}</div>
            <div>Từ: {trip.departureLocation.name}</div>
            <div>Đến: {trip.arrivalLocation.name}</div>
          </div>

          <p className="mt-2 text-green-600">{trip.availableSeats} ghế còn trống</p>
        </div>
      </div>
      <div className="text-right">
        <p className="text-xl font-bold text-blue-600 mb-2">
          Từ {formatCurrency(trip.basePrice)} VND
        </p>
        <button
          onClick={onToggle}
          className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition duration-300"
          disabled={loading}
        >
          {isOpen ? 'Ẩn chi tiết' : 'Chọn chuyến'}
        </button>
        <p className="text-xs text-gray-500 mt-2">KHÔNG YÊU CẦU THANH TOÁN TRƯỚC</p>
      </div>
    </div>
  );
};

export default TripDetails;
