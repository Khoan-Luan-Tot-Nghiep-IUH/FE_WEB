import React, { useState } from 'react';
import { ArrowPathIcon } from '@heroicons/react/24/solid'; // Sử dụng Heroicons v2
import banner from '../../../assets/Banner.png'; // Banner hình nền

const MainSection = () => {
  const [fromLocation, setFromLocation] = useState(''); // Nơi xuất phát
  const [toLocation, setToLocation] = useState(''); // Nơi đến
  const [ticketType, setTicketType] = useState('oneWay'); // Một chiều / Khứ hồi
  const [ticketQuantity, setTicketQuantity] = useState(1); // Số vé
  const [departureDate, setDepartureDate] = useState(''); // Ngày đi
  const [returnDate, setReturnDate] = useState(''); // Ngày về

  const handleSwapLocations = () => {
    const temp = fromLocation;
    setFromLocation(toLocation);
    setToLocation(temp);
  };

  return (
    <section className="relative h-[500px]">
      <img src={banner} alt="Banner" className="w-full h-full object-cover" />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-6xl px-4">
        <div className="bg-white shadow-lg rounded-lg p-6 space-y-4">
          <div className="flex justify-between">
            <div className="flex space-x-6">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="ticketType"
                  value="oneWay"
                  checked={ticketType === 'oneWay'}
                  onChange={() => setTicketType('oneWay')}
                  className="form-radio text-blue-600"
                />
                <span className="ml-2">Một chiều</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="ticketType"
                  value="roundTrip"
                  checked={ticketType === 'roundTrip'}
                  onChange={() => setTicketType('roundTrip')}
                  className="form-radio text-blue-600"
                />
                <span className="ml-2">Khứ hồi</span>
              </label>
            </div>
            <a href="#" className="text-orange-500 text-sm hover:underline">
              Hướng dẫn mua vé
            </a>
          </div>

          {/* Form tìm kiếm */}
          <div className="flex flex-col md:flex-row items-start space-y-4 md:space-y-0 md:space-x-4">
            {/* Nơi xuất phát */}
            <div className="relative w-full md:flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">Nơi xuất phát</label>
              <div className="flex items-center border rounded-lg py-2 px-4">
                <span className="text-blue-500 mr-2">
                  <i className="fas fa-circle"></i>
                </span>
                <input
                  type="text"
                  placeholder="Nhập nơi xuất phát"
                  className="flex-grow focus:outline-none"
                  value={fromLocation}
                  onChange={(e) => setFromLocation(e.target.value)}
                  aria-label="Nơi xuất phát"
                />
              </div>
            </div>

            {/* Nút hoán đổi */}
            <div className="relative flex justify-center items-center">
              <button
                className="bg-gray-100 text-gray-600 p-3 rounded-full hover:bg-gray-300 focus:outline-none shadow-md transition duration-300 ease-in-out"
                onClick={handleSwapLocations}
                aria-label="Hoán đổi vị trí"
              >
                <ArrowPathIcon className="h-6 w-6" />
              </button>
            </div>

            {/* Nơi đến */}
            <div className="relative w-full md:flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">Nơi đến</label>
              <div className="flex items-center border rounded-lg py-2 px-4">
                <span className="text-red-500 mr-2">
                  <i className="fas fa-map-marker-alt"></i>
                </span>
                <input
                  type="text"
                  placeholder="Nhập nơi đến"
                  className="flex-grow focus:outline-none"
                  value={toLocation}
                  onChange={(e) => setToLocation(e.target.value)}
                  aria-label="Nơi đến"
                />
              </div>
            </div>

            {/* Ngày đi */}
            <div className="relative w-full md:flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">Ngày đi</label>
              <div className="flex items-center border rounded-lg py-2 px-4">
                <span className="text-blue-500 mr-2">
                  <i className="fas fa-calendar-alt"></i>
                </span>
                <input
                  type="date"
                  className="flex-grow focus:outline-none"
                  aria-label="Ngày đi"
                  value={departureDate}
                  onChange={(e) => setDepartureDate(e.target.value)}
                />
              </div>
            </div>

            {/* Ngày về (Hiện khi chọn "Khứ hồi") */}
            {ticketType === 'roundTrip' && (
              <div className="relative w-full md:flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">Ngày về</label>
                <div className="flex items-center border rounded-lg py-2 px-4">
                  <span className="text-blue-500 mr-2">
                    <i className="fas fa-calendar-alt"></i>
                  </span>
                  <input
                    type="date"
                    className="flex-grow focus:outline-none"
                    aria-label="Ngày về"
                    value={returnDate}
                    onChange={(e) => setReturnDate(e.target.value)}
                  />
                </div>
              </div>
            )}

            {/* Dropdown chọn số lượng vé */}
            <div className="relative w-full md:flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">Số lượng vé</label>
              <div className="border rounded-lg py-2 px-4">
                <select
                  value={ticketQuantity}
                  onChange={(e) => setTicketQuantity(e.target.value)}
                  className="w-full focus:outline-none"
                  aria-label="Số vé"
                >
                  <option value={1}>1 vé</option>
                  <option value={2}>2 vé</option>
                  <option value={3}>3 vé</option>
                  <option value={4}>4 vé</option>
                </select>
              </div>
            </div>
          </div>

          {/* Nút tìm kiếm */}
          <div className="flex justify-center mt-4">
            <button className="bg-orange-500 text-white py-3 px-8 rounded-full hover:bg-orange-600 transition duration-300 ease-in-out">
              Tìm chuyến xe
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default React.memo(MainSection);
