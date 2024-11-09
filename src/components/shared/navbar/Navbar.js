import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../../Redux/User/userSlice';
import { Menu } from '@headlessui/react';
import { UserIcon, TicketIcon, ArrowRightOnRectangleIcon } from '@heroicons/react/24/solid';
import logo from '../../../assets/logo.JPG';

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const userInfo = useSelector((state) => state.user.userInfo);


  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  const handleLoginClick = (e) => {
    e.preventDefault();
    navigate('/login', { state: { from: location } });
  };

  return (
    <header className="bg-gradient-to-r from-blue-400 via-purple-500 to-blue-500 shadow-lg relative z-20">
      <div className="container mx-auto flex justify-between items-center p-4">
        <div className="flex items-center">
          <button 
            onClick={() => setIsOpen(true)} 
            className="text-white md:hidden hover:text-gray-300 focus:outline-none transition duration-300"
          >

            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
            </svg>
          </button>
          {/* Language Selector and Logo visible only on desktop */}
          <select className="mr-4 p-2 border rounded text-black font-serif italic bg-green-300 border-green-200 focus:outline-none hidden md:block">
            <option value="vi">VI</option>
            <option value="en">EN</option>
          </select>
        </div>
        <div className="flex justify-center flex-grow md:flex-grow-0">
          <Link to="/">
            <img src={logo} alt="Logo" className="w-100 h-20 object-cover sm:w-60 md:w-60 lg:w-60 rounded-lg shadow-lg brightness-110 contrast-110 transform hover:scale-110 transition duration-300 ease-in-out"/>
          </Link>
        </div>
        {/* User Icon for Desktop and Mobile */}
        <div className="flex items-center">
          {userInfo ? (
            <Menu as="div" className="relative">
              <Menu.Button className="flex items-center space-x-2 text-white">
                <UserIcon className="h-8 w-8" />
                <span className="md:inline">{userInfo.fullName}</span>
              </Menu.Button>
              <Menu.Items className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded-md shadow-lg transition-all duration-300 ease-in-out transform scale-95 origin-top-right z-30">
                <Menu.Item>
                  {({ active }) => (
                    <Link
                      to="/user/profile"
                      className={`${
                        active ? 'bg-gray-100' : ''
                      } flex items-center px-4 py-2 text-sm text-gray-700`}
                    >
                      <UserIcon className="h-5 w-5 mr-2 text-gray-500" />
                      Thông tin cá nhân
                    </Link>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <Link
                      to="/user/ticket-buy"
                      className={`${
                        active ? 'bg-gray-100' : ''
                      } flex items-center px-4 py-2 text-sm text-gray-700`}
                    >
                      <TicketIcon className="h-5 w-5 mr-2 text-gray-500" />
                      Lịch sử đặt vé
                    </Link>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <button
                      onClick={handleLogout}
                      className={`${
                        active ? 'bg-red-100' : ''
                      } flex items-center w-full text-left px-4 py-2 text-sm text-red-600`}
                    >
                      <ArrowRightOnRectangleIcon className="h-5 w-5 mr-2 text-red-500" />
                      Đăng xuất
                    </button>
                  )}
                </Menu.Item>
              </Menu.Items>
            </Menu>
          ) : (
            <a
              href="/login"
              onClick={handleLoginClick}
              className="text-white hover:text-gray-300 transition duration-300"
            >
              Đăng nhập/Đăng ký
            </a>
          )}
        </div>
      </div>

      {/* Drawer Sidebar for Mobile */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex">
          {/* Background overlay */}
          <div
            className="fixed inset-0 bg-black opacity-50"
            onClick={() => setIsOpen(false)}
          ></div>
          
          {/* Drawer Panel */}
          <div className="relative bg-white w-64 h-full shadow-lg transform transition-transform duration-300 ease-in-out">
            <div className="flex items-center justify-between p-4 border-b border-gray-300">
              <h2 className="text-xl font-bold text-gray-800">Menu</h2>
              <button onClick={() => setIsOpen(false)} className="text-gray-800 hover:text-gray-500 focus:outline-none transition duration-300">
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
            </div>
            <nav className="flex flex-col p-4 space-y-2">
              <Link to="/" className="text-gray-800 hover:bg-gray-100 rounded px-4 py-2 transition duration-300" onClick={() => setIsOpen(false)}>Trang chủ</Link>
              <Link to="/lich-trinh" className="text-gray-800 hover:bg-gray-100 rounded px-4 py-2 transition duration-300" onClick={() => setIsOpen(false)}>Lịch trình</Link>
              <Link to="/tra-cuu-ve" className="text-gray-800 hover:bg-gray-100 rounded px-4 py-2 transition duration-300" onClick={() => setIsOpen(false)}>Tra cứu vé</Link>
              <Link to="/tin-tuc" className="text-gray-800 hover:bg-gray-100 rounded px-4 py-2 transition duration-300" onClick={() => setIsOpen(false)}>Tin tức</Link>
              <Link to="/hoa-don" className="text-gray-800 hover:bg-gray-100 rounded px-4 py-2 transition duration-300" onClick={() => setIsOpen(false)}>Hóa đơn</Link>
              <Link to="/lien-he" className="text-gray-800 hover:bg-gray-100 rounded px-4 py-2 transition duration-300" onClick={() => setIsOpen(false)}>Liên hệ</Link>
              <Link to="/ve-chung-toi" className="text-gray-800 hover:bg-gray-100 rounded px-4 py-2 transition duration-300" onClick={() => setIsOpen(false)}>Về chúng tôi</Link>
              
              {/* Links based on role */}
              {userInfo && userInfo.roleId === 'superadmin' && (
                <>
                  <Link to="/superadmin/dashboard" className="text-gray-800 hover:bg-gray-100 rounded px-4 py-2 transition duration-300" onClick={() => setIsOpen(false)}>Quản lý hệ thống</Link>
                  <Link to="/company/dashboard" className="text-gray-800 hover:bg-gray-100 rounded px-4 py-2 transition duration-300" onClick={() => setIsOpen(false)}>Quản lý nhà xe</Link>
                </>
              )}
              {userInfo && userInfo.roleId === 'companyadmin' && (
                <>
                  <Link to="/companyadmin/dashboard" className="text-gray-800 hover:bg-gray-100 rounded px-4 py-2 transition duration-300" onClick={() => setIsOpen(false)}>Quản lý nhà xe</Link>
                  <Link to="/companyadmin/trip" className="text-gray-800 hover:bg-gray-100 rounded px-4 py-2 transition duration-300" onClick={() => setIsOpen(false)}>Quản lý chuyến đi</Link>
                </>
              )}
              {userInfo && userInfo.roleId === 'staff' && (
                <>
                  <Link to="/staff/dashboard" className="text-gray-800 hover:bg-gray-100 rounded px-4 py-2 transition duration-300" onClick={() => setIsOpen(false)}>Trang quản lý nhân viên</Link>
                  <Link to="/staff/support" className="text-gray-800 hover:bg-gray-100 rounded px-4 py-2 transition duration-300" onClick={() => setIsOpen(false)}>Hỗ trợ khách hàng</Link>
                </>
              )}
              {userInfo && userInfo.roleId === 'user' && (
                <>
                  <Link to="/user/profile" className="text-gray-800 hover:bg-gray-100 rounded px-4 py-2 transition duration-300" onClick={() => setIsOpen(false)}>Thông tin cá nhân</Link>
                  <Link to="/user/ticket-buy" className="text-gray-800 hover:bg-gray-100 rounded px-4 py-2 transition duration-300" onClick={() => setIsOpen(false)}>Lịch sử đặt vé</Link>
                </>
              )}
            </nav>
          </div>
        </div>
      )}

      {/* Desktop Menu */}
      <nav className="hidden md:flex bg-gradient-to-br from-gray-900 to-gray-700 py-2">
        <div className="container mx-auto flex justify-around">
          <Link to="/" className="text-white hover:text-gray-300 transition duration-300">Trang chủ</Link>
          <Link to="/lich-trinh" className="text-white hover:text-gray-300 transition duration-300">Lịch trình</Link>
          <Link to="/search-page" className="text-white hover:text-gray-300 transition duration-300">Tra cứu vé</Link>
          <Link to="/tin-tuc" className="text-white hover:text-gray-300 transition duration-300">Tin tức</Link>
          <Link to="/user/ticket-buy" className="text-white hover:text-gray-300 transition duration-300">Hóa đơn</Link>
          <Link to="/lien-he" className="text-white hover:text-gray-300 transition duration-300">Liên hệ</Link>
          <Link to="/ve-chung-toi" className="text-white hover:text-gray-300 transition duration-300">Về chúng tôi</Link>

          {/* Links by role */}
          {userInfo && userInfo.roleId === 'superadmin' && (
            <>
              <Link to="/superadmin/dashboard" className="text-white hover:text-gray-300 transition duration-300">Quản lý hệ thống</Link>
              <Link to="/company/dashboard" className="text-white hover:text-gray-300 transition duration-300">Quản lý nhà xe</Link>
            </>
          )}
          {userInfo && userInfo.roleId === 'companyadmin' && (
            <>
              <Link to="/companyadmin/dashboard" className="text-white hover:text-gray-300 transition duration-300">Quản lý nhà xe</Link>
              <Link to="/companyadmin/trip" className="text-white hover:text-gray-300 transition duration-300">Quản lý chuyến đi</Link>
            </>
          )}
          {userInfo && userInfo.roleId === 'staff' && (
            <>
              <Link to="/staff/dashboard" className="text-white hover:text-gray-300 transition duration-300">Trang quản lý nhân viên</Link>
              <Link to="/staff/support" className="text-white hover:text-gray-300 transition duration-300">Hỗ trợ khách hàng</Link>
            </>
          )}
          {userInfo && userInfo.roleId === 'user' && (
            <>
              <Link to="/user/profile" className="text-white hover:text-gray-300 transition duration-300">Thông tin cá nhân</Link>
              <Link to="/user/ticket-buy" className="text-white hover:text-gray-300 transition duration-300">Lịch sử đặt vé</Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default React.memo(Navbar);
