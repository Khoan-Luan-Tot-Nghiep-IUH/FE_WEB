import React from 'react';
import './Loader.css'; // Import CSS

const Loader = () => {
  return (
    <div className="loader-container">
      <div className="loader-spinner"></div>
      <p className="loader-text">Đang tải...</p>
    </div>
  );
};

export default Loader;
