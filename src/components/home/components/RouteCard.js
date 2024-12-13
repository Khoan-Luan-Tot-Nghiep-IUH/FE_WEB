import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaMapMarkerAlt, FaDollarSign } from 'react-icons/fa';

const RouteCard = ({ image, title, price, from, to }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    const currentDate = new Date().toISOString().split('T')[0];
    navigate(
      `/search-page?departureLocation=${encodeURIComponent(
        from
      )}&arrivalLocation=${encodeURIComponent(to)}&departureDate=${currentDate}`
    );
  };

  return (
    <div
      className="relative h-full bg-white rounded-xl overflow-hidden shadow-lg cursor-pointer hover:shadow-xl transition-shadow duration-300"
      onClick={handleCardClick}
    >
      <img
        src={image}
        alt={title}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-xl font-bold text-gray-800 h-[80px]">{title}</h3>
        <div className="flex items-center text-gray-600 mb-2">
          <FaDollarSign className="text-green-500 mr-2" />
          <span className="text-lg font-semibold">{price}</span>
        </div>
        <div className="text-gray-500">
          <p className="flex items-center mb-1">
            <FaMapMarkerAlt className="mr-2 text-blue-500" />
            Từ: {from}
          </p>
          <p className="flex items-center">
            <FaMapMarkerAlt className="mr-2 text-red-500" />
            Đến: {to}
          </p>
        </div>
      </div>
    </div>
  );
};

export default RouteCard;
