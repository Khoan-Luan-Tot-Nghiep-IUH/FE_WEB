import React from 'react';
import { useSelector } from 'react-redux'; // Để lấy dữ liệu từ Redux
import { FaSearch, FaBell, FaComments, FaCog } from 'react-icons/fa';

const Topbar = () => {

  const userInfo = useSelector((state) => state.user.userInfo);

  return (
    <nav className="flex justify-between items-center p-4 bg-white shadow-md fixed top-0 left-64 right-0 z-10">
      <div className="flex items-center bg-gray-100 p-2 rounded-lg w-1/3">
        <FaSearch className="text-gray-400" />
        <input
          type="text"
          placeholder="Type to search..."
          className="ml-2 bg-transparent outline-none w-full"
        />
      </div>
      <div className="flex items-center space-x-6">
        <div className="relative bg-gray-100 p-2 rounded-full">
          <FaCog className="text-gray-400" />
        </div>
        <div className="relative bg-gray-100 p-2 rounded-full">
          <FaBell className="text-gray-400" />
          <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-3 h-3 text-xs"></span>
        </div>
        <div className="relative bg-gray-100 p-2 rounded-full">
          <FaComments className="text-gray-400" />
          <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-3 h-3 text-xs"></span>
        </div>

        <div className="flex items-center space-x-2">
          <img
            src={`https://ui-avatars.com/api/?name=${userInfo.fullName}`}
            alt={userInfo.fullName}
            className="w-10 h-10 rounded-full"
          />
          <div className="text-right">
            <h3 className="font-semibold">{userInfo.fullName}</h3> {/* Tên đầy đủ */}
            <p className="text-sm text-gray-500">{userInfo.roleId === 'companyadmin' ? 'Admin' : 'Staff'}</p> {/* Vai trò */}
          </div>
          <i className="fas fa-chevron-down text-gray-500"></i>
        </div>
      </div>
    </nav>
  );
};

export default Topbar;
