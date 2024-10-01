import React from 'react';

const RouteCard = ({ image, title, price }) => {
  return (
    <div className="relative bg-gray-200 rounded-lg overflow-hidden shadow-md">
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