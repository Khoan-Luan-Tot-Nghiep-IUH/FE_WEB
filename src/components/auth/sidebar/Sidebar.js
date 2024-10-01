import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaBars, FaUser, FaTicketAlt, FaShoppingBag, FaTags, FaCreditCard, FaComment, FaSignOutAlt } from 'react-icons/fa';

const Sidebar = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const isActive = (path) => location.pathname.includes(path);

  return (
    <div>
      {/* Mobile Hamburger Icon */}
      <div className="md:hidden mb-4">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-blue-500 focus:outline-none"
          aria-label="Toggle Sidebar"
        >
          <FaBars size={24} />
        </button>
      </div>

      {/* Sidebar Links */}
      <div className={`md:block ${isOpen ? 'block' : 'hidden'} w-full md:w-64 bg-white shadow-md rounded-lg p-6 transition-all duration-300 ease-in-out`}>
        <ul className="space-y-4">
          <li className={`flex items-center py-2 ${isActive('/user/profile') ? 'font-bold text-blue-600' : 'text-gray-600'} hover:text-blue-600 transition`}>
            <FaUser className="mr-3 text-lg" />
            <Link to="/user/profile" className="text-base" onClick={() => setIsOpen(false)}>Thông tin tài khoản</Link>
          </li>
          <li className={`flex items-center py-2 ${isActive('/membership') ? 'font-bold text-blue-600' : 'text-gray-600'} hover:text-blue-600 transition`}>
            <FaTicketAlt className="mr-3 text-lg" />
            <Link to="/membership" className="text-base" onClick={() => setIsOpen(false)}>Thành viên Thường</Link>
          </li>
          <li className={`flex items-center py-2 ${isActive('/user/ticket-buy') ? 'font-bold text-blue-600' : 'text-gray-600'} hover:text-blue-600 transition`}>
            <FaShoppingBag className="mr-3 text-lg" />
            <Link to="/user/ticket-buy" className="text-base" onClick={() => setIsOpen(false)}>Đơn hàng của tôi</Link>
          </li>
          <li className={`flex items-center py-2 ${isActive('/user/offers') ? 'font-bold text-blue-600' : 'text-gray-600'} hover:text-blue-600 transition`}>
            <FaTags className="mr-3 text-lg" />
            <Link to="/user/offers" className="text-base" onClick={() => setIsOpen(false)}>Ưu đãi</Link>
          </li>
          <li className={`flex items-center py-2 ${isActive('/cards') ? 'font-bold text-blue-600' : 'text-gray-600'} hover:text-blue-600 transition`}>
            <FaCreditCard className="mr-3 text-lg" />
            <Link to="/cards" className="text-base" onClick={() => setIsOpen(false)}>Quản lý thẻ</Link>
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
  );
};

export default Sidebar;
