import React from 'react';

const CompanyCard = ({ company, onClick, onToggleStatus }) => {
  return (
    <div
      className="company-card bg-gradient-to-r from-blue-400 to-purple-300 rounded-lg shadow-lg p-6 hover:shadow-2xl transition-shadow duration-300 cursor-pointer text-white"
      onClick={onClick}
    >
      <h3 className="text-lg font-bold mb-2">{company.name}</h3>
      <p className="text-sm mb-4">{company.address}</p>
      <p
        className={`text-sm font-semibold ${
          company.isActive ? 'text-green-200' : 'text-red-200'
        }`}
      >
        {company.isActive ? 'Kích hoạt' : 'Vô hiệu hóa'}
      </p>

      <div className="mt-4 flex items-center">
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            className="sr-only"
            checked={company.isActive}
            onChange={() => onToggleStatus(company._id)}
          />
          <div
            className={`w-10 h-5 rounded-full transition-all duration-300 ease-in-out ${
              company.isActive ? 'bg-green-400' : 'bg-red-400'
            }`}
          >
            <div
              className={`dot absolute left-1 top-1 bg-white w-3 h-3 rounded-full transition-transform duration-300 ease-in-out ${
                company.isActive ? 'transform translate-x-5' : ''
              }`}
            ></div>
          </div>
          <span className="ml-3 text-sm">
            {company.isActive ? 'Vô hiệu hóa' : 'Kích hoạt'}
          </span>
        </label>
      </div>
    </div>
  );
};

export default CompanyCard;
