import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSendResetCodeMutation, useVerifyResetCodeMutation } from '../../Redux/User/apiSlice';
import Notification from '../shared/Notification/Notification';

const ForgotPassword = () => {
  const [identifier, setIdentifier] = useState('');
  const [resetCode, setResetCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [step, setStep] = useState(1);
  const [errorMessage, setErrorMessage] = useState('');
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');
  const [notificationSeverity, setNotificationSeverity] = useState('success');
  const navigate = useNavigate();

  const [sendResetCode, { isLoading: isSendingCode }] = useSendResetCodeMutation();
  const [verifyResetCode, { isLoading: isVerifyingCode }] = useVerifyResetCodeMutation();

  const showNotification = (severity, message) => {
    setNotificationSeverity(severity);
    setNotificationMessage(message);
    setNotificationOpen(true);
  };

  const handleNotificationClose = () => {
    setNotificationOpen(false);
  };

  const handleSendResetCode = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    try {
      const response = await sendResetCode({ identifier }).unwrap();
      if (response.success) {
        setStep(2);
        showNotification('success', 'Mã xác minh đã được gửi!');
      } else {
        throw new Error(response.msg || 'Gửi mã xác minh thất bại.');
      }
    } catch (err) {
      const errorMsg = err?.data?.msg || 'Gửi mã xác minh thất bại. Vui lòng thử lại.';
      setErrorMessage(errorMsg);
      showNotification('error', errorMsg);
    }
  };

  const handleVerifyResetCode = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    if (newPassword !== confirmNewPassword) {
      setErrorMessage('Mật khẩu mới và xác nhận mật khẩu không khớp.');
      return;
    }

    try {
      const response = await verifyResetCode({ identifier, resetCode, newPassword, confirmNewPassword }).unwrap();
      if (response.success) {
        showNotification('success', 'Cập nhật mật khẩu thành công! Vui lòng đăng nhập.');
        navigate('/login');
      } else {
        throw new Error(response.msg || 'Xác minh mã thất bại.');
      }
    } catch (err) {
      const errorMsg = err?.data?.msg || 'Xác minh mã thất bại. Vui lòng thử lại.';
      setErrorMessage(errorMsg);
      showNotification('error', errorMsg);
    }
  };

  const handleIdentifierChange = (value) => {
    // Kiểm tra nếu là số điện thoại và bắt đầu bằng 0 thì chuyển sang định dạng +84
    if (/^\d+$/.test(value) && value.startsWith('0')) {
      setIdentifier(`+84${value.slice(1)}`);
    } else {
      setIdentifier(value);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-400">
      <div className="bg-white shadow-2xl rounded-2xl w-full max-w-4xl overflow-hidden">
        <div className="md:flex w-full">
          {/* Left Section */}
          <div className="hidden md:flex w-1/2 bg-gradient-to-tr from-purple-600 to-blue-500 items-center justify-center p-10">
            <div>
              <h2 className="text-white text-4xl font-bold mb-4">Quên mật khẩu?</h2>
              <p className="text-white mb-8">
                Nhập thông tin của bạn để nhận mã xác minh và tạo mật khẩu mới.
              </p>
              <button
                className="bg-white text-blue-600 font-semibold py-2 px-6 rounded-full hover:bg-gray-100"
                onClick={() => navigate('/login')}
              >
                Đăng Nhập
              </button>
            </div>
          </div>

          {/* Right Section */}
          <div className="w-full md:w-1/2 py-10 px-5 md:px-10">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-gray-800">{step === 1 ? 'Quên Mật Khẩu' : 'Đặt Lại Mật Khẩu'}</h2>
              <p className="text-gray-600">
                {step === 1
                  ? 'Nhập email hoặc số điện thoại để nhận mã xác minh.'
                  : 'Nhập mã xác minh và mật khẩu mới.'}
              </p>
            </div>

            {step === 1 ? (
              <form onSubmit={handleSendResetCode}>
                <div className="flex -mx-3 mb-5">
                  <div className="w-full px-3">
                    <label className="text-gray-700 font-semibold">Email hoặc Số điện thoại</label>
                    <input
                      type="text"
                      placeholder="Nhập email hoặc số điện thoại"
                      value={identifier}
                      onChange={(e) => handleIdentifierChange(e.target.value)}
                      required
                      className="w-full mt-2 p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                {errorMessage && (
                  <p className="text-red-500 text-sm text-center mb-5">{errorMessage}</p>
                )}

                <div className="flex -mx-3">
                  <div className="w-full px-3">
                    <button
                      type="submit"
                      className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition duration-300"
                    >
                      {isSendingCode ? 'Đang Gửi Mã...' : 'Gửi Mã Xác Minh'}
                    </button>
                  </div>
                </div>
              </form>
            ) : (
              <form onSubmit={handleVerifyResetCode}>
                <div className="flex -mx-3 mb-5">
                  <div className="w-full px-3">
                    <label className="text-gray-700 font-semibold">Mã Xác Minh</label>
                    <input
                      type="text"
                      placeholder="Nhập mã xác minh"
                      value={resetCode}
                      onChange={(e) => setResetCode(e.target.value)}
                      required
                      className="w-full mt-2 p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div className="flex -mx-3 mb-5">
                  <div className="w-full px-3">
                    <label className="text-gray-700 font-semibold">Mật khẩu mới</label>
                    <input
                      type="password"
                      placeholder="Nhập mật khẩu mới"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      required
                      className="w-full mt-2 p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div className="flex -mx-3 mb-5">
                  <div className="w-full px-3">
                    <label className="text-gray-700 font-semibold">Xác nhận mật khẩu</label>
                    <input
                      type="password"
                      placeholder="Xác nhận mật khẩu mới"
                      value={confirmNewPassword}
                      onChange={(e) => setConfirmNewPassword(e.target.value)}
                      required
                      className="w-full mt-2 p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                {errorMessage && (
                  <p className="text-red-500 text-sm text-center mb-5">{errorMessage}</p>
                )}

                <div className="flex -mx-3">
                  <div className="w-full px-3">
                    <button
                      type="submit"
                      className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition duration-300"
                    >
                      {isVerifyingCode ? 'Đang Xác Minh...' : 'Cập Nhật Mật Khẩu'}
                    </button>
                  </div>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>

      <Notification
        open={notificationOpen}
        onClose={handleNotificationClose}
        severity={notificationSeverity}
        message={notificationMessage}
      />
    </div>
  );
};

export default ForgotPassword;
