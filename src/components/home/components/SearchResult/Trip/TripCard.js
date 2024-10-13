import React from 'react';
import { formatCurrency } from 'utils/formatUtils';

const TripCard = ({ trip }) => (
  <div className="border p-4 rounded-lg shadow-md bg-white transition hover:shadow-lg flex justify-between items-center mb-4 hover:scale-105 transform transition-transform duration-300 ease-in-out">
    {/* Hình ảnh và thông tin bên trái */}
    <div className="flex items-center">
      {/* Hình ảnh */}
      <div className="relative flex-shrink-0">
        <img
          src="https://static.vexere.com/production/images/1702527338553.jpeg?w=250&h=250"
          alt="Bus type"
          className="w-24 h-24 object-cover rounded-md"
        />
        <div className="absolute top-1 left-1 bg-green-500 text-white text-xs px-2 py-1 rounded-lg">
          Xác nhận tức thì
        </div>
      </div>

      {/* Thông tin chuyến đi */}
      <div className="ml-6">
        <h3 className="text-lg font-semibold text-blue-600">{trip.busType.name}</h3>
        <p className="text-sm text-gray-500 mb-1">Limousine {trip.busType.seats} chỗ</p>

        <div className="flex items-center text-sm text-gray-700 mb-2">
          <p className="mr-4">
            <span className="font-semibold">Giờ đi: </span>{new Date(trip.departureTime).toLocaleTimeString()}
          </p>
          <p>
            <span className="font-semibold">Giờ đến: </span>{new Date(trip.arrivalTime).toLocaleTimeString()}
          </p>
        </div>
        <p className="text-sm mb-1">
          <span className="font-semibold">Nơi đi: </span>{trip.departureLocation.name}
        </p>
        <p className="text-sm mb-1">
          <span className="font-semibold">Nơi đến: </span>{trip.arrivalLocation.name}
        </p>
        <p className="text-sm text-green-600 font-semibold">
          Còn {trip.availableSeats} chỗ trống
        </p>
      </div>
    </div>

    {/* Phần giá và nút */}
    <div className="text-right">
      <div className="mb-2">
        <span className="text-xl font-bold text-blue-600">
          Từ {formatCurrency(trip.basePrice)} VND
        </span>
      </div>
      {trip.discount && (
        <div className="text-green-500 text-sm mb-2">Giảm {trip.discount}%</div>
      )}
      <button className="bg-yellow-500 text-white py-2 px-4 rounded-md hover:bg-yellow-600 transition duration-300 text-lg">
        Chọn chuyến
      </button>
      <p className="text-xs text-gray-500 mt-2">KHÔNG CẦN THANH TOÁN TRƯỚC</p>
    </div>
  </div>
);

export default TripCard;
