import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaTachometerAlt, FaBusAlt, FaRoute, FaDollarSign, FaUser, FaFileInvoice, FaTools } from 'react-icons/fa';

const Sidebar = () => {
  return (
    <aside className="w-64 bg-gray-900 h-screen fixed top-0 left-0">
      {/* Sidebar header */}
      <div className="p-4 font-bold text-xl bg-gray-800 text-center text-white">
        Quản Lý Nhà Xe
      </div>

      {/* Navigation Menu */}
      <nav className="mt-6">
        <ul className="space-y-2">
          {/* Dashboard */}
          <li>
            <NavLink 
              to="/companyadmin/dashboard"
              className={({ isActive }) =>
                isActive
                  ? "bg-gray-800 px-4 py-3 text-white flex items-center"
                  : "px-4 py-3 hover:bg-gray-800 text-white flex items-center"
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
                  ? "bg-gray-800 px-4 py-3 text-white flex items-center"
                  : "px-4 py-3 hover:bg-gray-800 text-white flex items-center"
              }
            >
              <FaRoute className="mr-3 text-lg" />
              <span>Quản lý chuyến đi</span>
            </NavLink>
          </li>

          {/* Quản lý xe */}
          <li>
            <NavLink 
              to="/manage-buses"
              className={({ isActive }) =>
                isActive
                  ? "bg-gray-800 px-4 py-3 text-white flex items-center"
                  : "px-4 py-3 hover:bg-gray-800 text-white flex items-center"
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
                  ? "bg-gray-800 px-4 py-3 text-white flex items-center"
                  : "px-4 py-3 hover:bg-gray-800 text-white flex items-center"
              }
            >
              <FaUser className="mr-3 text-lg" />
              <span>Quản lý tài xế</span>
            </NavLink>
          </li>

          {/* Doanh thu */}
          <li>
            <NavLink 
              to="/revenue"
              className={({ isActive }) =>
                isActive
                  ? "bg-gray-800 px-4 py-3 text-white flex items-center"
                  : "px-4 py-3 hover:bg-gray-800 text-white flex items-center"
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
                  ? "bg-gray-800 px-4 py-3 text-white flex items-center"
                  : "px-4 py-3 hover:bg-gray-800 text-white flex items-center"
              }
            >
              <FaFileInvoice className="mr-3 text-lg" />
              <span>Quản lý hóa đơn</span>
            </NavLink>
          </li>

          {/* Bảo trì */}
          <li>
            <NavLink 
              to="/maintenance"
              className={({ isActive }) =>
                isActive
                  ? "bg-gray-800 px-4 py-3 text-white flex items-center"
                  : "px-4 py-3 hover:bg-gray-800 text-white flex items-center"
              }
            >
              <FaTools className="mr-3 text-lg" />
              <span>Bảo trì xe</span>
            </NavLink>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
