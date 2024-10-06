import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useCreateTripMutation, useUpdateTripMutation, useGetTripByIdQuery } from '../../../../Redux/Trip/TripApiSlice';
import { useGetLocationsQuery } from '../../../../Redux/Location/locationApiSlice'; 

const TripForm = ({ tripId, closeDrawer }) => {
  const { companyId } = useSelector((state) => state.user.userInfo); 
  const [createTrip] = useCreateTripMutation();
  const [updateTrip] = useUpdateTripMutation();
  const { data: tripData } = useGetTripByIdQuery(tripId, { skip: !tripId });

  // Lấy danh sách địa điểm từ API
  const { data: locationData, isLoading: isLoadingLocations } = useGetLocationsQuery();

  const [formData, setFormData] = useState({
    departureLocation: '',
    arrivalLocation: '',
    busType: '',
    departureTime: '',
    arrivalTime: '',
    basePrice: '',
    isRoundTrip: false,
    hasSchedule: false, // State mới để quyết định có hiển thị lịch trình không
    schedule: [],
  });

  // Cập nhật form khi có dữ liệu tripData (trường hợp chỉnh sửa chuyến đi)
  useEffect(() => {
    if (tripData) {
      setFormData({
        departureLocation: tripData.departureLocation._id, // Lưu ObjectId của departureLocation
        arrivalLocation: tripData.arrivalLocation._id, // Lưu ObjectId của arrivalLocation
        busType: tripData.busType.name,
        departureTime: tripData.departureTime.slice(0, 16),
        arrivalTime: tripData.arrivalTime.slice(0, 16),
        basePrice: tripData.basePrice,
        isRoundTrip: tripData.isRoundTrip || false,
        hasSchedule: tripData.schedule.length > 0, // Tự động bật nếu có schedule
        schedule: tripData.schedule || [],
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
    try {
      const tripDetails = { ...formData, companyId };
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
      
      {/* Select cho Điểm Khởi Hành */}
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
          {/* Hiển thị danh sách địa điểm từ API */}
          {!isLoadingLocations && locationData?.data?.map((location) => (
            <option key={location._id} value={location._id}>
              {location.name} - {location.city}
            </option>
          ))}
        </select>
      </div>

      {/* Select cho Điểm Đến */}
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
          {/* Hiển thị danh sách địa điểm từ API */}
          {!isLoadingLocations && locationData?.data?.map((location) => (
            <option key={location._id} value={location._id}>
              {location.name} - {location.city}
            </option>
          ))}
        </select>
      </div>

      {/* Thời gian khởi hành */}
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

      {/* Giá vé cơ bản */}
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
      </div>

      {/* Checkbox cho khứ hồi */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700">
          <input
            type="checkbox"
            name="isRoundTrip"
            checked={formData.isRoundTrip}
            onChange={handleChange}
            className="mr-2"
          />
          Chuyến Khứ Hồi
        </label>
      </div>

      {/* Nút Gửi */}
      <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded w-full">
        {tripId ? 'Cập Nhật Chuyến Đi' : 'Tạo Chuyến Đi'}
      </button>
    </form>
  );
};

export default TripForm;
