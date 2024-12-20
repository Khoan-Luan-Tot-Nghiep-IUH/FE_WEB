import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaBars, FaUser, FaTicketAlt, FaShoppingBag, FaTags, FaCreditCard, FaComment, FaSignOutAlt } from 'react-icons/fa';

const Sidebar = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const isActive = (path) => location.pathname.includes(path);

  return (
    <div className="flex flex-col md:flex-row">
      {/* Mobile Hamburger Icon */}
      <div className="md:hidden mb-4 p-4">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-blue-500 focus:outline-none"
          aria-label="Toggle Sidebar"
        >
          <FaBars size={24} />
        </button>
      </div>

      {/* Sidebar Links */}
      <div
        className={`fixed inset-y-0 left-0 z-10 w-64 bg-white shadow-lg md:relative md:z-auto md:translate-x-0 transition-transform transform ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } md:block`}
      >
        <div className="p-6">
          <ul className="space-y-4">
            <li className={`flex items-center py-2 ${isActive('/user/profile') ? 'font-bold text-blue-600' : 'text-gray-600'} hover:text-blue-600 transition`}>
              <FaUser className="mr-3 text-lg" />
              <Link to="/user/profile" className="text-base" onClick={() => setIsOpen(false)}>Thông tin tài khoản</Link>
            </li>
            <li className={`flex items-center py-2 ${isActive('/user/change-password') ? 'font-bold text-blue-600' : 'text-gray-600'} hover:text-blue-600 transition`}>
              <FaTicketAlt className="mr-3 text-lg" />
              <Link to="/user/change-password" className="text-base" onClick={() => setIsOpen(false)}>Đổi mật khẩu</Link>
            </li>
            <li className={`flex items-center py-2 ${isActive('/user/ticket-buy') ? 'font-bold text-blue-600' : 'text-gray-600'} hover:text-blue-600 transition`}>
              <FaShoppingBag className="mr-3 text-lg" />
              <Link to="/user/ticket-buy" className="text-base" onClick={() => setIsOpen(false)}>Đơn hàng của tôi</Link>
            </li>
            <li className={`flex items-center py-2 ${isActive('/user/offers') ? 'font-bold text-blue-600' : 'text-gray-600'} hover:text-blue-600 transition`}>
              <FaTags className="mr-3 text-lg" />
              <Link to="/user/offers" className="text-base" onClick={() => setIsOpen(false)}>Ưu đãi</Link>
            </li>
            <li className={`flex items-center py-2 ${isActive('/user/requirements') ? 'font-bold text-blue-600' : 'text-gray-600'} hover:text-blue-600 transition`}>
              <FaCreditCard className="mr-3 text-lg" />
              <Link to="/user/requirements" className="text-base" onClick={() => setIsOpen(false)}>Yêu cầu của bạn</Link>
            </li>
            <li className={`flex items-center py-2 ${isActive('/reviews') ? 'font-bold text-blue-600' : 'text-gray-600'} hover:text-blue-600 transition`}>
              <FaComment className="mr-3 text-lg" />
              <Link to="/reviews" className="text-base" onClick={() => setIsOpen(false)}>Nhận xét chuyến đi</Link>
            </li>
            <li className={`flex items-center py-2 ${isActive('/logout') ? 'font-bold text-blue-600' : 'text-gray-600'} hover:text-blue-600 transition`}>
              <FaSignOutAlt className="mr-3 text-lg" />
              <Link to="/logout" className="text-base" onClick={() => setIsOpen(false)}>Đăng xuất</Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black opacity-50 md:hidden z-0"
          aria-hidden="true"
        />
      )}
    </div>
  );
};

export default Sidebar;
