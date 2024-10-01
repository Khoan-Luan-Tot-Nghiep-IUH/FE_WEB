import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../../Redux/User/userSlice';
import { Menu } from '@headlessui/react';
import { UserIcon, TicketIcon, ArrowRightOnRectangleIcon } from '@heroicons/react/24/solid'; // Import Heroicons
import logo from '../../../assets/logo.JPG';

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const userInfo = useSelector((state) => state.user.userInfo);

  useEffect(() => {
    console.log('User info has changed:', userInfo);
  }, [userInfo]);

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
          <select className="mr-4 p-2 border rounded text-white bg-transparent border-white focus:outline-none">
            <option value="vi">VI</option>
            <option value="en">EN</option>
          </select>
          <button className="hidden md:block text-white bg-green-400 hover:bg-green-500 rounded px-4 py-2 transition duration-300">
            Tải ứng dụng
          </button>
        </div>
        {/* Logo */}
        <div>
          <Link to="/">
            <img src={logo} alt="Logo" className="w-24 h-20 sm:w-32 md:w-40 lg:w-48 rounded-lg shadow-lg brightness-110 contrast-110 transform hover:scale-110 transition duration-300 ease-in-out"/>
          </Link>
        </div>

        <div className="hidden md:flex items-center space-x-4">
          {userInfo ? (
            <>
              <Menu as="div" className="relative">
                <Menu.Button className="flex items-center space-x-2 text-white">
                  <UserIcon className="h-8 w-8" />
                  <div>
                    <span>{userInfo.fullName}</span>
                  </div>
                </Menu.Button>
                <Menu.Items className="absolute right-0 mt-2 w-56 bg-white border border-gray-300 rounded-md shadow-lg transition-all duration-300 ease-in-out transform scale-95 origin-top-right z-30">
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
            </>
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

        {/* Nút hamburger trên mobile */}
        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            type="button"
            className="text-white hover:text-gray-300 focus:outline-none focus:text-gray-300 transition duration-300"
          >
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu với hiệu ứng transition */}
      <nav className={`md:hidden bg-gradient-to-br from-gray-900 to-gray-700 py-2 overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? 'max-h-screen' : 'max-h-0'}`}>
        <div className="flex flex-col items-center">
          <Link to="/" className="text-white hover:text-gray-300 py-2 transition duration-300">Trang chủ</Link>
          <Link to="/lich-trinh" className="text-white hover:text-gray-300 py-2 transition duration-300">Lịch trình</Link>
          <Link to="/tra-cuu-ve" className="text-white hover:text-gray-300 py-2 transition duration-300">Tra cứu vé</Link>
          <Link to="/tin-tuc" className="text-white hover:text-gray-300 py-2 transition duration-300">Tin tức</Link>
          <Link to="/hoa-don" className="text-white hover:text-gray-300 py-2 transition duration-300">Hóa đơn</Link>
          <Link to="/lien-he" className="text-white hover:text-gray-300 py-2 transition duration-300">Liên hệ</Link>
          <Link to="/ve-chung-toi" className="text-white hover:text-gray-300 py-2 transition duration-300">Về chúng tôi</Link>

          {/* Links theo role */}
          {userInfo && userInfo.roleId === 'superadmin' && (
            <>
              <Link to="/superadmin/dashboard" className="text-white hover:text-gray-300 py-2 transition duration-300">Quản lý hệ thống</Link>
              <Link to="/company/dashboard" className="text-white hover:text-gray-300 py-2 transition duration-300">Quản lý nhà xe</Link>
            </>
          )}
          {userInfo && userInfo.roleId === 'companyadmin' && (
            <>
              <Link to="/company/dashboard" className="text-white hover:text-gray-300 py-2 transition duration-300">Quản lý nhà xe</Link>
              <Link to="/company/manage-trips" className="text-white hover:text-gray-300 py-2 transition duration-300">Quản lý chuyến đi</Link>
            </>
          )}
          {userInfo && userInfo.roleId === 'staff' && (
            <>
              <Link to="/staff/dashboard" className="text-white hover:text-gray-300 py-2 transition duration-300">Trang quản lý nhân viên</Link>
              <Link to="/staff/support" className="text-white hover:text-gray-300 py-2 transition duration-300">Hỗ trợ khách hàng</Link>
            </>
          )}
          {userInfo && userInfo.roleId === 'user' && (
            <>
              <Link to="/user/profile" className="text-white hover:text-gray-300 py-2 transition duration-300">Thông tin cá nhân</Link>
              <Link to="/user/ticket-buy" className="text-white hover:text-gray-300 py-2 transition duration-300">Lịch sử đặt vé</Link>
            </>
          )}
        </div>
      </nav>

      {/* Desktop menu */}
      <nav className="hidden md:flex bg-gradient-to-br from-gray-900 to-gray-700 py-2">
        <div className="container mx-auto flex justify-around">
          <Link to="/" className="text-white hover:text-gray-300 transition duration-300">Trang chủ</Link>
          <Link to="/lich-trinh" className="text-white hover:text-gray-300 transition duration-300">Lịch trình</Link>
          <Link to="/tra-cuu-ve" className="text-white hover:text-gray-300 transition duration-300">Tra cứu vé</Link>
          <Link to="/tin-tuc" className="text-white hover:text-gray-300 transition duration-300">Tin tức</Link>
          <Link to="/hoa-don" className="text-white hover:text-gray-300 transition duration-300">Hóa đơn</Link>
          <Link to="/lien-he" className="text-white hover:text-gray-300 transition duration-300">Liên hệ</Link>
          <Link to="/ve-chung-toi" className="text-white hover:text-gray-300 transition duration-300">Về chúng tôi</Link>

          {/* Links theo role */}
          {userInfo && userInfo.roleId === 'superadmin' && (
            <>
              <Link to="/superadmin/dashboard" className="text-white hover:text-gray-300 transition duration-300">Quản lý hệ thống</Link>
              <Link to="/company/dashboard" className="text-white hover:text-gray-300 transition duration-300">Quản lý nhà xe</Link>
            </>
          )}
          {userInfo && userInfo.roleId === 'companyadmin' && (
            <>
              <Link to="/company/dashboard" className="text-white hover:text-gray-300 transition duration-300">Quản lý nhà xe</Link>
              <Link to="/company/manage-trips" className="text-white hover:text-gray-300 transition duration-300">Quản lý chuyến đi</Link>
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
