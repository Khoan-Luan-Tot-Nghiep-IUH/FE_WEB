import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useCreateTripMutation, useUpdateTripMutation, useGetTripByIdQuery } from '../../../../Redux/Trip/TripApiSlice';
import { useGetLocationsQuery } from '../../../../Redux/Location/locationApiSlice';
import { useGetBusTypesQuery } from '../../../../Redux/Bustype/BusTypeApiSlice';
import { formatDateForInput, formatDateForServer, formatCurrency } from '../../../../utils/formatUtils';

const TripForm = ({ tripId, closeDrawer }) => {
  const { companyId } = useSelector((state) => state.user.userInfo);
  console.log(companyId);
  const [createTrip] = useCreateTripMutation();
  const [updateTrip] = useUpdateTripMutation();

  const { data: tripData  } = useGetTripByIdQuery(tripId, { skip: !tripId });

  const { data: locationData, isLoading: isLoadingLocations } = useGetLocationsQuery();
  const { data: busTypeData, isLoading: isLoadingBusTypes, error: busTypeError } = useGetBusTypesQuery({ companyId }, { skip: !companyId });

  const [formData, setFormData] = useState({
    departureLocation: '',
    arrivalLocation: '',
    busType: '',
    departureTime: '',
    arrivalTime: '',
    basePrice: '',
    isRoundTrip: false,
  });

  useEffect(() => {
    if (tripData && tripData.data) {
      const trip = tripData.data.trip;
      setFormData({
        departureLocation: trip?.departureLocation?._id || '',
        arrivalLocation: trip?.arrivalLocation?._id || '',
        busType: trip?.busType?._id || '',
        departureTime: formatDateForInput(trip?.departureTime),
        arrivalTime: formatDateForInput(trip?.arrivalTime),
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Kiểm tra thời gian hợp lệ
    if (new Date(formData.arrivalTime) <= new Date(formData.departureTime)) {
      alert('Thời gian đến phải lớn hơn thời gian khởi hành!');
      return;
    }

    try {
      // Định dạng thời gian và giá vé trước khi gửi lên server
      const tripDetails = {
        ...formData,
        companyId,
        departureTime: formatDateForServer(formData.departureTime),
        arrivalTime: formatDateForServer(formData.arrivalTime),
        basePrice: parseInt(formData.basePrice, 10), // Chuyển basePrice thành số nguyên
      };

      if (tripId) {
        await updateTrip({ tripId, updatedTrip: tripDetails }).unwrap();
      } else {
        await createTrip(tripDetails).unwrap();
      }
      closeDrawer();
    } catch (err) {
      console.error('Lỗi khi lưu chuyến đi:', err);
      alert(`Lỗi khi lưu chuyến đi: ${err.message}`);
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
        <input
          type="datetime-local"
          name="departureTime"
          value={formData.departureTime}
          onChange={handleChange}
          className="mt-2 p-2 border rounded w-full focus:ring focus:ring-green-500"
          required
        />
      </div>

      {/* Thời Gian Đến */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700">Thời Gian Đến:</label>
        <input
          type="datetime-local"
          name="arrivalTime"
          value={formData.arrivalTime}
          onChange={handleChange}
          className="mt-2 p-2 border rounded w-full focus:ring focus:ring-green-500"
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
