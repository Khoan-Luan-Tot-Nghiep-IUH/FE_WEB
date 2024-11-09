import React, { useState, useEffect } from 'react';
import { useToggleNewUserVoucherMutation } from '../../../Redux/Company/companyApiSlice';
import Notification from '../../shared/Notification/Notification';

const Settings = () => {
  const [newUserVoucher, setNewUserVoucher] = useState(false);
  const [toggleNewUserVoucher] = useToggleNewUserVoucherMutation();
  const [notification, setNotification] = useState({
    open: false,
    message: '',
    severity: 'success',
  });

  useEffect(() => {
    const storedSetting = JSON.parse(localStorage.getItem('newUserVoucher'));
    if (storedSetting !== null) {
      setNewUserVoucher(storedSetting);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('newUserVoucher', JSON.stringify(newUserVoucher));
  }, [newUserVoucher]);

  const handleToggleNewUserVoucher = async () => {
    try {
      await toggleNewUserVoucher(!newUserVoucher).unwrap();
      setNewUserVoucher(!newUserVoucher);
      setNotification({
        open: true,
        message: `Voucher khi đăng ký đã được ${!newUserVoucher ? 'bật' : 'tắt'} thành công.`,
        severity: 'success',
      });
    } catch (error) {
      console.error('Lỗi khi bật/tắt voucher người dùng mới:', error);
      setNotification({
        open: true,
        message: 'Lỗi khi cập nhật cài đặt voucher. Vui lòng thử lại.',
        severity: 'error',
      });
    }
  };

  return (
    <div className="flex flex-col items-center p-10 bg-gradient-to-r from-indigo-100 via-white to-indigo-100 shadow-lg rounded-2xl max-w-lg mx-auto mt-20 transform transition-all duration-300 hover:shadow-2xl">
      <h2 className="text-3xl font-semibold text-indigo-800 mb-6 animate-pulse">Cài Đặt Voucher</h2>
      
      <div className="flex items-center justify-between w-full bg-white p-5 rounded-xl shadow-inner hover:shadow-lg transform transition duration-200">
        <span className="text-lg font-medium text-gray-700">Tặng Voucher Khi Đăng Ký</span>
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={newUserVoucher}
            onChange={handleToggleNewUserVoucher}
            className="sr-only peer"
          />
          <div className="w-12 h-7 bg-gray-300 rounded-full peer-focus:outline-none peer peer-checked:bg-indigo-600 transition-colors duration-300 ease-in-out"></div>
          <div className="w-6 h-6 bg-white border rounded-full absolute left-0.5 top-0.5 transform peer-checked:translate-x-5 transition-transform duration-300 ease-in-out shadow-md"></div>
        </label>
      </div>

      <p className="text-gray-600 text-sm mt-5 text-center">
        Bật tùy chọn này để tự động tặng voucher 50% cho tài khoản mới khi đăng ký.
      </p>

      <Notification
        open={notification.open}
        onClose={() => setNotification({ ...notification, open: false })}
        severity={notification.severity}
        message={notification.message}
      />
    </div>
  );
};

export default Settings;
