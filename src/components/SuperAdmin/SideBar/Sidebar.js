import React, { useState } from 'react';
import { FaHome, FaClipboardList, FaUser, FaChartBar, FaCogs, FaSignOutAlt, FaChevronLeft, FaChevronRight, FaSearchLocation } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { logout } from '../../../Redux/User/userSlice';
import { Tooltip } from 'antd';

const Sidebar = ({ setActiveContent }) => {
  const dispatch = useDispatch();
  const [collapsed, setCollapsed] = useState(false);

  const handleNavigation = (content) => {
    setActiveContent(content);
  };

  const handleLogout = () => {
    dispatch(logout());
    window.location.href = '/';
  };

  return (
    <div
      className={`h-screen fixed top-0 left-0 flex flex-col items-center bg-gray-900 text-white shadow-lg transition-all duration-300 ${
        collapsed ? 'w-16' : 'w-64'
      }`}
    >
      {/* Sidebar Header */}
      <div className="w-full p-4 flex justify-between items-center bg-gray-800">
        {!collapsed && <span className="font-bold text-lg">Quản lý Hệ thống</span>}
        <button
          className="text-xl text-gray-400 hover:text-white focus:outline-none ml-auto"
          onClick={() => setCollapsed(!collapsed)}
        >
          {collapsed ? <FaChevronRight /> : <FaChevronLeft />}
        </button>
      </div>

      {/* Navigation Menu */}
      <ul className="flex-1 w-full mt-4 space-y-1">
        {/* Tổng Quan */}
        <Tooltip title="Tổng Quan" placement="right" visible={collapsed}>
          <li
            onClick={() => handleNavigation('default')}
            className={`flex items-center p-3 hover:bg-gray-800 transition-all duration-300 cursor-pointer ${
              collapsed ? 'justify-center' : 'justify-start'
            }`}
          >
            <FaHome className="text-xl" />
            {/* Ẩn chữ khi Sidebar thu gọn */}
            <span className={`${collapsed ? 'hidden' : 'ml-3'}`}>Tổng Quan</span>
          </li>
        </Tooltip>

        {/* Quản lý Công ty */}
        <Tooltip title="Quản lý Công ty" placement="right" visible={collapsed}>
          <li
            onClick={() => handleNavigation('companies')}
            className={`flex items-center p-3 hover:bg-gray-800 transition-all duration-300 cursor-pointer ${
              collapsed ? 'justify-center' : 'justify-start'
            }`}
          >
            <FaClipboardList className="text-xl" />
            <span className={`${collapsed ? 'hidden' : 'ml-3'}`}>Quản lý Công ty</span>
          </li>
        </Tooltip>
        {/* Quản lý Người dùng */}
        <Tooltip title="Quản lý Người dùng" placement="right" visible={collapsed}>
          <li
            onClick={() => handleNavigation('users')}
            className={`flex items-center p-3 hover:bg-gray-800 transition-all duration-300 cursor-pointer ${
              collapsed ? 'justify-center' : 'justify-start'
            }`}
          >
            <FaUser className="text-xl" />
            <span className={`${collapsed ? 'hidden' : 'ml-3'}`}>Quản lý Người dùng</span>
          </li>
        </Tooltip>

        {/* Thống kê */}
        <Tooltip title="Thống kê" placement="right" visible={collapsed}>
          <li
            onClick={() => handleNavigation('statistics')}
            className={`flex items-center p-3 hover:bg-gray-800 transition-all duration-300 cursor-pointer ${
              collapsed ? 'justify-center' : 'justify-start'
            }`}
          >
            <FaChartBar className="text-xl" />
            <span className={`${collapsed ? 'hidden' : 'ml-3'}`}>Thống kê</span>
          </li>
        </Tooltip>

        {/* Nhật ký hoạt động */}
        <Tooltip title="Địa điểm" placement="right" visible={collapsed}>
          <li
            onClick={() => handleNavigation('Location')}
            className={`flex items-center p-3 hover:bg-gray-800 transition-all duration-300 cursor-pointer ${
              collapsed ? 'justify-center' : 'justify-start'
            }`}
          >
            <FaSearchLocation className="text-xl" />
            <span className={`${collapsed ? 'hidden' : 'ml-3'}`}>Địa điểm cho hệ thống</span>
          </li>
        </Tooltip>
        <Tooltip title="Yêu cầu hợp tác" placement="right" visible={collapsed}>
          <li
            onClick={() => handleNavigation('require')}
            className={`flex items-center p-3 hover:bg-gray-800 transition-all duration-300 cursor-pointer ${
              collapsed ? 'justify-center' : 'justify-start'
            }`}
          >
            <FaCogs className="text-xl" />
            <span className={`${collapsed ? 'hidden' : 'ml-3'}`}>Yêu cầu hợp tác</span>
          </li>
        </Tooltip>
        {/* Cài đặt */}
        <Tooltip title="Cài đặt" placement="right" visible={collapsed}>
          <li
            onClick={() => handleNavigation('settings')}
            className={`flex items-center p-3 hover:bg-gray-800 transition-all duration-300 cursor-pointer ${
              collapsed ? 'justify-center' : 'justify-start'
            }`}
          >
            <FaCogs className="text-xl" />
            <span className={`${collapsed ? 'hidden' : 'ml-3'}`}>Cài đặt</span>
          </li>
        </Tooltip>
        <Tooltip title="Hỗ trợ" placement="right" visible={collapsed}>
          <li
            onClick={() => handleNavigation('faq')}
            className={`flex items-center p-3 hover:bg-gray-800 transition-all duration-300 cursor-pointer ${
              collapsed ? 'justify-center' : 'justify-start'
            }`}
          >
            <FaCogs className="text-xl" />
            <span className={`${collapsed ? 'hidden' : 'ml-3'}`}>Hỗ trợ người dùng</span>
          </li>
        </Tooltip>
      </ul>

      {/* Nút Đăng Xuất */}
      <Tooltip title="Đăng Xuất" placement="right" visible={collapsed}>
        <li
          onClick={handleLogout}
          className={`flex items-center p-4 hover:bg-red-600 transition-all duration-300 cursor-pointer ${
            collapsed ? 'justify-center' : 'justify-start'
          }`}
        >
          <FaSignOutAlt className="text-xl" />
          <span className={`${collapsed ? 'hidden' : 'ml-3'}`}>Đăng Xuất</span>
        </li>
      </Tooltip>
    </div>
  );
};

export default Sidebar;
