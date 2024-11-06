import React, { useState, useEffect } from 'react';

const CountdownTimer = ({ initialTime, onTimeout, sessionId }) => {
    const [timeLeft, setTimeLeft] = useState(initialTime);

    useEffect(() => {
        // Kiểm tra sessionId và endTime trong localStorage
        const storedSessionId = localStorage.getItem('currentSessionId');
        const storedEndTime = parseInt(localStorage.getItem('countdownEndTime'), 10);

        // Nếu sessionId trong localStorage khác với sessionId hiện tại hoặc không có endTime
        if (storedSessionId !== sessionId || isNaN(storedEndTime)) {
            // Thiết lập endTime mới và lưu vào localStorage
            const newEndTime = Date.now() + initialTime * 1000;
            localStorage.setItem('currentSessionId', sessionId);
            localStorage.setItem('countdownEndTime', newEndTime);
            setTimeLeft(initialTime);
        } else {
            // Tính toán thời gian còn lại dựa trên endTime đã lưu
            const remainingTime = Math.floor((storedEndTime - Date.now()) / 1000);
            setTimeLeft(remainingTime > 0 ? remainingTime : 0);
        }

        // Cập nhật countdown mỗi giây
        const timerId = setInterval(() => {
            setTimeLeft(prevTime => {
                if (prevTime <= 1) {
                    clearInterval(timerId);
                    localStorage.removeItem('currentSessionId');
                    localStorage.removeItem('countdownEndTime');
                    onTimeout();
                    return 0;
                }
                return prevTime - 1;
            });
        }, 1000);

        // Dọn dẹp bộ đếm khi component unmount
        return () => clearInterval(timerId);
    }, [initialTime, onTimeout, sessionId]);

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
