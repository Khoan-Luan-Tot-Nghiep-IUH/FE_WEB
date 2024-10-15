import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const RouteCard = ({ image, title, price, from, to }) => {
  const navigate = useNavigate(); // Khởi tạo hook navigate

  const handleCardClick = () => {
    // Chuyển hướng đến trang search với giá trị from và to
    navigate('/search-page', { 
      state: { 
        fromLocation: from, 
        toLocation: to 
      } 
    });
  };

  return (
    <div 
      className="relative bg-gray-200 rounded-lg overflow-hidden shadow-md cursor-pointer hover:shadow-lg transition-shadow duration-300"
      onClick={handleCardClick} // Thêm sự kiện onClick vào thẻ
    >
      <img
        src={image}
        alt={title}
        className="w-full h-40 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-sm text-gray-600">{price}</p>
      </div>
    </div>
  );
};

export default RouteCard;
