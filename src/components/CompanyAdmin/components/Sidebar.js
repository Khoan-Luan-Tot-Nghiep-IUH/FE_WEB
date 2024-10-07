import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { FaTachometerAlt, FaBusAlt, FaRoute, FaDollarSign, FaUser, FaFileInvoice, FaTools, FaSignOutAlt, FaHome } from 'react-icons/fa';
import { logout } from '../../../Redux/User/userSlice'; // Đảm bảo bạn đã import đúng hàm logout

const Sidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  return (
    <aside className="w-64 bg-gray-900 h-screen fixed top-0 left-0 shadow-lg">
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
              <span>Dashboard</span>
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
              <span>Quản lý chuyến đi</span>
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
              <span>Quản lý xe</span>
            </NavLink>
          </li>

          {/* Quản lý tài xế */}
          <li>
            <NavLink
              to="/manage-drivers"
              className={({ isActive }) =>
                isActive
                  ? "bg-gray-700 px-4 py-3 text-white flex items-center rounded-lg shadow-inner"
                  : "px-4 py-3 hover:bg-gray-800 text-white flex items-center rounded-lg transition-all duration-200"
              }
            >
              <FaUser className="mr-3 text-lg" />
              <span>Quản lý tài xế</span>
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
              <span>Doanh thu</span>
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
              <span>Quản lý hóa đơn</span>
            </NavLink>
          </li>

          {/* Divider */}
          <hr className="border-gray-700 my-2" />

          {/* Group Title: Bảo trì */}
          <li className="px-4 py-2 text-xs text-gray-400 uppercase tracking-wide">
            Quản lý dịch vụ
          </li>

          {/* Bảo trì */}
          <li>
            <NavLink
              to="/maintenance"
              className={({ isActive }) =>
                isActive
                  ? "bg-gray-700 px-4 py-3 text-white flex items-center rounded-lg shadow-inner"
                  : "px-4 py-3 hover:bg-gray-800 text-white flex items-center rounded-lg transition-all duration-200"
              }
            >
              <FaTools className="mr-3 text-lg" />
              <span>Bảo trì xe</span>
            </NavLink>
          </li>

          {/* Divider */}
          <hr className="border-gray-700 my-2" />

          {/* Group Title: Other */}
          <li className="px-4 py-2 text-xs text-gray-400 uppercase tracking-wide">
            Khác
          </li>

          {/* Trang chủ */}
          <li>
            <NavLink
              to="/"
              className="px-4 py-3 hover:bg-gray-800 text-white flex items-center rounded-lg transition-all duration-200"
            >
              <FaHome className="mr-3 text-lg" />
              <span>Trang chủ</span>
            </NavLink>
          </li>

          {/* Đăng xuất */}
          <li>
            <button
              onClick={handleLogout}
              className="w-full px-4 py-3 hover:bg-red-700 text-white flex items-center rounded-lg transition-all duration-200"
            >
              <FaSignOutAlt className="mr-3 text-lg" />
              <span>Đăng xuất</span>
            </button>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
