import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useCreateTripMutation, useUpdateTripMutation, useGetTripByIdQuery } from '../../../Redux/Trip/TripApiSlice';

const TripForm = ({ tripId, closeDrawer }) => {
  const { companyId } = useSelector((state) => state.user.userInfo); // Lấy `companyId` từ Redux store
  const [createTrip] = useCreateTripMutation();
  const [updateTrip] = useUpdateTripMutation();
  const { data: tripData } = useGetTripByIdQuery(tripId, { skip: !tripId });

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

  useEffect(() => {
    if (tripData) {
      setFormData({
        departureLocation: tripData.departureLocation.name,
        arrivalLocation: tripData.arrivalLocation.name,
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

  // Xử lý khi thêm lịch trình mới
  const handleScheduleChange = (index, field, value) => {
    const newSchedule = [...formData.schedule];
    newSchedule[index][field] = value;
    setFormData({ ...formData, schedule: newSchedule });
  };

  // Thêm một điểm dừng mới
  const addStop = () => {
    setFormData({
      ...formData,
      schedule: [
        ...formData.schedule,
        { stopName: '', stopAddress: '', estimatedArrivalTime: '', stopOrder: formData.schedule.length + 1 },
      ],
    });
  };

  // Xóa một điểm dừng
  const removeStop = (index) => {
    const newSchedule = formData.schedule.filter((_, i) => i !== index);
    setFormData({ ...formData, schedule: newSchedule });
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
      
      {/* Input cho Điểm Khởi Hành */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700">Điểm Khởi Hành:</label>
        <input
          type="text"
          name="departureLocation"
          value={formData.departureLocation}
          onChange={handleChange}
          placeholder="Nhập điểm khởi hành"
          className="mt-2 p-2 border rounded w-full focus:ring focus:ring-green-500"
          required
        />
      </div>

      {/* Input cho Điểm Đến */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700">Điểm Đến:</label>
        <input
          type="text"
          name="arrivalLocation"
          value={formData.arrivalLocation}
          onChange={handleChange}
          placeholder="Nhập điểm đến"
          className="mt-2 p-2 border rounded w-full focus:ring focus:ring-green-500"
          required
        />
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

      {/* Toggle Lịch Trình */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700">
          <input
            type="checkbox"
            name="hasSchedule"
            checked={formData.hasSchedule}
            onChange={handleChange}
            className="mr-2"
          />
          Thêm Lịch Trình Dừng
        </label>
      </div>

      {/* Lịch Trình Điểm Dừng */}
      {formData.hasSchedule && (
        <div>
          <h2 className="text-lg font-bold mb-4 text-gray-600">Lịch Trình Điểm Dừng</h2>
          {formData.schedule.map((stop, index) => (
            <div key={index} className="border rounded-lg p-4 mb-4">
              {/* Các trường thông tin của điểm dừng */}
              <label className="block text-sm font-medium text-gray-700">Tên Điểm Dừng:</label>
              <input
                type="text"
                value={stop.stopName}
                onChange={(e) => handleScheduleChange(index, 'stopName', e.target.value)}
                placeholder="Nhập tên điểm dừng"
                className="mt-2 mb-2 p-2 border rounded w-full"
              />
              {/* Tương tự cho các trường khác */}
            </div>
          ))}
          <button type="button" onClick={addStop} className="mb-4 bg-blue-500 text-white px-4 py-2 rounded">
            Thêm Điểm Dừng
          </button>
        </div>
      )}

      <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded w-full">
        {tripId ? 'Cập Nhật Chuyến Đi' : 'Tạo Chuyến Đi'}
      </button>
    </form>
  );
};

export default TripForm;
