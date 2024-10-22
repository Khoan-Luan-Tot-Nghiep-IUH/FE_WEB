import React from 'react';

const BookingSummary = ({ selectedSeats, totalPrice }) => {
  return (
    <div className="border-t mt-4 pt-4">
      <h3 className="text-lg font-semibold">Tóm Tắt Đặt Vé</h3>
      <p>Ghế đã chọn: {selectedSeats.length > 0 ? selectedSeats.join(', ') : 'Chưa chọn ghế'}</p>
      <p>Tổng cộng: {totalPrice > 0 ? `${totalPrice} VND` : '0 VND'}</p>
    </div>
  );
};

export default BookingSummary;
