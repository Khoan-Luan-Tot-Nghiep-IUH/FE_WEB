import React, { useState } from 'react';
import { Spin, Typography } from 'antd';
import { useGetLocationsQuery } from '../../../Redux/Location/locationApiSlice';

const { Text } = Typography;

const LocationSelect = ({ label, value, onChange, placeholder, isOpen, onToggle }) => {
  const { data: apiResponse, isLoading, error } = useGetLocationsQuery();
  const locations = Array.isArray(apiResponse?.data) ? apiResponse.data : []; // Đảm bảo locations luôn là mảng
  const [recentLocations, setRecentLocations] = useState([]);

  const handleSelect = (location) => {
    onChange(location._id); // Cập nhật trạng thái bằng _id thay vì name
    onToggle();

    const updatedRecentLocations = [
      location,
      ...recentLocations.filter((loc) => loc._id !== location._id),
    ].slice(0, 2);

    setRecentLocations(updatedRecentLocations);
  };

  const removeRecentLocation = (locationId) => {
    const updatedRecentLocations = recentLocations.filter((loc) => loc._id !== locationId);
    setRecentLocations(updatedRecentLocations);
  };

  if (isLoading) {
    return (
      <div className="text-center">
        <Spin tip="Đang tải danh sách địa điểm..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500">
        <Text type="danger">Không thể tải danh sách địa điểm. Vui lòng thử lại.</Text>
      </div>
    );
  }

  return (
    <div className="relative w-full">
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <div
        className="relative flex items-center border-2 rounded-lg shadow-md py-2 px-4 bg-white cursor-pointer"
        onClick={onToggle}
      >
        <span className="flex-grow text-left text-gray-700">
          {value
            ? locations.find((loc) => loc._id === value)?.name || 'Chưa chọn'
            : placeholder}
        </span>
        <span className="ml-2 fas fa-chevron-down text-gray-500"></span>
      </div>
      {isOpen && (
        <div className="absolute mt-1 w-full bg-white border rounded-lg shadow-lg z-50 p-2">
          <div className="p-2 font-semibold text-gray-700">TỈNH/THÀNH PHỐ</div>
          <div className="max-h-48 overflow-y-auto">
            {locations.map((location) => (
              <div
                key={location._id}
                onClick={() => handleSelect(location)}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer border-b last:border-none"
              >
                {location.name}
              </div>
            ))}
          </div>
          {recentLocations.length > 0 && (
            <>
              <hr className="my-2" />
              <div className="p-2 font-semibold text-gray-700">TÌM KIẾM GẦN ĐÂY</div>
              <div className="flex flex-wrap gap-2 px-4 py-2">
                {recentLocations.map((location) => (
                  <div
                    key={location._id}
                    className="flex items-center bg-gray-200 px-3 py-1 rounded-full text-sm hover:bg-gray-300 transition"
                  >
                    <span
                      onClick={() => handleSelect(location)}
                      className="cursor-pointer"
                    >
                      {location.name}
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        removeRecentLocation(location._id);
                      }}
                      className="ml-2 text-red-500 hover:text-red-700 focus:outline-none"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default LocationSelect;
