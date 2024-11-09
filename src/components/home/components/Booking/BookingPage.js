import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useCreateBookingDraftMutation } from '../../../../Redux/Booking/bookingApiSlice';
import BookingForm from './ComponentBooking/BookingForm';
import BookingSummary from './ComponentBooking/BookingSummary';
import BookingConfirmation from './ComponentBooking/BookingConfirmation';
import Navbar from 'components/shared/navbar/Navbar';
import { IoIosArrowBack } from "react-icons/io";
import { Modal } from 'antd';
import { useSocket } from '../../../../SocketContext';

const BookingPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const socket = useSocket();
  const { selectedSeats, totalPrice, trip } = location.state || {};

  const [createBookingDraft, { isLoading }] = useCreateBookingDraftMutation();
  const [isModalVisible, setIsModalVisible] = useState(false); 

  const handleBack = () => {
    setIsModalVisible(true);
  };


  if (!socket) {
    console.error("Socket is not available in BookingPage.");
  } else {
    console.log("Socket is available in BookingPage:", socket);
    socket.on('connect', () => {
      console.log("Socket reconnected in BookingPage:", socket.id);
    });
  }
  
  const handleConfirmReleaseSeats = () => {
    if (selectedSeats && trip && socket) {
      selectedSeats.forEach((seatNumber) => {
        console.log(`Attempting to release seat ${seatNumber} for trip ${trip._id}`);
        socket.emit('releaseSeat', { tripId: trip._id, seatNumber });
        console.log(`Released seat ${seatNumber} for trip ${trip._id} successfully`);
      });
    }
    setIsModalVisible(false);
    navigate(-1);
  };
  
  const handleCancelReleaseSeats = () => {
    setIsModalVisible(false);
  };

  const handleContinueBooking = async () => {
    if (selectedSeats && totalPrice && trip) {
      try {
        const response = await createBookingDraft({
          tripId: trip._id,
          seatNumbers: selectedSeats,
        }).unwrap();

        navigate('/payment-methods', {
          state: {
            selectedSeats,
            totalPrice: response.data.totalPrice,
            trip,
            bookingId: response.data.bookingId,
            expiryTime: response.data.expiryTime,
          },
        });
      } catch (error) {
        console.error('Lỗi khi tạo booking draft:', error);
      }
    } else {
      console.error('Dữ liệu không đầy đủ!');
    }
  };

  return (
    <div className="min-h-screen pb-0">
      <Navbar />
      <div className="container mx-auto px-4 py-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Nút Quay lại */}
        <div className="lg:col-span-3 mb-4">
          <button onClick={handleBack} className="text-blue-500 flex items-center mb-4">
            <IoIosArrowBack />
            Quay lại
          </button>
        </div>

        {/* Nội dung chính */}
        <div className="lg:col-span-2">
          <BookingForm selectedSeats={selectedSeats} totalPrice={totalPrice} trip={trip} />

          {/* Tiện ích bổ sung */}
          <div className="bg-white p-6 rounded-lg shadow-md mt-6">
            <h3 className="text-xl font-semibold mb-4">Tiện ích</h3>
            {/* Nội dung khác của phần tiện ích */}
          </div>
        </div>

        {/* Khu vực tổng quan */}
        <div className="lg:col-span-1">
          <BookingSummary totalPrice={totalPrice} selectedSeats={selectedSeats} />
          <div className="my-6"></div>
          <BookingConfirmation trip={trip} />
        </div>
      </div>

      {/* Modal xác nhận giải phóng ghế */}
      <Modal
        title="Xác nhận giải phóng ghế"
        visible={isModalVisible}
        onOk={handleConfirmReleaseSeats}
        onCancel={handleCancelReleaseSeats}
        okText="Đồng ý"
        cancelText="Hủy"
      >
        <p>Bạn có chắc chắn muốn giải phóng các ghế đã chọn không?</p>
      </Modal>

      <div className="w-full h-full bg-white shadow-md mt-6">
        <div className="container mx-auto">
          <div className="px-4 py-6 flex justify-between items-center space-x-4">
            <button
              onClick={handleContinueBooking}
              className={`bg-blue-800 text-white font-semibold px-6 py-3 rounded-lg hover:bg-blue-900 transition duration-200 w-1/2 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={isLoading}
            >
              {isLoading ? 'Đang xử lý...' : 'Tiếp tục đặt vé một chiều'}
            </button>
            <button className="bg-yellow-500 text-white font-semibold px-6 py-3 rounded-lg hover:bg-yellow-600 transition duration-200 w-1/2">
              Đặt thêm chiều về
            </button>
          </div>
          <div className="px-4 pb-6 flex justify-between items-center">
            <p className="text-sm text-gray-600">
              Bằng việc tiếp tục, bạn đồng ý với{' '}
              <a href="#" className="text-blue-500 underline">
                Chính sách bảo mật thanh toán
              </a>
              và
              <a href="#" className="text-blue-500 underline">
                Quy chế
              </a>
            </p>
            <div className="text-green-600 text-sm font-semibold">
              Đặt thêm chiều về, giảm ngay 20k!
              <a href="#" className="text-blue-500 underline">
                Chi tiết
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingPage;
