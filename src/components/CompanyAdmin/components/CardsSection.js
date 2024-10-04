import React from 'react';

const CardSection = ({ title, value, growth, icon, color }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex items-center justify-between">
        <div>
          <h4 className="text-xl font-semibold">{title}</h4>
          <p className="text-4xl font-bold mt-2">{value}</p>
        </div>
        <div className={`text-3xl ${color}`}>{icon}</div>
      </div>
      <p className={`mt-4 ${growth > 0 ? 'text-green-500' : 'text-red-500'}`}>
        {growth > 0 ? `+${growth}%` : `${growth}%`} from last week
      </p>
    </div>
  );
};

export default CardSection;
