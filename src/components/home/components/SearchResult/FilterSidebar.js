import React, { useEffect, useState } from "react";
import { ChevronDownIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { useGetCompanyNamesQuery , useGetBusTypesByCompanyQuery } from "../../../../Redux/User/apiSlice";

const FilterSidebar = ({ filters, onFilterChange }) => {
  const [openSections, setOpenSections] = useState({
    sort: true,
    busOperator: true,
    busType: false,
    departureTimeRange: false,
    priceRange: false,
  });
  const [selectedCompany, setSelectedCompany] = useState(null);
  const { data: companyNames, isLoading, isError } = useGetCompanyNamesQuery();
  const { data: busTypes, isLoading: isLoadingBusTypes, isError: isErrorBusTypes, refetch } =
    useGetBusTypesByCompanyQuery(selectedCompany, {
      skip: !selectedCompany, 
    });

    useEffect(() => {
      if (selectedCompany) {
        refetch();
      }
    }, [selectedCompany, refetch]);
  const toggleSection = (section) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  return (
    <div className="filter-sidebar p-3 shadow-xl bg-white rounded-lg md:w-64 lg:w-80 sticky top-4 h-[calc(100vh-50px)] overflow-y-auto border border-gray-200">
      {/* Header */}
      <h3 className="text-xl font-extrabold text-gray-900 mb-6">Bộ lọc</h3>

      {/* Sắp xếp */}
      <div className="mb-6 bg-gray-50 p-4 rounded-lg shadow-md border border-gray-200">
        <h4
          onClick={() => toggleSection("sort")}
          className="text-lg font-semibold text-gray-800 cursor-pointer flex justify-between items-center"
        >
          Sắp xếp
          {openSections.sort ? (
            <ChevronDownIcon className="h-5 w-5 text-gray-600" />
          ) : (
            <ChevronRightIcon className="h-5 w-5 text-gray-600" />
          )}
        </h4>
        {openSections.sort && (
          <div className="space-y-2 mt-4">
            {[
              { value: "default", label: "Mặc định" },
              { value: "earliest", label: "Giờ đi sớm nhất" },
              { value: "latest", label: "Giờ đi muộn nhất" },
              { value: "priceAsc", label: "Giá tăng dần" },
              { value: "priceDesc", label: "Giá giảm dần" },
            ].map(({ value, label }) => (
              <label
                key={value}
                className="flex items-center space-x-3 cursor-pointer transition hover:bg-gray-100 rounded-lg p-2"
              >
                <input
                  type="radio"
                  name="sort"
                  value={value}
                  checked={filters.sort === value}
                  onChange={(e) => onFilterChange("sort", e.target.value)}
                  className="form-radio h-5 w-5 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-gray-700">{label}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Nhà xe */}
      <div className="mb-6 bg-gray-50 p-4 rounded-lg shadow-md border border-gray-200">
        <h4
          onClick={() => toggleSection("busOperator")}
          className="text-lg font-semibold text-gray-800 cursor-pointer flex justify-between items-center"
        >
          Nhà xe
          {openSections.busOperator ? (
            <ChevronDownIcon className="h-5 w-5 text-gray-600" />
          ) : (
            <ChevronRightIcon className="h-5 w-5 text-gray-600" />
          )}
        </h4>
        {openSections.busOperator && (
          <div className="mt-4">
            {isLoading ? (
              <p className="text-gray-500">Đang tải...</p>
            ) : isError ? (
              <p className="text-red-500">Không thể tải danh sách nhà xe</p>
            ) : (
              <select
                value={selectedCompany || ""}
                className="w-full p-3 border border-gray-300 rounded-lg mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={(e) => {
                  const companyId = e.target.value;
                  setSelectedCompany(companyId);
                  onFilterChange("busOperator", companyId);
                }}
              >
                <option value="">Tất cả</option>
                {companyNames?.data.map((company) => (
                  <option key={company.id} value={company.id}>
                  {company.name}
                  </option>
                ))}
              </select>
            )}
          </div>
        )}
      </div>
      {selectedCompany && (
        <div className="mb-6 bg-gray-50 p-4 rounded-lg shadow-md border border-gray-200">
          <h4
            onClick={() => toggleSection("busType")}
            className="text-lg font-semibold text-gray-800 cursor-pointer flex justify-between items-center"
          >
            Loại xe
            {openSections.busType ? (
              <ChevronDownIcon className="h-5 w-5 text-gray-600" />
            ) : (
              <ChevronRightIcon className="h-5 w-5 text-gray-600" />
            )}
          </h4>
          {openSections.busType && (
            <div className="mt-4">
              {isLoadingBusTypes ? (
                <p className="text-gray-500">Đang tải...</p>
              ) : isErrorBusTypes ? (
                <p className="text-red-500">Không thể tải danh sách loại xe</p>
              ) : (
                <select
                  value={filters.busType || ""}
                  className="w-full p-3 border border-gray-300 rounded-lg mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onChange={(e) => onFilterChange("busType", e.target.value)}
                >
                  <option value="">Tất cả</option>
                  {busTypes?.data.map((busType) => (
                    <option key={busType._id} value={busType._id}>
                      {busType.name}
                    </option>
                  ))}
                </select>
              )}
            </div>
          )}
        </div>
      )}
      {/* Giờ đi */}
      <div className="mb-6 bg-gray-50 p-4 rounded-lg shadow-md border border-gray-200">
        <h4
          onClick={() => toggleSection("departureTimeRange")}
          className="text-lg font-semibold text-gray-800 cursor-pointer flex justify-between items-center"
        >
          Giờ đi
          {openSections.departureTimeRange ? (
            <ChevronDownIcon className="h-5 w-5 text-gray-600" />
          ) : (
            <ChevronRightIcon className="h-5 w-5 text-gray-600" />
          )}
        </h4>
        {openSections.departureTimeRange && (
          <select
            value={filters.departureTimeRange || ""}
            className="w-full p-3 border border-gray-300 rounded-lg mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => onFilterChange("departureTimeRange", e.target.value)}
          >
            <option value="">Tất cả</option>
            <option value="morning">Buổi sáng</option>
            <option value="afternoon">Buổi chiều</option>
          </select>
        )}
      </div>

      {/* Giá vé */}
      <div className="mb-6 bg-gray-50 p-4 rounded-lg shadow-md border border-gray-200">
        <h4
          onClick={() => toggleSection("priceRange")}
          className="text-lg font-semibold text-gray-800 cursor-pointer flex justify-between items-center"
        >
          Giá vé
          {openSections.priceRange ? (
            <ChevronDownIcon className="h-5 w-5 text-gray-600" />
          ) : (
            <ChevronRightIcon className="h-5 w-5 text-gray-600" />
          )}
        </h4>
        {openSections.priceRange && (
          <select
            value={filters.priceRange || ""}
            className="w-full p-3 border border-gray-300 rounded-lg mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => onFilterChange("priceRange", e.target.value)}
          >
            <option value="">Tất cả</option>
            <option value="low">Dưới 200.000</option>
            <option value="medium">200.000 - 500.000</option>
            <option value="high">Trên 500.000</option>
          </select>
        )}
      </div>

      {/* Xóa lọc */}
      <div className="flex justify-end">
        <button
          className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition"
          onClick={() => onFilterChange("clear", "")}
        >
          Xóa lọc
        </button>
      </div>
    </div>
  );
};

export default FilterSidebar;
