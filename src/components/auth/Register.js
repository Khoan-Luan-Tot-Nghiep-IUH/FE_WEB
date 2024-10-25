import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRegisterMutation, useVerifyOtpMutation } from '../../Redux/User/apiSlice';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../../Redux/User/userSlice';
import Notification from '../shared/Notification/Notification';

const Register = () => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
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

  // Hiển thị thông báo
  const showNotification = (severity, message) => {
    setNotificationSeverity(severity);
    setNotificationMessage(message);
    setNotificationOpen(true);
  };

  // Đóng thông báo
  const handleNotificationClose = () => {
    setNotificationOpen(false);
  };

  // Hàm xử lý đăng ký người dùng
  const handleRegister = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    const phoneRegex = /^[0-9]{10}$/; // Số điện thoại phải có đúng 10 chữ số
    if (!phoneRegex.test(phoneNumber)) {
      setErrorMessage('Số điện thoại phải có 10 chữ số.');
      return;
    }
  
    // Kiểm tra định dạng email
    const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/; // Chỉ cho phép email kết thúc bằng @gmail.com
    if (!emailRegex.test(email)) {
      setErrorMessage('Email phải thuộc miền @gmail.com.');
      return;
    }
    // Định dạng lại số điện thoại nếu bắt đầu bằng '0'
    let formattedPhone = phoneNumber.startsWith('0') ? `+84${phoneNumber.slice(1)}` : phoneNumber;

    try {
      // Gửi yêu cầu đăng ký qua API
      const userData = await register({
        userName,
        password,
        fullName,
        email,
        phoneNumber: formattedPhone
      }).unwrap();

      // Nếu đăng ký thành công, chuyển sang bước xác thực OTP
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
        phoneNumber: formattedPhoneNumber,
        verificationCode: otp,
      }).unwrap();
      console.log("Verify Data:", verifyData);
      if (verifyData?.success) {
        showNotification('success', 'Xác minh OTP thành công! Vui lòng đăng nhập.');
        navigate('/login');
      } else {
        throw new Error('Xác minh OTP thất bại');
      }
    } catch (err) {
      const errorMsg = err?.response?.data?.message || 'Xác minh OTP thất bại. Vui lòng thử lại.';
      console.error("Lỗi xác minh OTP: ", err);
      showNotification('error', errorMsg);
    }
  };
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center bg-cover bg-center bg-fixed" style={{ backgroundImage: 'url("https://source.unsplash.com/1600x900/?nature,water")' }}>
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md bg-opacity-80">
        <h2 className="text-2xl font-bold text-center mb-6">
          {step === 1 ? 'Create Your Account' : 'Enter OTP'}
        </h2>

        {step === 1 ? (
          <form className="space-y-4" onSubmit={handleRegister}>
            <input
              type="text"
              placeholder="Username"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              placeholder="Full Name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className={`shadow appearance-none border ${errorMessage.includes('Email') ? 'border-red-500' : ''} rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
            <input
              type="text"
              placeholder="Phone Number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              required
             className={`shadow appearance-none border ${errorMessage.includes('Số điện thoại') ? 'border-red-500' : ''} rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
            {errorMessage && <p className="text-red-500 text-xs italic">{errorMessage}</p>}
            <button
              type="submit"
              className="w-full bg-black text-white font-bold py-2 px-4 rounded hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500"
            >
              {isRegistering ? 'Registering...' : 'Register'}
            </button>
          </form>
        ) : (
          <form className="space-y-4" onSubmit={handleVerifyOTP}>
            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errorMessage && <p className="text-red-500 text-xs italic">{errorMessage}</p>}
            <button
              type="submit"
              className="w-full bg-black text-white font-bold py-2 px-4 rounded hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500"
            >
              {isVerifying ? 'Verifying...' : 'Verify OTP'}
            </button>
          </form>
        )}
      </div>

      {/* Notification component */}
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
