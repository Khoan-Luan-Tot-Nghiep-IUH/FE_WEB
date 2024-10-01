import React, { useState } from 'react';

const TicketBookingPage = () => {
  const [bookings] = useState({
    current: [],
    completed: [],
    canceled: [],
  });
  const [activeTab, setActiveTab] = useState('current');

  return (
    <div className="container mx-auto mt-10 bg-white shadow-md rounded-lg p-8">
      <div className="bg-gray-100 py-4 px-6 mb-6">
        <span className="text-blue-500">Trang chủ</span> {'>'} <span className="text-gray-600">Đơn hàng của tôi</span>
      </div>
      <div className="border-b border-gray-300 mb-6">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('current')}
            className={`text-gray-700 py-4 px-1 text-base font-medium ${
              activeTab === 'current' ? 'border-blue-500 text-blue-600 border-b-2' : ''
            }`}
          >
            Hiện tại
          </button>
          <button
            onClick={() => setActiveTab('completed')}
            className={`text-gray-700 py-4 px-1 text-base font-medium ${
              activeTab === 'completed' ? 'border-blue-500 text-blue-600 border-b-2' : ''
            }`}
          >
            Đã đi
          </button>
          <button
            onClick={() => setActiveTab('canceled')}
            className={`text-gray-700 py-4 px-1 text-base font-medium ${
              activeTab === 'canceled' ? 'border-blue-500 text-blue-600 border-b-2' : ''
            }`}
          >
            Đã hủy
          </button>
        </nav>
      </div>
      <div>
        {activeTab === 'current' && bookings.current.length === 0 && (
          <p>Bạn chưa có chuyến sắp đi nào. <a href="/book" className="text-blue-600">Đặt chuyến đi ngay</a></p>
        )}

        {activeTab === 'completed' && bookings.completed.length === 0 && (
          <p>Bạn chưa có chuyến nào đã hoàn thành.</p>
        )}

        {activeTab === 'canceled' && bookings.canceled.length === 0 && (
          <p>Bạn chưa có vé nào đã hủy.</p>
        )}

        {activeTab === 'current' && bookings.current.length > 0 && (
          <div>
            {bookings.current.map((booking) => (
              <BookingCard key={booking.id} booking={booking} />
            ))}
          </div>
        )}

        {activeTab === 'completed' && bookings.completed.length > 0 && (
          <div>
            {bookings.completed.map((booking) => (
              <BookingCard key={booking.id} booking={booking} />
            ))}
          </div>
        )}

        {activeTab === 'canceled' && bookings.canceled.length > 0 && (
          <div>
            {bookings.canceled.map((booking) => (
              <BookingCard key={booking.id} booking={booking} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const BookingCard = ({ booking }) => (
  <div className="border border-gray-300 rounded-lg p-4 mb-4">
    <h3 className="text-lg font-bold">{booking.departure} - {booking.arrival}</h3>
    <p>Ngày đi: {booking.travelDate}</p>
    <p>Giá vé: {booking.price}</p>
    <p>Trạng thái: {booking.status}</p>
  </div>
);

export default TicketBookingPage;
