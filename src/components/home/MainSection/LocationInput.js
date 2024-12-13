import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const LocationInput = ({ label, value, onChange, options, placeholder, icon, isOpen, onToggle, iconColor }) => {
  const [recentLocations, setRecentLocations] = useState([]);

  useEffect(() => {
    const storedLocations = JSON.parse(localStorage.getItem('recentLocations')) || [];
    setRecentLocations(storedLocations.slice(0, 2));
  }, []);

  const handleSelect = (locationName) => {
    onChange({ target: { value: locationName } });
    onToggle();

    const updatedRecentLocations = [locationName, ...recentLocations.filter(name => name !== locationName)].slice(0, 2);
    setRecentLocations(updatedRecentLocations);
    localStorage.setItem('recentLocations', JSON.stringify(updatedRecentLocations));
  };

  const removeRecentLocation = (locationName) => {
    const updatedRecentLocations = recentLocations.filter(name => name !== locationName);
    setRecentLocations(updatedRecentLocations);
    localStorage.setItem('recentLocations', JSON.stringify(updatedRecentLocations));
  };

  return (
    <div className="relative w-full md:flex-1">
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <div className="relative flex items-center border-2 rounded-lg shadow-md py-2 px-2 bg-white" onClick={onToggle}>
        {/* Áp dụng màu sắc từ iconColor */}
        <FontAwesomeIcon icon={icon} className={`mr-2 ${iconColor}`} />
        <button className="flex-grow text-left bg-transparent focus:outline-none">
          {value || placeholder}
        </button>
        <span className="ml-2 fas fa-chevron-down text-gray-500"></span>
      </div>
      {isOpen && (
        <div className="absolute mt-1 w-full bg-white border rounded-lg shadow-lg z-50 p-2">
          <div className="p-2 font-semibold text-gray-700">TỈNH/THÀNH PHỐ</div>
          <div className="max-h-48 overflow-y-auto">
            {options?.map((location) => (
              <div
                key={location._id}
                onClick={() => handleSelect(location.name)}
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
                {recentLocations.map((location, index) => (
                  <div key={index} className="flex items-center bg-gray-200 px-3 py-1 rounded-full text-sm hover:bg-gray-300 transition">
                    <span onClick={() => handleSelect(location)} className="cursor-pointer">{location}</span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        removeRecentLocation(location);
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

export default LocationInput;
