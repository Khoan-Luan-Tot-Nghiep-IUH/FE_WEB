import React from 'react';

const PromotionCard = ({ image, title, description }) => {
  return (
    <div className="relative bg-blue-100 rounded-lg overflow-hidden shadow-md">
      <img
        src={image}
        alt={title}
        className="w-full h-40 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-sm text-gray-600">{description}</p>
      </div>
    </div>
  );
};

export default PromotionCard;