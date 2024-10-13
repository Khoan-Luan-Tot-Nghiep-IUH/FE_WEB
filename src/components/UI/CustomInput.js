import React from 'react';

const CustomInput = ({ label, value, onChange, placeholder, type = 'text', className }) => (
  <div className={`relative w-full ${className}`}>
    {label && <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>}
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full p-2 border rounded-lg focus:border-blue-500 focus:outline-none"
    />
  </div>
);

export default React.memo(CustomInput);
