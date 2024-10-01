import React from 'react';

const CompanyForm = ({
  companyName,
  setCompanyName,
  address,
  setAddress,
  contactInfo,
  setContactInfo,
  phoneNumber,
  setPhoneNumber,
  email,
  setEmail,
  isActive,
  setIsActive,
  handleCreateOrUpdateCompany,
  creating,
  selectedCompanyId,
}) => {
  return (
    <div className="w-full flex justify-center items-start p-4">
      <form
        onSubmit={handleCreateOrUpdateCompany}
        className="bg-white shadow-md rounded-lg p-4 space-y-4 max-w-sm w-full border border-gray-200"
      >
        <h2 className="text-xl font-semibold text-center text-blue-600">
          {selectedCompanyId ? 'Cập nhật công ty' : 'Tạo công ty mới'}
        </h2>

        {/* Company Name */}
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700">Tên công ty</label>
          <input
            type="text"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            required
            className="p-2 text-sm border border-gray-300 rounded focus:ring focus:ring-blue-500"
            placeholder="Nhập tên công ty"
          />
        </div>

        {/* Address */}
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700">Địa chỉ</label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
            className="p-2 text-sm border border-gray-300 rounded focus:ring focus:ring-blue-500"
            placeholder="Nhập địa chỉ"
          />
        </div>

        {/* Contact Info */}
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700">Thông tin liên hệ</label>
          <input
            type="text"
            value={contactInfo}
            onChange={(e) => setContactInfo(e.target.value)}
            required
            className="p-2 text-sm border border-gray-300 rounded focus:ring focus:ring-blue-500"
            placeholder="Nhập thông tin liên hệ"
          />
        </div>

        {/* Phone Number */}
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700">Số điện thoại</label>
          <input
            type="text"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
            className="p-2 text-sm border border-gray-300 rounded focus:ring focus:ring-blue-500"
            placeholder="Nhập số điện thoại"
          />
        </div>

        {/* Email */}
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="p-2 text-sm border border-gray-300 rounded focus:ring focus:ring-blue-500"
            placeholder="Nhập email"
          />
        </div>

        {/* Active Status Toggle */}
        <div className="flex items-center space-x-2">
          <label className="text-sm font-medium text-gray-700">Kích hoạt</label>
          <input
            type="checkbox"
            checked={isActive}
            onChange={(e) => setIsActive(e.target.checked)}
            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring focus:ring-blue-500"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className={`w-full py-2 text-white font-medium rounded-lg shadow ${
            creating
              ? 'bg-blue-300 cursor-not-allowed'
              : 'bg-gradient-to-r from-blue-500 to-blue-600 hover:bg-blue-700'
          } focus:outline-none focus:ring-2 focus:ring-blue-500`}
          disabled={creating}
        >
          {creating ? 'Đang lưu...' : selectedCompanyId ? 'Cập nhật' : 'Lưu'}
        </button>
      </form>
    </div>
  );
};

export default CompanyForm;
