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
        return 'bg-orange-500 text-white'; // Tạm thời giữ bởi người dùng khác
      }
      if (seat.seatNumber === 1) {
        return 'bg-gray-500 text-white cursor-not-allowed'; // Ghế không khả dụng
      }
      if ([2, 3, 4, 5, 6].includes(seat.seatNumber)) {
        return 'bg-yellow-500 text-white'; // Ghế VIP
      }
      if (!seat.isAvailable) {
        return 'bg-red-500 text-white'; // Ghế đã được đặt
      }
      return 'bg-green-100 border-2 border-green-500'; // Ghế có sẵn
    };

    const renderSeats = (seats, floorLabel) => (
      <div className="mb-4">
        <h4 className="font-semibold text-center mb-3 text-gray-700">{floorLabel}</h4>
        <div className="grid grid-cols-5 gap-3">
          {seats.map((seat) => (
            <button
              key={seat._id}
              onClick={() => handleSeatSelect(seat.seatNumber)}
              disabled={loading}
              className={`w-12 h-12 rounded-lg text-center text-sm font-semibold 
                cursor-pointer ${getSeatStyle(seat)}`}
            >
              {seat.seatNumber}
              {lockTimers[seat.seatNumber] && (
                <Clock className="absolute -top-1 -right-1 h-4 w-4" />
              )}
            </button>
          ))}
        </div>
      </div>
    );

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
        <div className="border-t mt-4 pt-4 space-y-6">
          {/* Chú thích: dàn hàng ngang với flex-wrap */}
          <div className="flex flex-row flex-wrap justify-around space-x-4 mb-4 text-sm text-gray-700">
            <div className="flex items-center mb-2">
              <div className="w-4 h-4 bg-gray-500 mr-2 rounded"></div>
              Ghế không khả dụng
            </div>
            <div className="flex items-center mb-2">
              <div className="w-4 h-4 bg-yellow-500 mr-2 rounded"></div>
              Ghế VIP
            </div>
            <div className="flex items-center mb-2">
              <div className="w-4 h-4 bg-green-500 mr-2 rounded"></div>
              Đã chọn
            </div>
            <div className="flex items-center mb-2">
              <div className="w-4 h-4 bg-orange-500 mr-2 rounded"></div>
              Tạm thời giữ
            </div>
            <div className="flex items-center mb-2">
              <div className="w-4 h-4 border border-green-500 bg-green-100 mr-2 rounded"></div>
              Có sẵn
            </div>
            <div className="flex items-center mb-2">
              <div className="w-4 h-4 bg-red-500 mr-2 rounded"></div>
              Đã đặt
            </div>
          </div>

          {/* Bản đồ ghế cho từng tầng */}
          <div className="flex w-full">
            {/* Tầng Dưới */}
            <div className={`w-full ${seatsData.upper ? 'md:w-1/2' : ''} pr-4`}>
              {renderSeats(seatsData.lower, "Tầng Dưới")}
            </div>
            {/* Tầng Trên chỉ hiển thị khi có dữ liệu */}
            {seatsData.upper && (
              <div className="w-full md:w-1/2 pl-4">
                {renderSeats(seatsData.upper, "Tầng Trên")}
              </div>
            )}
          </div>

          {/* Tổng giá và nút tiếp tục */}
          <div className="mt-6 flex justify-between items-center border-t pt-4">
            <div className="text-sm text-gray-700">
              Ghế đã chọn: <span className="font-medium">{selectedSeats.join(', ')}</span>
            </div>
            <div className="text-lg font-semibold text-gray-900">
              Tổng: {formatCurrency(totalPrice)} VND
            </div>
            <button 
              onClick={handleContinue}
              disabled={selectedSeats.length === 0 || loading}
              className={`px-6 py-2 rounded-lg text-white transition duration-300
                ${selectedSeats.length === 0 || loading
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700'
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
