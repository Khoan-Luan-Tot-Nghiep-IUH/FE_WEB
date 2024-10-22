import React from 'react';

const BookingConfirmation = ({ tripDetails, selectedSeats, contactInfo , totalPrice}) => {
  return (
    <div className="mt-6">
      <h3 className="text-lg font-semibold mb-2">Thông Tin Đặt Vé</h3>
      <div className="border border-gray-300 p-4 rounded-lg mb-4">
        <h4 className="font-medium">Thông Tin Liên Hệ:</h4>
        <p>Tên: {contactInfo.fullName}</p>
        <p>Số điện thoại: {contactInfo.phoneNumber}</p>
        <p>Email: {contactInfo.email}</p>
      </div>
      <h4 className="font-medium">Tóm Tắt Đặt Vé:</h4>
      <p>Ghế đã chọn: {selectedSeats.join(', ')}</p>
      <p>Tổng cộng: {totalPrice} VND</p>

      <h4 className="font-medium mt-4">Thông Tin Chuyến Đi:</h4>
      <p>Tên xe: {tripDetails.busType.name}</p>
      <p>Giờ đi: {new Date(tripDetails.departureTime).toLocaleTimeString('vi-VN')}</p>
      <p>Nơi đi: {tripDetails.departureLocation.name}</p>
      <p>Nơi đến: {tripDetails.arrivalLocation.name}</p>
    </div>
  );
};

export default BookingConfirmation;
