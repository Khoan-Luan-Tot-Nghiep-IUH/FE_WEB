import React from 'react';
import { Transition } from '@headlessui/react';
import { Clock } from 'lucide-react';
import { formatCurrency } from 'utils/formatUtils';

const SeatSelection = ({
  seatsData,
  isLoadingSeats,
  handleSeatSelect,
  selectedSeats,
  lockTimers,
  loading,
  totalPrice,
  handleContinue,
  error,
  userId,
}) => {
  const getSeatStyle = (seat) => {
    if (selectedSeats.includes(seat.seatNumber)) {
      return 'bg-green-500 text-white'; // Ghế đã chọn
    }
    if (seat.lockedBy && seat.lockedBy !== userId) {
      return 'bg-yellow-500 text-white'; // Tạm thời được giữ bởi người dùng khác
    }
    if (!seat.isAvailable) {
      return 'bg-red-500 text-white'; // Ghế đã được đặt
    }
    return 'bg-green-100 border-2 border-green-500'; // Ghế có sẵn
  };

  return (
    <Transition
      show
      enter="transition-opacity duration-300"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="transition-opacity duration-300"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <div className="border-t mt-4 pt-4">
        <div className="flex justify-between">
          {/* Chú thích */}
          <div className="w-1/3">
            <h4 className="font-medium mb-3">Chú thích:</h4>
            <div className="space-y-2 text-sm">
              <div className="flex items-center">
                <div className="w-4 h-4 border border-gray-300 bg-white mr-2"></div>
                Ghế không khả dụng
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 bg-green-500 mr-2"></div>
                Đã chọn
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 bg-yellow-500 mr-2"></div>
                Tạm thời giữ
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 border border-green-500 bg-green-100 mr-2"></div>
                Có sẵn
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 bg-red-500 mr-2"></div>
                Đã đặt
              </div>
            </div>
          </div>

          {/* Bản đồ ghế */}
          <div className="w-2/3">
            <h4 className="font-medium mb-3 text-center">Thông tin ghế:</h4>
            {isLoadingSeats ? (
              <div className="text-center py-4">Đang tải...</div>
            ) : (
              <div className="grid grid-cols-5 gap-2">
                {seatsData.map((seat) => (
                  <button
                    key={seat.seatNumber}
                    onClick={() => handleSeatSelect(seat.seatNumber)}
                    disabled={loading}
                    className={`w-12 h-12 rounded-lg text-center text-sm font-semibold 
                      cursor-pointer relative ${getSeatStyle(seat)}`}
                  >
                    {seat.seatNumber}
                    {lockTimers[seat.seatNumber] && (
                      <Clock className="absolute -top-1 -right-1 h-4 w-4" />
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Tổng giá và nút tiếp tục */}
        <div className="mt-4 flex justify-between items-center border-t pt-4">
          <div className="text-sm">
            Ghế đã chọn: {selectedSeats.join(', ')}
          </div>
          <div className="text-lg font-bold">
            Tổng: {formatCurrency(totalPrice)} VND
          </div>
          <button 
            onClick={handleContinue}
            disabled={selectedSeats.length === 0 || loading}
            className={`px-6 py-2 rounded-lg text-white transition duration-300
              ${selectedSeats.length === 0 || loading
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-blue-500 hover:bg-blue-600'
              }`}
          >
            Tiếp tục
          </button>
        </div>
        {error && <p className="text-red-500 mt-2">{error}</p>}
      </div>
    </Transition>
  );
};

export default SeatSelection;
