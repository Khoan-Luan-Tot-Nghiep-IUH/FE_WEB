import React from 'react';
import { useLocation } from 'react-router-dom';
import BookingForm from './BookingForm'; // Chỉ chứa form liên hệ
import BookingSummary from './BookingSummary'; // Tổng giá vé
import BookingConfirmation from './BookingConfirmation'; // Thông tin chuyến đi

const BookingPage = () => {
  const location = useLocation();
  const { selectedSeats, totalPrice, trip } = location.state || {};

  return (
    <div className="container mx-auto px-4 py-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Phần thông tin liên hệ */}
      <div className="lg:col-span-2">
        <BookingForm selectedSeats={selectedSeats} totalPrice={totalPrice} trip={trip} />

        {/* Tiện ích bổ sung */}
        <div className="bg-white p-6 rounded-lg shadow-md mt-6">
          <h3 className="text-xl font-semibold mb-4">Tiện ích</h3>
          <div className="mb-4">
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" />
              Bảo hiểm chuyến đi (+20.000đ/ghế)
            </label>
            <p className="text-sm text-gray-500 mt-1">
              Quyền lợi bảo hiểm lên đến 400 triệu đồng khi xảy ra tai nạn.
            </p>
          </div>
        </div>
      </div>

      {/* Phần tạm tính và thông tin chuyến đi */}
      <div className="lg:col-span-1">
        <BookingSummary totalPrice={totalPrice} selectedSeats={selectedSeats} />
        <div className="my-6"></div>
        <BookingConfirmation trip={trip} />
      </div>

    </div>
  );
};

export default BookingPage;
