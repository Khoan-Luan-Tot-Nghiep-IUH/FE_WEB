import React, { useState, useRef, useEffect } from 'react';
import {
  useGetGlobalNotificationsQuery,
  useMarkNotificationAsCheckedMutation,
} from '../../../Redux/User/apiSlice';
import { BellIcon } from '@heroicons/react/24/outline';
import moment from 'moment';

const NotificationBell = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('all'); // 'all' hoặc 'unread'
  const dropdownRef = useRef();

  // Fetch notifications from API
  const {
    data: notifications = [],
    isLoading,
    refetch, // Add refetch for manual API refresh
  } = useGetGlobalNotificationsQuery();
  const [markAsChecked] = useMarkNotificationAsCheckedMutation();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Fetch notifications periodically
  useEffect(() => {
    const intervalId = setInterval(() => {
      refetch(); // Refetch notifications from API
    }, 10000); // Fetch every 10 seconds

    return () => clearInterval(intervalId); // Cleanup interval on unmount
  }, [refetch]);

  // Phân nhóm thông báo theo ngày
  const groupedNotifications = notifications.reduce((groups, notification) => {
    const date = moment(notification.createdAt).startOf('day').format('YYYY-MM-DD');
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(notification);
    return groups;
  }, {});

  // Hàm hiển thị tiêu đề ngày
  const renderDateHeader = (date) => {
    const today = moment().startOf('day');
    const notificationDate = moment(date);

    if (notificationDate.isSame(today, 'day')) {
      return 'Hôm nay';
    } else if (notificationDate.isSame(today.clone().subtract(1, 'days'), 'day')) {
      return 'Hôm qua';
    } else {
      return notificationDate.format('DD/MM/YYYY');
    }
  };

  // Filter notifications based on the active tab
  const filteredNotifications = notifications.filter((n) =>
    activeTab === 'unread' ? !n.isChecked : true
  );

  // Số lượng thông báo chưa đọc
  const unreadCount = notifications.filter((n) => !n.isChecked).length;

  // Mark notification as checked
  const handleMarkAsChecked = async (id) => {
    try {
      await markAsChecked(id);
    } catch (error) {
      console.error('Failed to mark notification as checked:', error);
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Bell Icon */}
      <button
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        className="relative text-white-700"
      >
        <BellIcon className="h-6 w-6  " />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
            {unreadCount}
          </span>
        )}
      </button>

      {/* Dropdown */}
      {isDropdownOpen && (
        <div className="absolute right-0 mt-2 w-96 bg-white shadow-lg rounded-md z-50">
          {/* Tabs */}
          <div className="flex justify-between border-b px-4 py-2">
            <button
              className={`text-sm font-medium ${
                activeTab === 'all' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600'
              }`}
              onClick={() => setActiveTab('all')}
            >
              Tất cả
            </button>
            <button
              className={`text-sm font-medium ${
                activeTab === 'unread' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600'
              }`}
              onClick={() => setActiveTab('unread')}
            >
              Chưa đọc
            </button>
          </div>

          {/* Notifications */}
          <div className="max-h-96 overflow-y-auto">
            {isLoading ? (
              <p className="p-4 text-gray-500">Đang tải...</p>
            ) : filteredNotifications.length === 0 ? (
              <p className="p-4 text-gray-500">
                {activeTab === 'unread' ? 'Không có thông báo chưa đọc.' : 'Không có thông báo.'}
              </p>
            ) : (
              Object.keys(groupedNotifications)
                .sort((a, b) => moment(b).diff(moment(a)))
                .map((date) => (
                  <div key={date}>
                    {/* Date Header */}
                    <div className="bg-gray-100 px-4 py-2">
                      <h4 className="text-xs font-medium text-gray-500">
                        {renderDateHeader(date)}
                      </h4>
                    </div>
                    {groupedNotifications[date]
                      .filter((n) => (activeTab === 'unread' ? !n.isChecked : true))
                      .map((notification) => (
                        <div
                          key={notification._id}
                          className={`flex items-start p-4 border-b cursor-pointer ${
                            notification.isChecked ? 'bg-white' : 'bg-blue-50'
                          } hover:bg-gray-100`}
                          onClick={() => handleMarkAsChecked(notification._id)}
                        >
                          {/* Image (if available) */}
                          {notification.images && (
                            <img
                              src={notification.images[0]}
                              alt="Notification"
                              className="h-12 w-12 rounded-full mr-4 object-cover"
                            />
                          )}
                          {/* Content */}
                          <div className="flex-1">
                            <p className="text-sm text-gray-700">
                              <span className="font-medium">{notification.title}</span>{' '}
                              {notification.description}
                            </p>
                            <p className="text-xs text-gray-400 mt-1">
                              {moment(notification.createdAt).fromNow()}
                            </p>
                          </div>
                        </div>
                      ))}
                  </div>
                ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationBell;
