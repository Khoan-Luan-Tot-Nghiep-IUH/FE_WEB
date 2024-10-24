import React from 'react';
import { useSelector } from 'react-redux'; 
import { FaSearch, FaBell, FaComments, FaCog, FaBars } from 'react-icons/fa';

const Topbar = ({ toggleSidebar }) => {
  const userInfo = useSelector((state) => state.user.userInfo); // Lấy thông tin người dùng từ Redux

  return (
    <nav className="flex justify-between items-center p-4 bg-white shadow-md fixed top-0 left-0 right-0 z-10 lg:left-64">
      {/* Nút mở Sidebar trên màn hình nhỏ */}
      <button className="lg:hidden block p-2 text-gray-600" onClick={toggleSidebar}>
        <FaBars />
      </button>

      {/* Thanh tìm kiếm */}
      <div className="flex items-center bg-gray-100 p-2 rounded-lg w-full md:w-1/3">
        <FaSearch className="text-gray-400" />
        <input
          type="text"
          placeholder="Type to search..."
          className="ml-2 bg-transparent outline-none w-full"
        />
      </div>

      {/* Thông tin người dùng và biểu tượng */}
      <div className="flex items-center space-x-6">
        {/* Biểu tượng cài đặt */}
        <div className="relative bg-gray-100 p-2 rounded-full hover:bg-gray-200">
          <FaCog className="text-gray-400" />
        </div>

        {/* Biểu tượng thông báo */}
        <div className="relative bg-gray-100 p-2 rounded-full hover:bg-gray-200">
          <FaBell className="text-gray-400" />
          <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-3 h-3"></span>
        </div>

        {/* Thông tin người dùng */}
        <div className="flex items-center space-x-2">
          {/* Ảnh đại diện */}
          <img
            src={`https://ui-avatars.com/api/?name=${userInfo.fullName}`}
            alt={userInfo.fullName}
            className="w-10 h-10 rounded-full"
          />
          
          {/* Tên và vai trò người dùng */}
          <div className="text-right hidden sm:block">
            <h3 className="font-semibold">{userInfo.fullName}</h3>
            <p className="text-sm text-gray-500">
              {userInfo.roleId === 'companyadmin' ? 'CompanyAdmin' : 'Staff'}
            </p>
          </div>

          {/* Mũi tên xuống */}
          <i className="fas fa-chevron-down text-gray-500"></i>
        </div>
      </div>
    </nav>
  );
};

export default Topbar;
