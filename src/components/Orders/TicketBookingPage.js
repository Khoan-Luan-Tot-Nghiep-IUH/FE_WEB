import React, { useState, useEffect } from 'react';
import { useGetBookingHistoryQuery } from '../../Redux/Booking/bookingApiSlice';

const TicketBookingPage = () => {
  const [bookings, setBookings] = useState({
    current: [],
    completed: [],
    canceled: [],
  });
  const [activeTab, setActiveTab] = useState('current');

  // Lấy dữ liệu từ API
  const { data, isLoading, isError } = useGetBookingHistoryQuery();

  useEffect(() => {
    if (data?.success) {
      // Lọc các booking dựa trên trạng thái của chuyến đi và trạng thái booking
      setBookings({
        current: data.data.filter(
          (booking) => booking.trip.status === 'Scheduled' && booking.status === 'Confirmed'
        ),
        completed: data.data.filter(
          (booking) => booking.trip.status === 'Completed'
        ),
        canceled: data.data.filter(
          (booking) => booking.status === 'Cancelled'
        ),
      });
    }
  }, [data]);

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error loading booking history.</p>;

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

        {activeTab === 'current' && bookings.current.length > 0 && (
          <div>
            {bookings.current.map((booking) => (
              <BookingCard key={booking._id} booking={booking} />
            ))}
          </div>
        )}

        {activeTab === 'completed' && bookings.completed.length === 0 && (
          <p>Bạn chưa có chuyến nào đã hoàn thành.</p>
        )}

        {activeTab === 'completed' && bookings.completed.length > 0 && (
          <div>
            {bookings.completed.map((booking) => (
              <BookingCard key={booking._id} booking={booking} />
            ))}
          </div>
        )}

        {activeTab === 'canceled' && bookings.canceled.length === 0 && (
          <p>Bạn chưa có vé nào đã hủy.</p>
        )}

        {activeTab === 'canceled' && bookings.canceled.length > 0 && (
          <div>
            {bookings.canceled.map((booking) => (
              <BookingCard key={booking._id} booking={booking} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const BookingCard = ({ booking }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-6 mb-4 flex flex-col space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold text-gray-800">
          {booking.trip.departureLocation.name} → {booking.trip.arrivalLocation.name}
        </h3>
        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${booking.status === 'Confirmed' ? 'bg-green-100 text-green-600' : booking.status === 'Completed' ? 'bg-blue-100 text-blue-600' : 'bg-red-100 text-red-600'}`}>
          {booking.status}
        </span>
      </div>

      <div className="flex items-center space-x-2 text-gray-600">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
          <path d="M6 2a1 1 0 00-1 1v2a1 1 0 001 1h8a1 1 0 001-1V3a1 1 0 00-1-1H6zM4 6V3a3 3 0 013-3h6a3 3 0 013 3v3h1a2 2 0 012 2v7a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h1z" />
        </svg>
        <p>{new Date(booking.trip.departureTime).toLocaleDateString()} - {new Date(booking.trip.departureTime).toLocaleTimeString()}</p>
      </div>

      <div className="flex items-center justify-between text-gray-800">
        <div>
          <p className="text-sm">Ghế: <span className="font-semibold">{booking.seatNumbers.join(', ')}</span></p>
          <p className="text-sm">Giá vé: <span className="font-semibold">{booking.totalPrice} VND</span></p>
        </div>
        <div className="flex flex-col items-center space-y-1">
          <span className="text-sm text-gray-500">Mã đặt vé</span>
          <span className="text-lg font-semibold text-gray-800">{booking.orderCode}</span>
        </div>
      </div>
    </div>
  );
};

export default TicketBookingPage;
