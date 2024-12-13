import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useCreateTripMutation, useUpdateTripMutation, useGetTripByIdQuery } from '../../../../Redux/Trip/TripApiSlice';
import { useGetLocationsQuery } from '../../../../Redux/Location/locationApiSlice';
import { useGetBusTypesQuery } from '../../../../Redux/Bustype/BusTypeApiSlice';
import { formatCurrency, timeUtils } from '../../../../utils/formatUtils';
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
    pickupPoints: [],
    dropOffPoints: [],
  });

  useEffect(() => {
    if (tripData && tripData.data) {
      const trip = tripData.data.trip;
      setFormData({
        departureLocation: trip?.departureLocation?._id || '',
        arrivalLocation: trip?.arrivalLocation?._id || '',
        busType: trip?.busType?._id || '',
        departureTime: timeUtils.parseUTCTimeForForm(trip.departureTime),
        arrivalTime: timeUtils.parseUTCTimeForForm(trip.arrivalTime),
        basePrice: trip?.basePrice,
        isRoundTrip: trip?.isRoundTrip || false,
        pickupPoints: trip?.pickupPoints || [],
        dropOffPoints: trip?.dropOffPoints || [],
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

  // Tính toán thời gian tự động cho điểm đón
  const calculatePickupTimes = (departureTime, pickupPoints) => {
    const departureMoment = moment(departureTime);
    return pickupPoints.map((point, index) => {
      const timeOffset = index * 15; // Giả định mỗi điểm cách nhau 15 phút
      return {
        ...point,
        time: departureMoment.clone().add(timeOffset, 'minutes').format('HH:mm'),
      };
    });
  };

  // Tính toán thời gian tự động cho điểm trả
  const calculateDropOffTimes = (arrivalTime, dropOffPoints) => {
    const arrivalMoment = moment(arrivalTime);
    return dropOffPoints.map((point, index) => {
      const timeOffset = (dropOffPoints.length - 1 - index) * 15; // Tính ngược thời gian
      return {
        ...point,
        time: arrivalMoment.clone().subtract(timeOffset, 'minutes').format('HH:mm'),
      };
    });
  };

  // Xử lý thêm/xóa/chỉnh sửa điểm đón
  const handleAddPickup = () => {
    setFormData({
      ...formData,
      pickupPoints: [...formData.pickupPoints, { location: '', note: '' }],
    });
  };

  const handleRemovePickup = (index) => {
    const updatedPickupPoints = [...formData.pickupPoints];
    updatedPickupPoints.splice(index, 1);
    setFormData({ ...formData, pickupPoints: updatedPickupPoints });
  };

  const handlePickupChange = (index, field, value) => {
    const updatedPickupPoints = [...formData.pickupPoints];
    updatedPickupPoints[index][field] = value;
    setFormData({ ...formData, pickupPoints: updatedPickupPoints });
  };

  // Xử lý thêm/xóa/chỉnh sửa điểm trả
  const handleAddDropOff = () => {
    setFormData({
      ...formData,
      dropOffPoints: [...formData.dropOffPoints, { location: '', note: '' }],
    });
  };

  const handleRemoveDropOff = (index) => {
    const updatedDropOffPoints = [...formData.dropOffPoints];
    updatedDropOffPoints.splice(index, 1);
    setFormData({ ...formData, dropOffPoints: updatedDropOffPoints });
  };

  const handleDropOffChange = (index, field, value) => {
    const updatedDropOffPoints = [...formData.dropOffPoints];
    updatedDropOffPoints[index][field] = value;
    setFormData({ ...formData, dropOffPoints: updatedDropOffPoints });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Tự động tính toán thời gian cho điểm đón và điểm trả
      const pickupPointsWithTimes = calculatePickupTimes(formData.departureTime, formData.pickupPoints);
      const dropOffPointsWithTimes = calculateDropOffTimes(formData.arrivalTime, formData.dropOffPoints);

      const tripDetails = {
        ...formData,
        pickupPoints: pickupPointsWithTimes,
        dropOffPoints: dropOffPointsWithTimes,
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
    <form onSubmit={handleSubmit} className="p-4 bg-white rounded-lg shadow-lg">
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
          {!isLoadingLocations &&
            locationData?.data?.map((location) => (
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
          {!isLoadingLocations &&
            locationData?.data?.map((location) => (
              <option key={location._id} value={location._id}>
                {location.name} - {location.city}
              </option>
            ))}
        </select>
      </div>
  <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700">Thời Gian Khởi Hành:</label>
        <DatePicker
          selected={formData.departureTime}
          onChange={(date) => handleDateChange('departureTime', date)}
          showTimeSelect
          timeFormat="HH:mm"
          timeIntervals={15}
          dateFormat="dd/MM/yyyy HH:mm"
          className="mt-2 p-3 border rounded w-full focus:ring focus:ring-blue-500"
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
          className="mt-2 p-3 border rounded w-full focus:ring focus:ring-blue-500"
          required
        />
      </div>
      {/* Điểm Đón */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700">Điểm Đón:</label>
        {formData.pickupPoints.map((point, index) => (
          <div key={index} className="flex items-center mb-2">
            <input
              type="text"
              placeholder="Địa điểm"
              value={point.location}
              onChange={(e) => handlePickupChange(index, 'location', e.target.value)}
              className="mr-2 p-2 border rounded w-2/3 focus:ring focus:ring-green-500"
              required
            />
            <input
              type="text"
              placeholder="Ghi chú"
              value={point.note}
              onChange={(e) => handlePickupChange(index, 'note', e.target.value)}
              className="mr-2 p-2 border rounded w-1/3 focus:ring focus:ring-green-500"
            />
            <button
              type="button"
              onClick={() => handleRemovePickup(index)}
              className="text-red-500 hover:text-red-700"
            >
              Xóa
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={handleAddPickup}
          className="mt-2 text-blue-500 hover:text-blue-700"
        >
          + Thêm Điểm Đón
        </button>
      </div>

      {/* Điểm Trả */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700">Điểm Trả:</label>
        {formData.dropOffPoints.map((point, index) => (
          <div key={index} className="flex items-center mb-2">
            <input
              type="text"
              placeholder="Địa điểm"
              value={point.location}
              onChange={(e) => handleDropOffChange(index, 'location', e.target.value)}
              className="mr-2 p-2 border rounded w-2/3 focus:ring focus:ring-green-500"
              required
            />
            <input
              type="text"
              placeholder="Ghi chú"
              value={point.note}
              onChange={(e) => handleDropOffChange(index, 'note', e.target.value)}
              className="mr-2 p-2 border rounded w-1/3 focus:ring focus:ring-green-500"
            />
            <button
              type="button"
              onClick={() => handleRemoveDropOff(index)}
              className="text-red-500 hover:text-red-700"
            >
              Xóa
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={handleAddDropOff}
          className="mt-2 text-blue-500 hover:text-blue-700"
        >
          + Thêm Điểm Trả
        </button>
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
