import React from 'react';

const CustomButton = ({ children, onClick, className }) => (
  <button
    className={`py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition ${className}`}
    onClick={onClick}
  >
    {children}
  </button>
);

export default React.memo(CustomButton);
