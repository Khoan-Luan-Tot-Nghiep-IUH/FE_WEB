import React, { useState } from 'react';
import { useChangePasswordMutation } from '../../../Redux/User/apiSlice';
import Notification from '../../shared/Notification/Notification';

const ChangePassword = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');
  const [notificationSeverity, setNotificationSeverity] = useState('success');

  const [changePassword, { isLoading }] = useChangePasswordMutation();

  const handleNotificationClose = () => {
    setNotificationOpen(false);
  };

  const showNotification = (severity, message) => {
    setNotificationSeverity(severity);
    setNotificationMessage(message);
    setNotificationOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmNewPassword) {
      showNotification('error', 'Mật khẩu mới và xác nhận mật khẩu không khớp.');
      return;
    }
    
    try {
      const response = await changePassword({
        currentPassword,
        newPassword,
        confirmNewPassword
      }).unwrap();

      if (response.success) {
        showNotification('success', 'Đổi mật khẩu thành công.');
        setCurrentPassword('');
        setNewPassword('');
        setConfirmNewPassword('');
      }
    } catch (error) {
      showNotification('error', error?.data?.msg || 'Đổi mật khẩu thất bại. Vui lòng thử lại.');
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md mt-10">
      <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">Đổi Mật Khẩu</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700 mb-1">Mật khẩu hiện tại</label>
          <input
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            required
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder-gray-400 text-gray-700"
          />
        </div>

        <div>
          <label className="block text-gray-700 mb-1">Mật khẩu mới</label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder-gray-400 text-gray-700"
          />
        </div>

        <div>
          <label className="block text-gray-700 mb-1">Xác nhận mật khẩu mới</label>
          <input
            type="password"
            value={confirmNewPassword}
            onChange={(e) => setConfirmNewPassword(e.target.value)}
            required
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder-gray-400 text-gray-700"
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-3 bg-purple-600 text-white font-bold rounded-lg hover:bg-purple-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
        >
          {isLoading ? 'Đang xử lý...' : 'Đổi mật khẩu'}
        </button>
      </form>

      <Notification
        open={notificationOpen}
        onClose={handleNotificationClose}
        severity={notificationSeverity}
        message={notificationMessage}
      />
    </div>
  );
};

export default ChangePassword;
