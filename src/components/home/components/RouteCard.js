import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const RouteCard = ({ image, title, price, from, to }) => {
  const navigate = useNavigate(); // Khởi tạo hook navigate

  const handleCardClick = () => {
    const currentDate = new Date().toISOString().split('T')[0]; // Lấy ngày hiện tại
    navigate(`/search-page?departureLocation=${encodeURIComponent(from)}&arrivalLocation=${encodeURIComponent(to)}&departureDate=${currentDate}`);
  };
  return (
    <div 
      className="relative bg-gray-200 rounded-lg overflow-hidden shadow-md cursor-pointer hover:shadow-lg transition-shadow duration-300"
      onClick={handleCardClick}   
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
