import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../../Redux/User/userSlice';
import {
  UserIcon,
  ArrowRightOnRectangleIcon,
  Bars3Icon,
  XMarkIcon,
  PhoneIcon,
  TicketIcon,
  ChatBubbleLeftRightIcon,
  KeyIcon,
  HomeIcon,
} from '@heroicons/react/24/solid';
import NotificationBell from './NotificationBell';

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const userInfo = useSelector((state) => state.user.userInfo);

  const [isOpen, setIsOpen] = useState(false);
  const [isHotlineOpen, setIsHotlineOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);

  const hotlineRef = useRef();
  const userDropdownRef = useRef();

  // Handle logout
  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
    setIsOpen(false);
  };

  // Toggle states
  const toggleMenu = () => setIsOpen(!isOpen);
  const toggleHotline = () => setIsHotlineOpen(!isHotlineOpen);
  const toggleUserDropdown = () => setIsUserDropdownOpen(!isUserDropdownOpen);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (hotlineRef.current && !hotlineRef.current.contains(event.target)) {
        setIsHotlineOpen(false);
      }
      if (userDropdownRef.current && !userDropdownRef.current.contains(event.target)) {
        setIsUserDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const menuItemsByRole = {
    superadmin: [
      { name: 'Quản lý hệ thống', path: '/superadmin/dashboard', icon: UserIcon },
    ],
    companyadmin: [
      { name: 'Quản lý nhà xe', path: '/companyadmin/dashboard', icon: UserIcon },
      { name: 'Quản lý chuyến đi', path: '/companyadmin/trip', icon: TicketIcon },
    ],
    staff: [
      { name: 'Quản lý nhân viên', path: '/staff/dashboard', icon: UserIcon },
      { name: 'Hỗ trợ khách hàng', path: '/staff/support', icon: PhoneIcon },
    ],
    user: [
      { name: 'Thông tin tài khoản', path: '/user/profile', icon: UserIcon },
      { name: 'Đơn hàng của tôi', path: '/user/ticket-buy', icon: TicketIcon },
      { name: 'Ưu đãi', path: '/user/offers', icon: TicketIcon },
      { name: 'Nhận xét chuyến đi', path: '/user/reviews', icon: ChatBubbleLeftRightIcon },
      { name: 'Đổi mật khẩu', path: '/user/change-password', icon: KeyIcon },
    ],
  };

  const commonMenuItems = [
    { name: 'Đơn hàng của tôi', path: '/user/ticket-buy' },
    { name: 'Mở bán vé', path: '/mo-ban-ve-xe' },
  ];

  // Additional menu items for mobile sidebar
  const mobileMenuItems = [
    { name: 'Trang chủ', path: '/', icon: HomeIcon },
    { name: 'Tài khoản của tôi', path: '/user/profile', icon: UserIcon },
    { name: 'Ưu đãi của tôi', path: '/user/offers', icon: TicketIcon },
  ];
  const bottomMenuItems = [
    { name: 'Mở bán tại VeXeOnline', path: '/mo-ban-ve-xe', icon: TicketIcon },
    { name: 'Yêu cầu mở chuyến', path: '/yeu-cau-mo-chuyen-di', icon: HomeIcon },
    { name: 'Về VeXeOnline', path: '/about', icon: HomeIcon },
    { name: 'Giới thiệu', path: '/gioi-thieu', icon: ChatBubbleLeftRightIcon },
  ];

  return (
    <header className="bg-blue-600 shadow-md top-0 w-full z-50">
      <div className="container mx-auto flex items-center justify-between px-4 py-3">
      
        <button onClick={toggleMenu} className="text-white md:hidden" style={{marginRight:"30px"}}>
          {isOpen ? <XMarkIcon className="h-6 w-6" /> : <Bars3Icon className="h-6 w-6" />}
        </button>

        {/* Logo */}
        <div className="flex-grow flex justify-center md:px-8 md:justify-start">
          <Link to="/" className="flex items-center space-x-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="148" height="40" viewBox="0 0 148 40" fill="none">
            <g id="Logo" clip-path="url(#clip0_1108_36141)">
              <g id="Logo_2">
                <path xmlns="http://www.w3.org/2000/svg" id="Vector" d="M27.4086 5.03439C27.3851 5.02842 27.3619 5.02596 27.3526 5C18.7049 5 10.0569 5 1.40918 5C1.22996 5.0614 1.04099 5.09684 0.873331 5.19017C0.428174 5.43789 0.142002 5.79929 0.0328809 6.28911C0.0267383 6.31648 0.0112012 6.34209 0 6.36841C0 14.7778 0 23.1868 0 31.5962C0.105508 31.959 0.256182 32.2955 0.560782 32.5495C0.878751 32.8148 1.24514 32.9534 1.66319 32.9583C2.00573 32.9622 2.34863 32.9643 2.69081 32.9565C2.81692 32.9537 2.85269 32.9892 2.8516 33.1123C2.84546 33.7425 2.85449 34.373 2.84727 35.0032C2.83643 35.9874 3.64616 36.847 4.59465 36.9712C4.6297 36.9758 4.66294 36.9902 4.69727 37C4.85372 37 5.01054 37 5.167 37C5.54169 36.9102 5.90266 36.7937 6.20401 36.5446C6.69975 36.1347 6.96352 35.6186 6.96713 34.9842C6.97075 34.3646 6.97111 33.7449 6.96533 33.1253C6.96424 33.0025 6.9852 32.9558 7.12901 32.9558C11.939 32.96 16.7494 32.96 21.5594 32.9558C21.7003 32.9558 21.7263 32.9976 21.7249 33.1236C21.7184 33.7257 21.7216 34.3277 21.722 34.9298C21.7223 35.9681 22.4114 36.7758 23.4614 36.9705C23.4831 36.9744 23.5022 36.9898 23.5228 37C23.7035 37 23.8842 37 24.0648 37C24.0811 36.9681 24.1132 36.9716 24.1418 36.9663C25.1391 36.7856 25.8411 35.9681 25.8411 34.9881C25.8411 34.3625 25.8447 33.7369 25.8382 33.1116C25.8368 32.9867 25.8762 32.9541 26.0005 32.9569C26.3314 32.9646 26.6628 32.9597 26.9938 32.9593C27.9603 32.9586 28.6952 32.2478 28.6952 31.3053C28.696 23.0858 28.696 14.8662 28.6952 6.64665C28.6949 5.85192 28.2046 5.24105 27.4086 5.03439ZM7.09288 26.0777C11.9325 27.5745 16.7454 27.5654 21.593 26.0756C18.0599 30.8474 10.7701 31.0162 7.09288 26.0777ZM25.9372 22.016C25.9372 22.323 25.8856 22.3738 25.5741 22.3738C21.847 22.3738 18.1203 22.3738 14.3932 22.3738C10.6722 22.3738 6.95123 22.3738 3.23028 22.3738C2.89532 22.3738 2.85449 22.3345 2.85449 22.0146C2.85449 20.4476 2.85775 18.8806 2.8498 17.3139C2.84907 17.1343 2.88123 17.0764 3.08358 17.0581C4.04796 16.9711 4.83457 16.1662 4.90828 15.2209C4.98127 14.2855 4.33449 13.3946 3.39685 13.1462C3.26424 13.1111 3.12585 13.0862 2.98927 13.0796C2.87834 13.0743 2.85016 13.041 2.85196 12.9354C2.85847 12.5322 2.85449 12.1287 2.85449 11.7252C2.85449 10.5031 2.85449 9.28136 2.85449 8.05926C2.85449 7.80067 2.92712 7.73155 3.19848 7.73155C10.6523 7.73155 18.1065 7.73155 25.5604 7.73155C25.8277 7.73155 25.8863 7.78558 25.8863 8.05155C25.8877 9.65925 25.8859 11.2673 25.8892 12.875C25.8895 12.9943 25.8541 13.0297 25.7291 13.0403C24.7228 13.1255 23.903 13.9806 23.8773 14.962C23.8509 15.9718 24.6036 16.8578 25.611 17.003C25.9369 17.05 25.9369 17.05 25.9369 17.3679C25.9376 18.917 25.9376 20.4665 25.9372 22.016Z" fill="#FFD333"/>
                <path id="Vector_2" d="M7.12585 26.0686C11.9741 27.6026 16.7956 27.5932 21.6518 26.0664C18.1124 30.9569 10.8096 31.1299 7.12585 26.0686Z" fill="#2474E5"/>
                <text x="40" y="25" font-family="Arial, sans-serif" font-size="18" font-weight="bold" fill="#FFFFFF">
                  VeXeOnline
                </text>
                <path d="M42 30 C42 35, 90 35, 90 30" stroke="#FFD333" stroke-width="2" fill="none" />
              </g>
            </g>
            <defs>
              <clipPath id="clip0_1108_36141">
                <rect width="148" height="40" fill="white"/>
              </clipPath>
            </defs>
          </svg>
            <span className="hidden w-[250px] md:block text-white text-sm font-medium">
              Cam kết hoàn 150% nếu nhà xe không cung cấp dịch vụ vận chuyển (*)
            </span>
          </Link>
        </div>
        <div className="hidden md:flex items-center justify-center space-x-6 bg-blue-600 px-4 py-2">
        {commonMenuItems.map((item) => (
          <Link key={item.name} to={item.path} className="text-white hover:text-gray-300">
            {item.name}
          </Link>
        ))}
      </div>
        {/* User Icon */}
        <div className="text-white flex items-center space-x-4">
          {/* Hotline (Hidden on mobile) */}
          <div className="hidden md:block relative" ref={hotlineRef}>
            <div
              className="flex items-center px-2 py-1 bg-white text-black rounded-md cursor-pointer"
              onClick={toggleHotline}
            >
              <PhoneIcon className="h-5 w-5 mr-1" />
              <span>Hotline 24/7</span>
            </div>
            {isHotlineOpen && (
              <div className="absolute right-0 mt-2 w-80 bg-white text-black shadow-lg rounded-md p-4 z-50">
                <div className="text-sm font-medium">
                  <div className="py-1">
                    <span style={{ color: 'blue' }}>0387097651 </span> -{' '}
                    <span>Admin (07:00 - 23:00)</span>
                  </div>
                  <div className="py-1">
                    <span style={{ color: 'blue' }}>0387097651 </span> -{' '}
                    <span>Admin (07:00 - 23:00)</span>
                  </div>
                  <div className="py-1">
                    <span style={{ color: 'blue' }}>0387097651 </span> -{' '}
                    <span>Admin (07:00 - 23:00)</span>
                  </div>
                </div>
              </div>
            )}
          </div>
          <NotificationBell />
          {/* User Dropdown */}
          {userInfo ? (
            <div className="relative w-full" ref={userDropdownRef}>
              <button onClick={toggleUserDropdown} className="flex items-center space-x-2">
                <UserIcon className="h-8 w-8" />
                <span className="md:block">{userInfo.fullName}</span>
              </button>
              {isUserDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white text-black shadow-lg rounded-md">
                  {(menuItemsByRole[userInfo.roleId] || []).map((item) => (
                    <Link
                      key={item.name}
                      to={item.path}
                      className="block flex px-4 py-2 text-sm hover:bg-gray-100"
                    >
                      <item.icon className="h-5 w-5 mr-2 text-gray-600" />
                      {item.name}
                    </Link>
                  ))}
                  <button
                    onClick={handleLogout}
                    className="block w-full flex text-left px-4 py-2 text-sm text-red-600 hover:bg-red-100"
                  >
                    <ArrowRightOnRectangleIcon className="h-5 w-5 mr-2" />
                    Đăng xuất
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={() => navigate('/login', { state: { from: location } })}
              className="flex items-center space-x-1"
            >
              <UserIcon className="h-6 w-6" />
              <span className="hidden md:block">Đăng nhập/Đăng ký</span>
            </button>
          )}
        </div>
      </div>


      {/* Mobile Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 transform ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } w-64 bg-white transition-transform duration-300 ease-in-out overflow-y-auto md:hidden z-50`}
      >
        {/* Language Selection */}
        {/* Nếu bạn có phần lựa chọn ngôn ngữ, hãy giữ nguyên, nếu không thì có thể bỏ đi */}

        {/* Main Menu */}
        <nav className="px-2 py-4">
          {/* Top Menu Items */}
          {mobileMenuItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg"
              onClick={() => setIsOpen(false)}
            >
              <item.icon className="h-5 w-5 text-blue-600" />
              <span>{item.name}</span>
            </Link>
          ))}

          {/* Bottom Menu Items */}
          <div className="border-t border-gray-200 mt-4 pt-4">
            {bottomMenuItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg"
                onClick={() => setIsOpen(false)}
              >
                <item.icon className="h-5 w-5 text-blue-600" />
                <span>{item.name}</span>
              </Link>
            ))}
          </div>
        </nav>
      </div>

      {/* Overlay for Mobile Sidebar */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 md:hidden z-40"
          onClick={() => setIsOpen(false)}
        />
      )}
    </header>
  );
};

export default React.memo(Navbar);
