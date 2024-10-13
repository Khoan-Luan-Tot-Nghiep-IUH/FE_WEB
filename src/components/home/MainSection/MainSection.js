import React, { useState, useEffect } from 'react';
import { ArrowPathIcon } from '@heroicons/react/24/solid';
import { useNavigate } from 'react-router-dom'; 
import CustomDatePicker from '../../UI/CustomStyledDatePicker';
import { useGetLocationsQuery } from '../../../Redux/Location/locationApiSlice';
import moment from 'moment-timezone';
import Loader from '../../shared/Loader/Loader'; 

const LocationInput = ({ label, value, onChange, options, placeholder, iconClass }) => (
  <div className="relative w-full md:flex-1">
    <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
    <div className="relative flex items-center border-2 rounded-lg shadow-md py-2 px-4 bg-white">
      <span className={`mr-2 ${iconClass}`} />
      <select
        value={value}
        onChange={onChange}
        className="flex-grow focus:outline-none bg-transparent"
        aria-label={label}
      >
        <option value="">{placeholder}</option>
        <optgroup label="Địa điểm phổ biến">
          {options?.map((location) => (
            <option key={location._id} value={location.name}>
              {location.name}
            </option>
          ))}
        </optgroup>
      </select>
      <span className="ml-2 fas fa-chevron-down text-gray-500"></span>
    </div>
  </div>
);

const MainSection = () => {
  const [fromLocation, setFromLocation] = useState(() => localStorage.getItem('fromLocation') || '');
  const [toLocation, setToLocation] = useState(() => localStorage.getItem('toLocation') || '');
  const [ticketType, setTicketType] = useState(() => localStorage.getItem('ticketType') || 'oneWay');
  const [ticketQuantity, setTicketQuantity] = useState(() => {
    const storedQuantity = localStorage.getItem('ticketQuantity');
    return storedQuantity ? parseInt(storedQuantity, 10) : 1;
  });

  const [isLoading, setIsLoading] = useState(false);  // Thêm trạng thái loading
  const parseStoredDate = (date) => {
    return date && !isNaN(Date.parse(date)) ? new Date(date) : null;
  };

  const [departureDate, setDepartureDate] = useState(() => parseStoredDate(localStorage.getItem('departureDate')));
  const [returnDate, setReturnDate] = useState(() => parseStoredDate(localStorage.getItem('returnDate')));

  const { data: locations, isLoading: isLocationsLoading, error } = useGetLocationsQuery();
  const navigate = useNavigate(); // Sử dụng hook useNavigate để điều hướng

  // Lưu lại giá trị vào localStorage nếu chúng hợp lệ
  useEffect(() => {
    localStorage.setItem('fromLocation', fromLocation);
  }, [fromLocation]);

  useEffect(() => {
    localStorage.setItem('toLocation', toLocation);
  }, [toLocation]);

  useEffect(() => {
    localStorage.setItem('ticketType', ticketType);
  }, [ticketType]);

  useEffect(() => {
    if (Number.isInteger(ticketQuantity) && ticketQuantity > 0) {
      localStorage.setItem('ticketQuantity', ticketQuantity.toString());
    }
  }, [ticketQuantity]);

  useEffect(() => {
    if (departureDate && departureDate instanceof Date && !isNaN(departureDate)) {
      localStorage.setItem('departureDate', departureDate.toISOString());
    } else {
      localStorage.removeItem('departureDate');
    }
  }, [departureDate]);

  useEffect(() => {
    if (returnDate && returnDate instanceof Date && !isNaN(returnDate)) {
      localStorage.setItem('returnDate', returnDate.toISOString());
    } else {
      localStorage.removeItem('returnDate');
    }
  }, [returnDate]);

  const handleSwapLocations = () => {
    const temp = fromLocation;
    setFromLocation(toLocation);
    setToLocation(temp);
  };

  const handleSearch = () => {
    // Kiểm tra xem các thông tin tìm kiếm có hợp lệ không trước khi điều hướng
    if (!fromLocation || !toLocation || !departureDate) {
      alert('Vui lòng chọn đầy đủ thông tin trước khi tìm kiếm!');
      return;
    }

    // Bắt đầu hiển thị loader
    setIsLoading(true);

    const formattedDepartureDate = moment(departureDate).format('YYYY-MM-DD');
    const formattedReturnDate = returnDate ? moment(returnDate).format('YYYY-MM-DD') : null;

    // Giả lập việc chờ đợi API để mô phỏng quá trình lấy dữ liệu
    setTimeout(() => {
      // Điều hướng sau khi dữ liệu sẵn sàng
      navigate('/search-page', {
        state: {
          departureLocation: fromLocation,
          arrivalLocation: toLocation,
          departureDate: formattedDepartureDate,
          returnDate: formattedReturnDate,
          ticketCount: ticketQuantity,
          ticketType,
        },
      });
      // Dừng hiển thị loader
      setIsLoading(false);
    }, 1500); // Giả lập thời gian chờ 1.5 giây
  };

  if (isLoading || isLocationsLoading) return <Loader />; // Hiển thị loader trong quá trình tải dữ liệu

  if (error) return <div>Lỗi khi tải địa điểm</div>;

  return (
    <section>
      <div>
        <div className="bg-white shadow-lg rounded-lg p-6 space-y-4">
          <div className="flex justify-between">
            <div className="flex space-x-6">
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

          <div className="flex flex-col md:flex-row items-start space-y-4 md:space-y-0 md:space-x-4">
            <LocationInput
              label="Nơi xuất phát"
              value={fromLocation}
              onChange={(e) => setFromLocation(e.target.value)}
              placeholder="Chọn nơi xuất phát"
              iconClass="fas fa-circle text-blue-500"
              options={locations?.data}
            />

            <div className="relative flex justify-center items-center">
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
              iconClass="fas fa-map-marker-alt text-red-500"
              options={locations?.data}
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
              className="bg-orange-500 text-white py-3 px-8 rounded-full hover:bg-orange-600 transition duration-300 ease-in-out"
              onClick={handleSearch}
            >
              Tìm chuyến xe
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default React.memo(MainSection);
