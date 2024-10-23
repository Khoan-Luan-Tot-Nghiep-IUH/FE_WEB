import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useCreateTripMutation, useUpdateTripMutation, useGetTripByIdQuery } from '../../../../Redux/Trip/TripApiSlice';
import { useGetLocationsQuery } from '../../../../Redux/Location/locationApiSlice';
import { useGetBusTypesQuery } from '../../../../Redux/Bustype/BusTypeApiSlice';
import { formatCurrency,timeUtils} from '../../../../utils/formatUtils';
import moment from 'moment';

const TripForm = ({ tripId, closeDrawer }) => {
  const { companyId } = useSelector((state) => state.user.userInfo);
  const [createTrip] = useCreateTripMutation();
  const [updateTrip] = useUpdateTripMutation();

  const { data: tripData } = useGetTripByIdQuery(tripId, { skip: !tripId });
  const { data: locationData, isLoading: isLoadingLocations } = useGetLocationsQuery();
  const { data: busTypeData, isLoading: isLoadingBusTypes, error: busTypeError } = useGetBusTypesQuery({ companyId }, { skip: !companyId });

  const [formData, setFormData] = useState({
    departureLocation: '',
    arrivalLocation: '',
    busType: '',
    departureTime: new Date(),
    arrivalTime: new Date(),
    basePrice: '',
    isRoundTrip: false,
  });

  useEffect(() => {
    if (tripData && tripData.data) {
      const trip = tripData.data.trip;
      console.log('Server time:', trip.departureTime);
      console.log('Parsed time for form:', timeUtils.parseUTCTimeForForm(trip.departureTime));
      setFormData({
        departureLocation: trip?.departureLocation?._id || '',
        arrivalLocation: trip?.arrivalLocation?._id || '',
        busType: trip?.busType?._id || '',
        departureTime: timeUtils.parseUTCTimeForForm(trip.departureTime),
        arrivalTime: timeUtils.parseUTCTimeForForm(trip.arrivalTime),
         basePrice: trip?.basePrice,
        isRoundTrip: trip?.isRoundTrip || false,
      });
    }
  }, [tripData]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleDateChange = (name, date) => {
    setFormData({
      ...formData,
      [name]: date,
    });
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const tripDetails = {
        ...formData,
        companyId,
        departureTime: timeUtils.formatTimeForServer(formData.departureTime),
        arrivalTime: timeUtils.formatTimeForServer(formData.arrivalTime),
        basePrice: parseInt(formData.basePrice, 10),
      };

      if (tripId) {
        await updateTrip({ tripId, updatedTrip: tripDetails }).unwrap();
      } else {
        await createTrip(tripDetails).unwrap();
      }
      closeDrawer();
    } catch (err) {
      console.error('Lỗi khi lưu chuyến đi:', err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-6 text-gray-700">{tripId ? 'Sửa Chuyến Đi' : 'Tạo Chuyến Đi Mới'}</h1>

      {/* Điểm Khởi Hành */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700">Điểm Khởi Hành:</label>
        <select
          name="departureLocation"
          value={formData.departureLocation}
          onChange={handleChange}
          className="mt-2 p-2 border rounded w-full focus:ring focus:ring-green-500"
          required
        >
          <option value="">Chọn điểm khởi hành</option>
          {!isLoadingLocations && locationData?.data?.map((location) => (
            <option key={location._id} value={location._id}>
              {location.name} - {location.city}
            </option>
          ))}
        </select>
      </div>

      {/* Điểm Đến */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700">Điểm Đến:</label>
        <select
          name="arrivalLocation"
          value={formData.arrivalLocation}
          onChange={handleChange}
          className="mt-2 p-2 border rounded w-full focus:ring focus:ring-green-500"
          required
        >
          <option value="">Chọn điểm đến</option>
          {!isLoadingLocations && locationData?.data?.map((location) => (
            <option key={location._id} value={location._id}>
              {location.name} - {location.city}
            </option>
          ))}
        </select>
      </div>

      {/* Loại Xe */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700">Loại Xe:</label>
        {isLoadingBusTypes ? (
          <p>Đang tải danh sách loại xe...</p>
        ) : busTypeError ? (
          <p className="text-red-500">Lỗi khi tải danh sách loại xe: {busTypeError.message}</p>
        ) : (
          <select
            name="busType"
            value={formData.busType}
            onChange={handleChange}
            className="mt-2 p-2 border rounded w-full focus:ring focus:ring-green-500"
            required
          >
            <option value="">Chọn loại xe</option>
            {busTypeData?.data.map((busType) => (
              <option key={busType._id} value={busType._id}>
                {busType.name}
              </option>
            ))}
          </select>
        )}
      </div>

      {/* Thời Gian Khởi Hành */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700">Thời Gian Khởi Hành:</label>
          <DatePicker
            selected={formData.departureTime}
            onChange={(date) => handleDateChange('departureTime', date)}
            showTimeSelect
            timeFormat="HH:mm"
            timeIntervals={15}
            dateFormat="dd/MM/yyyy HH:mm"
            className="mt-2 p-3 border border-gray-300 text-gray-700 rounded-lg shadow-sm w-full 
                   focus:outline-none focus:border-blue-400 focus:ring focus:ring-blue-200 
                   transition duration-200 ease-in-out hover:shadow-lg"
            required
          />
      </div>

      {/* Thời Gian Đến */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700">Thời Gian Đến:</label>
        <DatePicker
          selected={formData.arrivalTime}
          onChange={(date) => handleDateChange('arrivalTime', date)}
          showTimeSelect
          timeFormat="HH:mm"
          timeIntervals={15}
          dateFormat="dd/MM/yyyy HH:mm"
          className="mt-2 p-3 border border-gray-300 text-gray-700 rounded-lg shadow-sm w-full 
                   focus:outline-none focus:border-blue-400 focus:ring focus:ring-blue-200 
                   transition duration-200 ease-in-out hover:shadow-lg"
          required
        />
        
      </div>

      {/* Giá Vé Cơ Bản */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700">Giá Vé Cơ Bản:</label>
        <input
          type="number"
          name="basePrice"
          value={formData.basePrice}
          onChange={handleChange}
          placeholder="Nhập giá vé cơ bản"
          className="mt-2 p-2 border rounded w-full focus:ring focus:ring-green-500"
          required
        />
        <div className="mt-2 text-sm text-gray-600">
          Giá vé: {formatCurrency(formData.basePrice)}
        </div>
      </div>

      <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded w-full">
        {tripId ? 'Cập Nhật Chuyến Đi' : 'Tạo Chuyến Đi'}
      </button>
    </form>
  );
};

export default TripForm;
