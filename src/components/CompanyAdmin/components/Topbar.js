import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { FaSearch, FaBell, FaCog, FaBars, FaCircle, FaCheck } from 'react-icons/fa';
import { useGetNotificationsQuery } from '../../../Redux/Company/companyApiSlice';
import { Link } from 'react-router-dom';

const Topbar = ({ toggleSidebar }) => {
  const userInfo = useSelector((state) => state.user.userInfo);
  const [isNotificationsOpen, setNotificationsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const { data, isLoading, isError } = useGetNotificationsQuery({ page: 1, limit: 5 });

  const toggleNotifications = () => {
    setNotificationsOpen((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setNotificationsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <nav className="flex justify-between items-center p-4 bg-white shadow-md fixed top-0 left-0 right-0 z-10 lg:left-64">
      <button className="lg:hidden block p-2 text-gray-600" onClick={toggleSidebar}>
        <FaBars />
      </button>
      <div className="flex items-center bg-gray-100 p-2 rounded-lg w-full md:w-1/3">
        <FaSearch className="text-gray-400" />
        <input
          type="text"
          placeholder="Tìm kiếm..."
          className="ml-2 bg-transparent outline-none w-full"
        />
      </div>
      <div className="flex items-center space-x-6 relative">
        <button className="relative bg-gray-100 p-2 rounded-full hover:bg-gray-200">
          <FaCog className="text-gray-400" />
        </button>
        <div className="relative">
          <button
            className="relative bg-gray-100 p-2 rounded-full hover:bg-gray-200"
            onClick={toggleNotifications}
          >
            <FaBell className="text-gray-400" />
            {data?.pagination?.totalNotifications > 0 && (
              <span className="absolute top-0 right-0 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                {data.pagination.totalNotifications}
              </span>
            )}
          </button>

          {isNotificationsOpen && (
            <div
              ref={dropdownRef} // Thêm tham chiếu vào dropdown
              className="absolute right-0 mt-2 w-96 bg-white shadow-lg rounded-lg border border-gray-200 z-20"
            >
              {/* Header */}
              <div className="flex justify-between items-center px-4 py-3 bg-gray-100 border-b">
                <div className="flex space-x-6">
                  <button className="font-semibold text-gray-800 border-b-2 border-blue-500 pb-1">
                    Tất cả
                  </button>
                  <button className="text-gray-600 hover:text-gray-800">Chưa đọc</button>
                </div>
                <button className="text-sm text-blue-500 hover:underline">Đánh dấu tất cả</button>
              </div>

              {/* Notification list */}
              <ul className="max-h-96 overflow-y-auto divide-y divide-gray-200">
                {isLoading ? (
                  <li className="px-4 py-3 text-center text-gray-500">Đang tải...</li>
                ) : isError ? (
                  <li className="px-4 py-3 text-center text-red-500">Lỗi khi tải thông báo.</li>
                ) : data?.data.length === 0 ? (
                  <li className="px-4 py-3 text-center text-gray-500">Không có thông báo nào.</li>
                ) : (
                  data?.data.map((notification) => (
                    <li
                      key={notification._id}
                      className="flex items-start gap-3 px-4 py-3 hover:bg-gray-50"
                    >
                      {/* Icon */}
                      <div className="flex-shrink-0 text-2xl">
                        {notification.status === 'Completed' ? (
                          <FaCheck className="text-green-500" />
                        ) : (
                          <FaCircle className="text-yellow-500" />
                        )}
                      </div>
                      {/* Content */}
                      <div className="flex-1">
                        <p className="text-sm text-gray-700 font-medium">{notification.content}</p>
                        <p className="text-xs text-gray-500">
                          {new Date(notification.timestamp).toLocaleString()}
                        </p>
                      </div>
                      {/* Unread marker */}
                      {!notification.read && (
                        <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                      )}
                    </li>
                  ))
                )}
              </ul>

              {/* Footer */}
              <div className="px-4 py-3 bg-gray-100 border-t">
                <Link
                  to="#"
                  className="text-sm text-blue-500 hover:underline block text-center"
                >
                  Xem tất cả thông báo
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* Avatar và thông tin người dùng */}
        <div className="flex items-center space-x-2">
          <img
            src={`https://ui-avatars.com/api/?name=${userInfo.fullName}`}
            alt={userInfo.fullName}
            className="w-10 h-10 rounded-full"
          />
          <div className="hidden sm:block text-right">
            <h3 className="font-semibold">{userInfo.fullName}</h3>
            <p className="text-sm text-gray-500">
              {userInfo.roleId === 'companyadmin' ? 'CompanyAdmin' : 'Staff'}
            </p>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Topbar;
