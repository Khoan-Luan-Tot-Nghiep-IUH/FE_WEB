import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const BookingForm = ({ selectedSeats, totalPrice, trip }) => {
  const [contactInfo, setContactInfo] = useState({
    name: '',
    phone: '',
    email: '',
    countryCode: '+84',
  });

  const navigate = useNavigate();
  const handleFormSubmit = (event) => {
    event.preventDefault();
    navigate('/bookingconfirmation', { state: { selectedSeats, totalPrice, trip, contactInfo } });
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <h3 className="text-lg font-semibold mb-2">Chọn Ghế</h3>
      <input
        type="text"
        placeholder="Tên người đi"
        value={contactInfo.name}
        onChange={(e) => setContactInfo({ ...contactInfo, name: e.target.value })}
        className="border border-gray-300 p-2 rounded mb-2 w-full"
        required
      />
      <input
        type="tel"
        placeholder="Số điện thoại"
        value={contactInfo.phone}
        onChange={(e) => setContactInfo({ ...contactInfo, phone: e.target.value })}
        className="border border-gray-300 p-2 rounded mb-2 w-full"
        required
      />
      <input
        type="email"
        placeholder="Email để nhận thông tin"
        value={contactInfo.email}
        onChange={(e) => setContactInfo({ ...contactInfo, email: e.target.value })}
        className="border border-gray-300 p-2 rounded mb-4 w-full"
        required
      />

      <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">Tiếp tục</button>
    </form>
  );
};

export default BookingForm;
