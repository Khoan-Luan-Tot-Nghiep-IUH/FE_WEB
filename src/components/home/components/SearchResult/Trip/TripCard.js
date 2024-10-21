import React, { useState } from 'react';
import { formatCurrency } from 'utils/formatUtils';
import { useGetSeatsByTripIdQuery } from '../../../../../Redux/Trip/TripApiSlice';
import { Transition } from '@headlessui/react';

const TripCard = ({ trip, isOpen, onToggle }) => {
  const [selectedSeats, setSelectedSeats] = useState([]);

  const { data: seatsData, isLoading: isLoadingSeats } = useGetSeatsByTripIdQuery(trip._id, {
    skip: !isOpen, // Chỉ tải ghế khi trip được mở
  });

  const handleSeatSelect = (seatNumber) => {
    if (selectedSeats.includes(seatNumber)) {
      setSelectedSeats(selectedSeats.filter(num => num !== seatNumber));
    } else {
      setSelectedSeats([...selectedSeats, seatNumber]);
    }
  };

  const isSeatSelected = (seatNumber) => selectedSeats.includes(seatNumber);
  const isSeatBooked = (seat) => !seat.isAvailable;
  const totalPrice = selectedSeats.length * trip.basePrice;

  return (
    <div className="bg-white rounded-lg shadow-lg mb-6 p-4 hover:shadow-xl transition-shadow duration-300">
      <div className="flex justify-between">
        {/* Phần bên trái: Thông tin hình ảnh xe và chuyến */}
        <div className="flex items-start">
          <div className="relative">
            <img
              src={trip.busType.image || "https://static.vexere.com/production/images/1702527338553.jpeg"}
              alt="Bus"
              className="w-28 h-28 object-cover rounded-lg"
            />
            <div className="absolute top-1 left-1 bg-green-500 text-white text-xs px-2 py-1 rounded">
              Xác nhận tức thì
            </div>
          </div>

          <div className="ml-4">
            <h3 className="font-semibold text-lg">{trip.busType.name}</h3>
            <p className="text-sm text-gray-600">{trip.busType.seats} chỗ</p>

            <div className="mt-2 text-sm space-y-1">
              <div>Giờ đi: {new Date(trip.departureTime).toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })}</div>
              <div>Nơi đi: {trip.departureLocation.name}</div>
              <div>Nơi đến: {trip.arrivalLocation.name}</div>
            </div>

            <p className="mt-2 text-green-600">Còn {trip.availableSeats} chỗ trống</p>
          </div>
        </div>

        {/* Phần bên phải: Giá và nút chọn chuyến */}
        <div className="text-right">
          <p className="text-xl font-bold text-blue-600 mb-2">Từ {formatCurrency(trip.basePrice)} VND</p>
          <button
            onClick={onToggle} // Gọi sự kiện khi nhấn nút chọn chuyến
            className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition duration-300 w-full"
          >
            {isOpen ? 'Ẩn chi tiết' : 'Chọn chuyến'}
          </button>
          <p className="text-xs text-gray-500 mt-2">KHÔNG CẦN THANH TOÁN TRƯỚC</p>
        </div>
      </div>

      {/* Chi tiết ghế ngồi */}
      <Transition
        show={isOpen}
        as="div"
        enter="transition-opacity duration-300"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-300"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        {isOpen && (
          <div className="border-t mt-4 pt-4">
            <div className="flex justify-between">
              {/* Legend bên trái */}
              <div className="w-1/3">
                <h4 className="font-medium mb-3">Chú thích:</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center">
                    <div className="w-4 h-4 border border-gray-300 bg-white mr-2"></div>
                    Ghế không bán
                  </div>
                  <div className="flex items-center">
                    <div className="w-4 h-4 bg-green-500 mr-2"></div>
                    Đang chọn
                  </div>
                  <div className="flex items-center">
                    <div className="w-4 h-4 border border-green-500 bg-green-100 mr-2"></div>
                    Ghế còn trống
                  </div>
                  <div className="flex items-center">
                    <div className="w-4 h-4 bg-red-500 mr-2"></div>
                    Ghế đã đặt
                  </div>
                </div>
              </div>

              {/* Bản đồ ghế ngồi */}
              <div className="w-2/3">
                <h4 className="font-medium mb-3 text-center">Thông tin ghế ngồi:</h4>
                {isLoadingSeats ? (
                  <div className="text-center py-4">Đang tải...</div>
                ) : (
                  <div className="grid grid-cols-5 gap-2">
                    {seatsData?.data?.lower?.map((seat) => (
                      <button
                        key={seat.seatNumber}
                        onClick={() => !isSeatBooked(seat) && handleSeatSelect(seat.seatNumber)}
                        disabled={isSeatBooked(seat)}
                        className={`w-12 h-12 rounded-lg text-center text-sm font-semibold cursor-pointer
                          ${isSeatSelected(seat.seatNumber)
                            ? 'bg-green-500 text-white'
                            : isSeatBooked(seat)
                              ? 'bg-red-500 text-white'
                              : 'bg-green-100 border-2 border-green-500'}`}
                      >
                        {seat.seatNumber}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Tổng cộng và nút tiếp tục */}
            <div className="mt-4 flex justify-between items-center border-t pt-4">
              <div className="text-sm">
                Ghế đã chọn: {selectedSeats.join(', ')}
              </div>
              <div className="text-lg font-bold">
                Tổng cộng: {formatCurrency(totalPrice)} VND
              </div>
              <button className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition duration-300">
                Tiếp tục
              </button>
            </div>
          </div>
        )}
      </Transition>
    </div>
  );
};

export default TripCard;
