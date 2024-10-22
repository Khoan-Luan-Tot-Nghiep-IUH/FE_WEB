import React, { useState } from 'react';
// You can use an icon library like Font Awesome or Ionicons
import { IoIosArrowDown , IoIosArrowUp  } from 'react-icons/io'; // Importing arrow icons from Ionicons

const BookingSummary = ({ totalPrice, selectedSeats }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDetails = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      {/* Header with a toggle icon */}
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold mb-2">Tạm tính</h3>
        <button onClick={toggleDetails} className="text-xl">
          {isOpen ? <IoIosArrowUp  /> : <IoIosArrowDown />} 
        </button>
      </div>
      <p className="text-2xl font-bold text-blue-600">
        {totalPrice?.toLocaleString('vi-VN')}đ
      </p>

      {isOpen && (
        <div className="mt-2">
          <p className="text-sm text-gray-500">
            Giá vé: {totalPrice?.toLocaleString('vi-VN')} x {selectedSeats.length} ghế
          </p>
          <p className="mt-1 text-sm text-gray-500">
            Mã ghế/giường: {selectedSeats.join(', ')}
          </p>
        </div>
      )}
    </div>
  );
};

export default BookingSummary;
