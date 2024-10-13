import React from 'react';
import Select from 'react-select';

const LocationInput = ({ label, value, onChange, options, placeholder, iconClass }) => (
  <div className="relative w-full md:flex-1">
    <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
    <div className="relative flex items-center border-2 rounded-lg shadow-md py-2 px-4 bg-white">
      <span className={`mr-2 ${iconClass}`} />
      <Select
        value={options.find(option => option.value === value)}
        onChange={(selectedOption) => onChange(selectedOption?.value)}
        options={options}
        placeholder={placeholder}
        className="flex-grow"
        isSearchable // Cho phép tìm kiếm địa điểm
        aria-label={label}
      />
    </div>
  </div>
);
