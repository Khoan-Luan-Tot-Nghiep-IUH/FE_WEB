import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRegisterMutation, useVerifyOtpMutation } from '../../Redux/User/apiSlice';
import { useDispatch } from 'react-redux';
import Notification from '../shared/Notification/Notification';

const Register = () => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [verificationMethod, setVerificationMethod] = useState('email');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState(1);
  const [formattedPhoneNumber, setFormattedPhoneNumber] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [register, { isLoading: isRegistering }] = useRegisterMutation();
  const [verify, { isLoading: isVerifying }] = useVerifyOtpMutation();

  const [notificationOpen, setNotificationOpen] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');
  const [notificationSeverity, setNotificationSeverity] = useState('success');

  const showNotification = (severity, message) => {
    setNotificationSeverity(severity);
    setNotificationMessage(message);
    setNotificationOpen(true);
  };

  const handleNotificationClose = () => {
    setNotificationOpen(false);
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    const phoneRegex = /^[0-9]{10}$/;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;

    if (!phoneRegex.test(phoneNumber)) {
      setErrorMessage('Số điện thoại phải có 10 chữ số.');
      return;
    }
    if (!emailRegex.test(email)) {
      setErrorMessage('Email phải thuộc miền @gmail.com.');
      return;
    }

    let formattedPhone = phoneNumber.startsWith('0') ? `+84${phoneNumber.slice(1)}` : phoneNumber;

    try {
      const userData = await register({
        userName,
        password,
        fullName,
        email,
        phoneNumber: formattedPhone,
        verificationMethod,
      }).unwrap();

      if (userData?.success) {
        setFormattedPhoneNumber(formattedPhone);
        setStep(2);
        showNotification('success', 'Mã OTP đã được gửi!');
      } else {
        throw new Error(userData?.message || 'Đăng ký thất bại');
      }
    } catch (err) {
      const errorMsg = err?.data?.message || 'Đăng ký thất bại. Vui lòng thử lại.';
      setErrorMessage(errorMsg);
      showNotification('error', errorMsg);
    }
  };

  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    try {
      const verifyData = await verify({
        verificationMethod,
        phoneNumber: verificationMethod === 'phone' ? formattedPhoneNumber : undefined,
        email: verificationMethod === 'email' ? email : undefined,
        verificationCode: otp,
      }).unwrap();

      if (verifyData?.success) {
        showNotification('success', 'Xác minh OTP thành công! Vui lòng đăng nhập.');
        navigate('/login');
      } else {
        throw new Error('Xác minh OTP thất bại');
      }
    } catch (err) {
      const errorMsg = err?.response?.data?.message || 'Xác minh OTP thất bại. Vui lòng thử lại.';
      showNotification('error', errorMsg);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-200 via-gray-300 to-gray-300">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md bg-opacity-90">
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-8">
          {step === 1 ? 'Tạo tài khoản' : 'Nhập mã OTP'}
        </h2>

        {step === 1 ? (
          <form className="space-y-5" onSubmit={handleRegister}>
            <div>
              <label className="block text-gray-700 mb-1">Tên đăng nhập</label>
              <input
                type="text"
                placeholder="Nhập tên đăng nhập"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                required
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder-gray-400 text-gray-700"
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-1">Mật khẩu</label>
              <input
                type="password"
                placeholder="Nhập mật khẩu"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder-gray-400 text-gray-700"
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-1">Họ và tên</label>
              <input
                type="text"
                placeholder="Nhập họ và tên"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder-gray-400 text-gray-700"
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-1">Email</label>
              <input
                type="email"
                placeholder="Nhập email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder-gray-400 text-gray-700"
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-1">Số điện thoại</label>
              <input
                type="text"
                placeholder="Nhập số điện thoại"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                required
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder-gray-400 text-gray-700"
              />
            </div>

            <div className="flex justify-between items-center mt-4">
              <label className="flex items-center space-x-2 text-gray-700">
                <input
                  type="radio"
                  value="email"
                  checked={verificationMethod === 'email'}
                  onChange={() => setVerificationMethod('email')}
                  className="focus:ring-purple-500"
                />
                <span>Xác minh qua Email</span>
              </label>
              <label className="flex items-center space-x-2 text-gray-700">
                <input
                  type="radio"
                  value="phone"
                  checked={verificationMethod === 'phone'}
                  onChange={() => setVerificationMethod('phone')}
                  className="focus:ring-purple-500"
                />
                <span>Xác minh qua Số điện thoại</span>
              </label>
            </div>

            {errorMessage && (
              <p className="text-red-500 text-xs italic text-center">{errorMessage}</p>
            )}
            <button
              type="submit"
              className="w-full py-3 bg-purple-600 text-white font-bold rounded-lg hover:bg-purple-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
            >
              {isRegistering ? 'Đang đăng ký...' : 'Đăng ký'}
            </button>
          </form>
        ) : (
          <form className="space-y-5" onSubmit={handleVerifyOTP}>
            <div>
              <label className="block text-gray-700 mb-1">Mã OTP</label>
              <input
                type="text"
                placeholder="Nhập mã OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder-gray-400 text-gray-700"
              />
            </div>

            {errorMessage && (
              <p className="text-red-500 text-xs italic text-center">{errorMessage}</p>
            )}
            <button
              type="submit"
              className="w-full py-3 bg-purple-600 text-white font-bold rounded-lg hover:bg-purple-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
            >
              {isVerifying ? 'Đang xác minh...' : 'Xác minh OTP'}
            </button>
          </form>
        )}
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

export default Register;
