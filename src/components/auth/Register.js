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
  const [otp, setOtp] = useState('');  // OTP từ người dùng
  const [step, setStep] = useState(1);  // Quản lý bước đăng ký (1: Đăng ký, 2: Nhập OTP)
  const [formattedPhoneNumber, setFormattedPhoneNumber] = useState('');

  const [errorMessage, setErrorMessage] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [register, { isLoading }] = useRegisterMutation();
  const [verify] = useVerifyOtpMutation();  // Sử dụng hook verify OTP từ apiSlice

  const [notificationOpen, setNotificationOpen] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');
  const [notificationSeverity, setNotificationSeverity] = useState('success');

  // Xử lý đăng ký
  const handleRegister = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    try {
      let formattedPhoneNumber = phoneNumber;
      if (phoneNumber.startsWith('0')) {
        formattedPhoneNumber = '+84' + phoneNumber.substring(1);
      }

      const userData = await register({ userName, password, fullName, email, phoneNumber: formattedPhoneNumber }).unwrap();
      if (userData?.success) {
        setFormattedPhoneNumber(formattedPhoneNumber);  // Lưu số điện thoại để xác minh OTP
        setStep(2);  // Chuyển sang bước nhập OTP
        showNotification('success', 'Mã OTP đã được gửi!');
      } else {
        throw new Error('Đăng ký thất bại');
      }
    } catch (err) {
      const errorMsg = err?.data?.message || 'Đăng ký thất bại. Vui lòng thử lại.';
      setErrorMessage(errorMsg);
      showNotification('error', errorMsg);
    }
  };
  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    console.log("Phone number: ", formattedPhoneNumber);
    console.log("OTP entered: ", otp);
  
    try {
      const verifyData = await verify({
        phoneNumber: formattedPhoneNumber,
        verificationCode: otp,
      }).unwrap();
      if (verifyData?.success) {
        console.log("Xác minh OTP thành công: ", verifyData);
        const userInfo = { ...verifyData.newUser }; 
        dispatch(setCredentials(userInfo));
        localStorage.setItem('user', JSON.stringify(userInfo));
  
        showNotification('success', 'Xác minh OTP thành công! Vui lòng đăng nhập.');
        navigate('/login'); 
      } else {
        throw new Error('Xác minh OTP thất bại');
      }
    } catch (err) {
      console.error("Lỗi xác minh OTP: ", err);
      showNotification('error', 'Xác minh OTP thất bại. Vui lòng thử lại.');
    }
  };
  const showNotification = (severity, message) => {
    setNotificationSeverity(severity);
    setNotificationMessage(message);
    setNotificationOpen(true);
  };

  const handleNotificationClose = () => {
    setNotificationOpen(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center bg-cover bg-center bg-fixed" style={{ backgroundImage: 'url("https://source.unsplash.com/1600x900/?nature,water")' }}>
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md bg-opacity-80">
        <h2 className="text-2xl font-bold text-center mb-6">
          {step === 1 ? 'Create Your Account' : 'Enter OTP'}
        </h2>

        {/* Hiển thị form đăng ký hoặc nhập OTP dựa vào step */}
        {step === 1 ? (
          <form className="space-y-4" onSubmit={handleRegister}>
            <div>
              <input
                type="text"
                placeholder="Username"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                required
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <input
                type="text"
                placeholder="Full Name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <input
                type="text"
                placeholder="Phone Number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                required
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            {errorMessage && <p className="text-red-500 text-xs italic">{errorMessage}</p>}
            <button
              type="submit"
              className="w-full bg-black text-white font-bold py-2 px-4 rounded hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500"
            >
              {isLoading ? 'Registering...' : 'Register'}
            </button>
          </form>
        ) : (
          <form className="space-y-4" onSubmit={handleVerifyOTP}>
            <div>
              <input
                type="text"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            {errorMessage && <p className="text-red-500 text-xs italic">{errorMessage}</p>}
            <button
              type="submit"
              className="w-full bg-black text-white font-bold py-2 px-4 rounded hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500"
            >
              {isLoading ? 'Verifying...' : 'Verify OTP'}
            </button>
          </form>
        )}
      </div>

      {/* Snackbar notification component */}
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
