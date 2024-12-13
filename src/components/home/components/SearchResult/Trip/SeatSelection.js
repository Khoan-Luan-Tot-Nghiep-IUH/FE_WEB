import React from "react";
import { Transition } from "@headlessui/react";
import { Clock } from "lucide-react";
import { formatCurrency } from "utils/formatUtils";
import { RiArmchairLine } from "react-icons/ri";
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
    if (seat.seatNumber === 1) {
      return "text-gray-500 cursor-not-allowed"; 
    }
    
    if (selectedSeats.includes(seat.seatNumber)) {
      return "text-green-500";
    }
    if (seat.lockedBy && seat.lockedBy !== userId) {
      return "text-orange-500";
    }
    if (!seat.isAvailable) {
      return "text-red-500"; 
    }
    if ([2, 3, 4, 5, 6].includes(seat.seatNumber)) {
      return "text-yellow-500"; // Ghế VIP
    }
    return "text-green-300"; // Ghế có sẵn
  };

  const renderSeats = (seats, floorLabel) => {
    const numColumns = seats.length < 5 ? seats.length : 5;

    return (
      <div className="mb-4">
        <h4 className="font-semibold text-center mb-3 text-gray-700">
          {floorLabel}
        </h4>
        <div
          className="grid gap-3 mx-auto"
          style={{
            gridTemplateColumns: `repeat(${numColumns}, minmax(0, 1fr))`,
          }}
        >
          {seats.map((seat) => (
            <button
              key={seat._id}
              onClick={() => handleSeatSelect(seat.seatNumber)}
              disabled={loading}
              className={`text-2xl cursor-pointer ${getSeatStyle(seat)}`}
            >
              <RiArmchairLine />
              {lockTimers[seat.seatNumber] && (
                <Clock className="absolute -top-1 -right-1 h-4 w-4" />
              )}
            </button>
          ))}
        </div>
      </div>
    );
  };

  const groupSeatsByRow = (seats) => {
    const rows = { Front: [], Middle: [], Back: [] };
  
    seats.forEach((seat) => {
      if (rows[seat.seatRow]) {
        rows[seat.seatRow].push(seat);
      }
    });
  
    return rows;
  };

  const renderSeatsByRow = (seats, floorLabel) => {
    const seatsByRow = groupSeatsByRow(seats);
    return (
      <div className="mb-6">
        <h4 className="text-lg font-semibold text-center text-gray-700 mb-4">
          {floorLabel}
        </h4>
        {Object.entries(seatsByRow).map(([rowName, seatsInRow]) => (
          <div key={rowName} className="mb-4">
            <h5 className="text-sm font-medium text-gray-600 mb-4">
              {`Hàng ${
                rowName === "Front"
                  ? "đầu"
                  : rowName === "Middle"
                  ? "giữa"
                  : "cuối"
              }`}
            </h5>
            <div
              className="grid gap-5 mx-auto"
              style={{
                gridTemplateColumns: `repeat(${Math.min(
                  seatsInRow.length,
                  3
                )}, minmax(0, 1fr))`,
              }}
            >
              {seatsInRow.map((seat) => (
                <button
                  key={seat._id}
                  onClick={() => handleSeatSelect(seat.seatNumber)}
                  disabled={loading}
                  className={`relative p-2 text-2xl cursor-pointer ${getSeatStyle(
                    seat
                  )}`}
                >
                  <RiArmchairLine size={30} />
                  <span className="absolute text-sm font-medium -bottom-2 left-1/2 transform -translate-x-1/2 text-red-700">
                    {seat.seatNumber}
                  </span>
                  {lockTimers[seat.seatNumber] && (
                    <Clock className="absolute -top-1 -right-1 h-4 w-4" />
                  )}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
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
      <div className="border-t mt-4 pt-4 space-y-6">
        {/* Chú thích: dàn hàng ngang với flex-wrap */}
        <div className="flex flex-row flex-wrap justify-around space-x-4 mb-4 text-sm text-gray-700">
          <div className="flex items-center mb-2">
            <RiArmchairLine className="text-gray-500 mr-2" />
            Ghế không bán
          </div>
          <div className="flex items-center mb-2">
            <RiArmchairLine className="text-yellow-500 mr-2" />
            Ghế VIP
          </div>
          <div className="flex items-center mb-2">
            <RiArmchairLine className="text-green-500 mr-2" />
            Đã chọn
          </div>
          <div className="flex items-center mb-2">
            <RiArmchairLine className="text-orange-500 mr-2" />
            Tạm thời giữ
          </div>
          <div className="flex items-center mb-2">
            <RiArmchairLine className="text-green-300 mr-2" />
            Có sẵn
          </div>
          <div className="flex items-center mb-2">
            <RiArmchairLine className="text-red-500 mr-2" />
            Đã đặt
          </div>
        </div>
        
        {/* Tầng Dưới và Tầng Trên */}
        <div className="flex justify-center w-full">
          {/* Tầng Dưới */}
          <div
            className={`w-full ${
              seatsData.upper ? "md:w-1/2" : "w-2/3"
            } flex justify-center`}
          >
            {renderSeatsByRow(seatsData.lower, "Tầng Dưới")}
          </div>
          {/* Tầng Trên */}
          {seatsData.upper && seatsData.upper.length > 0 && (
            <div className="md:w-z1/2 pl-4">
              {renderSeatsByRow(seatsData.upper, "Tầng Trên")}
            </div>
          )}
        </div>

        {/* Tổng giá và nút tiếp tục */}
        <div className="mt-6 flex justify-around h-[80px] items-center border-t pt-4">
          <div className="text-sm text-gray-700">
            Ghế đã chọn:
            <span className="font-medium">{selectedSeats.join(", ")}</span>
          </div>
          <div className="text-lg font-semibold text-gray-900">
            Tổng: {formatCurrency(totalPrice)} VND
          </div>
          <button
            onClick={handleContinue}
            disabled={selectedSeats.length === 0 || loading}
            className={`px-6 py-2 rounded-lg text-white transition duration-300
              ${
                selectedSeats.length === 0 || loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
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
