import React, { useState, useEffect } from 'react';

const CountdownTimer = ({ endTime, onTimeout }) => {
    const [timeLeft, setTimeLeft] = useState(0);

    useEffect(() => {
        const endTimestamp = new Date(endTime).getTime();
        const calculateTimeLeft = () => Math.max(0, Math.floor((endTimestamp - Date.now()) / 1000));
        
        setTimeLeft(calculateTimeLeft());

        const timerId = setInterval(() => {
            setTimeLeft(prevTime => {
                const newTime = calculateTimeLeft();
                if (newTime <= 0) {
                    clearInterval(timerId);
                    onTimeout();
                }
                return newTime;
            });
        }, 1000);

        return () => clearInterval(timerId);
    }, [endTime, onTimeout]);

    const minutes = String(Math.floor(timeLeft / 60)).padStart(2, '0');
    const seconds = String(timeLeft % 60).padStart(2, '0');

    return (
        <div className="w-full text-center font-bold mb-8 p-4 rounded-lg shadow-lg flex flex-col items-center"
             style={{
                 background: 'linear-gradient(135deg, #3a8dff, #1e40af)',
                 color: 'white',
                 borderRadius: '8px',
                 boxShadow: '0 6px 12px rgba(0, 0, 0, 0.2)',
             }}
        >
            <p className="text-lg tracking-wide" style={{ marginBottom: '8px' }}>Thời gian thanh toán còn lại</p>
            <div className="bg-white text-red-600 font-extrabold text-5xl px-6 py-2 rounded-md shadow-md inline-block"
                 style={{
                     boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
                     fontFamily: 'monospace',
                 }}
            >
                {minutes}:{seconds}
            </div>
        </div>
    );
};

export default CountdownTimer;
