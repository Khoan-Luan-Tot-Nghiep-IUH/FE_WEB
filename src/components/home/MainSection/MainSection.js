import React, { useState, useEffect } from 'react';
import { ArrowPathIcon } from '@heroicons/react/24/solid';
import { useNavigate, useLocation } from 'react-router-dom'; 
import CustomDatePicker from '../../UI/CustomStyledDatePicker';
import { useGetLocationsQuery } from '../../../Redux/Location/locationApiSlice';
import moment from 'moment-timezone';
import Loader from '../../shared/Loader/Loader'; 
import LocationInput from './LocationInput';

import { faBus, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
const MainSection = ({ onSearch }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const [openInput, setOpenInput] = useState(null); // State to control which input is open

  const queryParams = new URLSearchParams(location.search);

  const [fromLocation, setFromLocation] = useState(() => queryParams.get('departureLocation') || localStorage.getItem('fromLocation') || '');
  const [toLocation, setToLocation] = useState(() => queryParams.get('arrivalLocation') || localStorage.getItem('toLocation') || '');
  const [ticketType, setTicketType] = useState(() => localStorage.getItem('ticketType') || 'oneWay');
  const [ticketQuantity, setTicketQuantity] = useState(() => parseInt(queryParams.get('ticketCount')) || parseInt(localStorage.getItem('ticketQuantity')) || 1);
  const [departureDate, setDepartureDate] = useState(() => {
    const storedDate = queryParams.get('departureDate') || localStorage.getItem('departureDate');
    return storedDate ? new Date(storedDate) : null;
  });
  const [returnDate, setReturnDate] = useState(() => {
    const storedDate = localStorage.getItem('returnDate');
    return storedDate ? new Date(storedDate) : null;
  }); 

  const { data: locations, isLoading: isLocationsLoading, error } = useGetLocationsQuery();

  const handleSwapLocations = () => {
    const temp = fromLocation;
    setFromLocation(toLocation);
    setToLocation(temp);
  };

  const handleSearch = () => {
    if (!fromLocation || !toLocation || !departureDate) {
      alert('Vui lòng chọn đầy đủ thông tin trước khi tìm kiếm!');
      return;
    }

    setIsLoading(true);

    const formattedDepartureDate = moment(departureDate).format('YYYY-MM-DD');
    const searchParams = {
      departureLocation: fromLocation,
      arrivalLocation: toLocation,
      departureDate: formattedDepartureDate,
      ticketCount: ticketQuantity,
    };

    localStorage.setItem('searchParams', JSON.stringify(searchParams));

    if (onSearch) {
      onSearch(); 
    }
    navigate(`/search-page?departureLocation=${encodeURIComponent(fromLocation)}&arrivalLocation=${encodeURIComponent(toLocation)}&departureDate=${formattedDepartureDate}&ticketCount=${ticketQuantity}`);

    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  };

  if (isLoading || isLocationsLoading) return <Loader />;

  if (error) return <div>Lỗi khi tải địa điểm</div>;

  return (
    <section>
      <div className="bg-white shadow-lg rounded-lg p-4 sm:p-6 space-y-4">
        <div className="flex justify-between items-center flex-wrap">
          <div className="flex space-x-4 mb-2">
            <label className="flex items-center">
              <input
                type="radio"
                name="ticketType"
                value="oneWay"
                checked={ticketType === 'oneWay'}
                onChange={(e) => setTicketType(e.target.value)}
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
                onChange={(e) => setTicketType(e.target.value)}
                className="form-radio text-blue-600"
              />
              <span className="ml-2">Khứ hồi</span>
            </label>
          </div>
          <a href="#" className="text-orange-500 text-sm hover:underline">
            Hướng dẫn mua vé
          </a>
        </div>

        <div className="flex flex-col sm:flex-row flex-wrap gap-2">
          <LocationInput
            label="Nơi xuất phát"
            value={fromLocation}
            onChange={(e) => setFromLocation(e.target.value)}
            placeholder="Chọn nơi xuất phát"
            icon={faBus}
            iconColor="text-blue-500"
            options={locations?.data}
            isOpen={openInput === 'fromLocation'}
            onToggle={() => setOpenInput(openInput === 'fromLocation' ? null : 'fromLocation')}
          />

          <div className="flex justify-center items-center">
            <button
              className="bg-gray-100 text-gray-600 p-3 rounded-full hover:bg-gray-300 focus:outline-none shadow-md transition duration-300 ease-in-out"
              onClick={handleSwapLocations}
              aria-label="Hoán đổi vị trí"
            >
              <ArrowPathIcon className="h-6 w-6" />
            </button>
          </div>

          <LocationInput
            label="Nơi đến"
            value={toLocation}
            onChange={(e) => setToLocation(e.target.value)}
            placeholder="Chọn nơi đến"
            icon={faMapMarkerAlt}
            iconColor="text-red-500"
            options={locations?.data}
            isOpen={openInput === 'toLocation'}
            onToggle={() => setOpenInput(openInput === 'toLocation' ? null : 'toLocation')}
          />

          <CustomDatePicker
            label="Ngày đi"
            selectedDate={departureDate}
            onDateChange={(date) => setDepartureDate(date)}
          />

          {ticketType === 'roundTrip' && (
            <CustomDatePicker
              label="Ngày về"
              selectedDate={returnDate}
              onDateChange={(date) => setReturnDate(date)}
            />
          )}

          <div className="relative w-full md:flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">Số lượng vé</label>
            <div className="border rounded-lg py-2 px-4">
              <select
                value={ticketQuantity}
                onChange={(e) => setTicketQuantity(parseInt(e.target.value))}
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

        <div className="flex justify-center mt-4">
          <button
            className="bg-orange-500 text-white py-3 px-8 rounded-full hover:bg-orange-600 transition duration-300 ease-in-out w-full sm:w-auto"
            onClick={handleSearch}
          >
            Tìm chuyến xe
          </button>
        </div>
      </div>
    </section>
  );
};

export default React.memo(MainSection);
