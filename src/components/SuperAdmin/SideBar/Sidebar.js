import React from 'react';
import { FaHome, FaClipboardList, FaUser, FaChartBar, FaCogs, FaFileAlt, FaSignOutAlt } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { logout } from '../../../Redux/User/userSlice';
const Sidebar = ({ setActiveContent }) => {
  const dispatch = useDispatch();
  const handleNavigation = (content) => {
    setActiveContent(content);
  };
  const handleLogout = () => {
    dispatch(logout());
    window.location.href = '/';
  };

  return (
    <div className="w-64 bg-gray-800 text-white h-screen fixed left-0 top-0 shadow-lg">
      <h2 className="text-2xl font-bold p-4 border-b border-gray-700 text-center">Quản lý Hệ thống</h2>
      <ul className="space-y-2 mt-4">
        <li onClick={() => handleNavigation('default')} className="p-4 cursor-pointer hover:bg-gray-700 transition">
          <FaHome className="inline-block mr-2" /> Tổng Quan
        </li>
        <li onClick={() => handleNavigation('companies')} className="p-4 cursor-pointer hover:bg-gray-700 transition">
          <FaClipboardList className="inline-block mr-2" /> Quản lý Công ty
        </li>
        <li onClick={() => handleNavigation('admins')} className="p-4 cursor-pointer hover:bg-gray-700 transition">
          <FaUser className="inline-block mr-2" /> Quản lý Admin
        </li>
        <li onClick={() => handleNavigation('users')} className="p-4 cursor-pointer hover:bg-gray-700 transition">
          <FaUser className="inline-block mr-2" /> Quản lý Người dùng
        </li>
        <li onClick={() => handleNavigation('statistics')} className="p-4 cursor-pointer hover:bg-gray-700 transition">
          <FaChartBar className="inline-block mr-2" /> Thống kê
        </li>
        <li onClick={() => handleNavigation('logs')} className="p-4 cursor-pointer hover:bg-gray-700 transition">
          <FaClipboardList className="inline-block mr-2" /> Nhật ký hoạt động
        </li>
        <li onClick={() => handleNavigation('settings')} className="p-4 cursor-pointer hover:bg-gray-700 transition">
          <FaCogs className="inline-block mr-2" /> Cài đặt
        </li>
        <li onClick={handleLogout} className="p-4 cursor-pointer hover:bg-gray-700 transition">
          <FaSignOutAlt className="inline-block mr-2" /> <span>Đăng xuất</span>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
