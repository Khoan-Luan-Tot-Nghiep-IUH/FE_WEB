import React, { useState } from 'react';
import './index.css';

const OffersPage = () => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const segments = ['Hoa', 'Trang', 'Mai', 'Lan'];

  const spinWheel = () => {
    setIsSpinning(true);
    const randomIndex = Math.floor(Math.random() * segments.length);
    const degreePerSegment = 360 / segments.length;
    const randomDegree = 360 * 5 + randomIndex * degreePerSegment;

    setRotation(randomDegree);
    setTimeout(() => {
      setIsSpinning(false);
    }, 5000);
  };

  return (
    <div className="wheel-container">
      <h1 className="text-center">Vòng quay may mắn</h1>
      <div className="wheel-wrapper">
        <div
          className={`wheel ${isSpinning ? 'spinning' : ''}`}
          style={{ transform: `rotate(${rotation}deg)` }}
        >
          {segments.map((segment, index) => (
            <div
              key={index}
              className="wheel-segment"
              style={{
                transform: `rotate(${index * 90}deg)`,
                backgroundColor: ['#ff4d4d', '#4d88ff', '#ffcc00', '#4dff4d'][index],
              }}
            >
              <span className="segment-text">{segment}</span>
            </div>
          ))}
        </div>
        <div className="wheel-pointer"></div>
      </div>
      <button className="spin-button" onClick={spinWheel} disabled={isSpinning}>
        {isSpinning ? 'Đang quay...' : 'Quay'}
      </button>
    </div>
  );
};

export default OffersPage;
