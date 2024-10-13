import React, { useState } from 'react';
import { ChevronDownIcon, ChevronRightIcon } from '@heroicons/react/24/outline'; // Import các icon cần thiết

const FilterSidebar = ({ onFilterChange }) => {
  const [openSections, setOpenSections] = useState({
    departureTime: false,
    busOperator: false,
    priceRange: false,
  });

  const toggleSection = (section) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  return (
    <div className="filter-sidebar p-4 shadow-xl bg-white rounded-3xl sticky top-4 h-[calc(100vh-50px)] overflow-y-auto border border-gray-200">
      {/* Header */}
      <h3 className="text-xl font-extrabold text-gray-900 mb-6">Bộ lọc</h3>

      {/* Card for Sorting */}
      <div className="space-y-4 mb-6 bg-gray-50 p-4 rounded-lg shadow-md border border-gray-200">
        <h4 className="text-lg font-semibold text-gray-800">Sắp xếp</h4>
        {[
          { value: 'default', label: 'Mặc định' },
          { value: 'earliest', label: 'Giờ đi sớm nhất' },
          { value: 'latest', label: 'Giờ đi muộn nhất' },
          { value: 'priceAsc', label: 'Giá tăng dần' },
          { value: 'priceDesc', label: 'Giá giảm dần' },
        ].map(({ value, label }) => (
          <label key={value} className="flex items-center space-x-3 cursor-pointer transition hover:bg-gray-100 rounded-lg p-2">
            <input
              type="radio"
              name="sort"
              value={value}
              onChange={(e) => onFilterChange('sort', e.target.value)}
              className="form-radio h-5 w-5 text-blue-600 focus:ring-blue-500"
            />
            <span className="text-gray-700">{label}</span>
          </label>
        ))}
      </div>

      <hr className="my-6" />

      {/* Card for Filters */}
      <div className="space-y-6">
        <div className="bg-white p-4 rounded-lg shadow-md border border-gray-200">
          <h4 onClick={() => toggleSection('departureTime')} className="text-lg font-semibold text-gray-800 mb-2 cursor-pointer flex justify-between items-center">
            Giờ đi
            {openSections.departureTime ? (
              <ChevronDownIcon className="h-5 w-5 text-gray-600" />
            ) : (
              <ChevronRightIcon className="h-5 w-5 text-gray-600" />
            )}
          </h4>
          {openSections.departureTime && (
            <select
              className="w-full p-3 border border-gray-300 rounded-lg mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => onFilterChange('departureTimeRange', e.target.value)}
            >
              <option value="">Tất cả</option>
              <option value="morning">Buổi sáng</option>
              <option value="afternoon">Buổi chiều</option>
            </select>
          )}
        </div>

        <div className="bg-white p-4 rounded-lg shadow-md border border-gray-200">
          <h4 onClick={() => toggleSection('busOperator')} className="text-lg font-semibold text-gray-800 mb-2 cursor-pointer flex justify-between items-center">
            Nhà xe
            {openSections.busOperator ? (
              <ChevronDownIcon className="h-5 w-5 text-gray-600" />
            ) : (
              <ChevronRightIcon className="h-5 w-5 text-gray-600" />
            )}
          </h4>
          {openSections.busOperator && (
            <select
              className="w-full p-3 border border-gray-300 rounded-lg mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => onFilterChange('busOperator', e.target.value)}
            >
              <option value="">Tất cả</option>
              <option value="Vie Limousine">Vie Limousine</option>
              <option value="Thành Bưởi">Thành Bưởi</option>
            </select>
          )}
        </div>

        <div className="bg-white p-4 rounded-lg shadow-md border border-gray-200">
          <h4 onClick={() => toggleSection('priceRange')} className="text-lg font-semibold text-gray-800 mb-2 cursor-pointer flex justify-between items-center">
            Giá vé
            {openSections.priceRange ? (
              <ChevronDownIcon className="h-5 w-5 text-gray-600" />
            ) : (
              <ChevronRightIcon className="h-5 w-5 text-gray-600" />
            )}
          </h4>
          {openSections.priceRange && (
            <select
              className="w-full p-3 border border-gray-300 rounded-lg mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => onFilterChange('priceRange', e.target.value)}
            >
              <option value="">Tất cả</option>
              <option value="low">Dưới 200.000</option>
              <option value="medium">200.000 - 500.000</option>
              <option value="high">Trên 500.000</option>
            </select>
          )}
        </div>

        <div className="flex justify-end">
          <button
            className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition"
            onClick={() => onFilterChange('clear', '')}
          >
            Xóa lọc
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterSidebar;
