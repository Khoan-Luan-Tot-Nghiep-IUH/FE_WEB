import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {
  FaTachometerAlt, FaBusAlt, FaRoute, FaDollarSign,
  FaUser, FaFileInvoice, FaTools, FaSignOutAlt, FaHome, FaBars
} from 'react-icons/fa';
import { logout } from '../../../Redux/User/userSlice';

const Sidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Nút mở sidebar khi màn hình nhỏ */}
      <button
        className="lg:hidden block p-4 text-white bg-gray-900 fixed top-0 left-0 z-50"
        onClick={toggleSidebar}
      >
        <FaBars />
      </button>

      {/* Sidebar */}
      <aside
        className={`lg:w-64 md:w-48 w-64 bg-gray-900 fixed top-0 left-0 shadow-lg transition-transform duration-300 z-40 overflow-y-auto ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0`}
        style={{ height: '100vh' }}
      >
        <div className="p-4 font-bold text-xl bg-gray-800 text-center text-white border-b border-gray-700">
          Quản Lý Nhà Xe
        </div>
        <nav className="mt-6">
          <ul className="space-y-2">
            <li className="px-4 py-2 text-xs text-gray-400 uppercase tracking-wide">
              Quản lý chung
            </li>
            <li>
              <NavLink
                to="/companyadmin/dashboard"
                className={({ isActive }) =>
                  isActive
                    ? "bg-gray-700 px-4 py-3 text-white flex items-center rounded-lg shadow-inner"
                    : "px-4 py-3 hover:bg-gray-800 text-white flex items-center rounded-lg transition-all duration-200"
                }
              >
                <FaTachometerAlt className="mr-3 text-lg" />
                <span className="hidden md:inline">Dashboard</span> {/* Ẩn văn bản trên màn hình nhỏ */}
              </NavLink>
            </li>

            {/* Quản lý chuyến đi */}
            <li>
              <NavLink
                to="/companyadmin/trip"
                className={({ isActive }) =>
                  isActive
                    ? "bg-gray-700 px-4 py-3 text-white flex items-center rounded-lg shadow-inner"
                    : "px-4 py-3 hover:bg-gray-800 text-white flex items-center rounded-lg transition-all duration-200"
                }
              >
                <FaRoute className="mr-3 text-lg" />
                <span className="hidden md:inline">Quản lý chuyến đi</span> {/* Ẩn văn bản trên màn hình nhỏ */}
              </NavLink>
            </li>

            {/* Divider */}
            <hr className="border-gray-700 my-2" />

            {/* Group Title: Quản lý xe */}
            <li className="px-4 py-2 text-xs text-gray-400 uppercase tracking-wide">
              Quản lý xe cộ
            </li>

            {/* Quản lý xe */}
            <li>
              <NavLink
                to="/companyadmin/manage-buses"
                className={({ isActive }) =>
                  isActive
                    ? "bg-gray-700 px-4 py-3 text-white flex items-center rounded-lg shadow-inner"
                    : "px-4 py-3 hover:bg-gray-800 text-white flex items-center rounded-lg transition-all duration-200"
                }
              >
                <FaBusAlt className="mr-3 text-lg" />
                <span className="hidden md:inline">Quản lý xe</span> {/* Ẩn văn bản trên màn hình nhỏ */}
              </NavLink>
            </li>

            {/* Quản lý tài xế */}
            <li>
              <NavLink
                to="/companyadmin/manage-drivers"
                className={({ isActive }) =>
                  isActive
                    ? "bg-gray-700 px-4 py-3 text-white flex items-center rounded-lg shadow-inner"
                    : "px-4 py-3 hover:bg-gray-800 text-white flex items-center rounded-lg transition-all duration-200"
                }
              >
                <FaUser className="mr-3 text-lg" />
                <span className="hidden md:inline">Quản lý tài xế</span> {/* Ẩn văn bản trên màn hình nhỏ */}
              </NavLink>
            </li>

            {/* Divider */}
            <hr className="border-gray-700 my-2" />

            {/* Group Title: Tài chính */}
            <li className="px-4 py-2 text-xs text-gray-400 uppercase tracking-wide">
              Quản lý tài chính
            </li>

            {/* Doanh thu */}
            <li>
              <NavLink
                to="/revenue"
                className={({ isActive }) =>
                  isActive
                    ? "bg-gray-700 px-4 py-3 text-white flex items-center rounded-lg shadow-inner"
                    : "px-4 py-3 hover:bg-gray-800 text-white flex items-center rounded-lg transition-all duration-200"
                }
              >
                <FaDollarSign className="mr-3 text-lg" />
                <span className="hidden md:inline">Doanh thu</span> {/* Ẩn văn bản trên màn hình nhỏ */}
              </NavLink>
            </li>

            {/* Hóa đơn */}
            <li>
              <NavLink
                to="/invoices"
                className={({ isActive }) =>
                  isActive
                    ? "bg-gray-700 px-4 py-3 text-white flex items-center rounded-lg shadow-inner"
                    : "px-4 py-3 hover:bg-gray-800 text-white flex items-center rounded-lg transition-all duration-200"
                }
              >
                <FaFileInvoice className="mr-3 text-lg" />
                <span className="hidden md:inline">Quản lý hóa đơn</span> {/* Ẩn văn bản trên màn hình nhỏ */}
              </NavLink>
            </li>

            {/* Divider */}
            <hr className="border-gray-700 my-2" />
            <li className="px-4 py-2 text-xs text-gray-400 uppercase tracking-wide">
              Khác
            </li>
            <li>
              <NavLink
                to="/"
                className="px-4 py-3 hover:bg-gray-800 text-white flex items-center rounded-lg transition-all duration-200"
              >
                <FaHome className="mr-3 text-lg" />
                <span className="hidden md:inline">Trang chủ</span>
              </NavLink>
            </li>
            <li>
              <button
                onClick={handleLogout}
                className="w-full px-4 py-3 hover:bg-red-700 text-white flex items-center rounded-lg transition-all duration-200"
              >
                <FaSignOutAlt className="mr-3 text-lg" />
                <span className="hidden md:inline">Đăng xuất</span> 
              </button>
            </li>
          </ul>
        </nav>
      </aside>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-30"
          onClick={toggleSidebar}
        ></div>
      )}
    </>
  );
};

export default Sidebar;
