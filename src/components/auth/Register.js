import React, { useState } from 'react';
import axios from 'axios';

const Register = () => {
  const [fullName, setFullName] = useState('');
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [message, setMessage] = useState('');
  const [step, setStep] = useState(1); // Quản lý bước (1: nhập thông tin, 2: nhập OTP)
  const [formattedPhoneNumber, setFormattedPhoneNumber] = useState('');

  // Hàm để gửi OTP thông qua backend (bước 1)
  const handleRegister = async () => {
    try {
      setMessage('');
      if (!phoneNumber) {
        setMessage('Vui lòng nhập số điện thoại');
        return;
      }

      let formattedPhoneNumber = phoneNumber;
      if (phoneNumber.startsWith('0')) {
        formattedPhoneNumber = '+84' + phoneNumber.substring(1);
      }

      // Gửi thông tin đăng ký tới backend và yêu cầu gửi OTP
      const response = await axios.post('http://localhost:5000/api/user/register', {
        fullName,
        userName,
        password,
        email,
        phoneNumber: formattedPhoneNumber
      });

      if (response.data.success) {
        setMessage('Mã OTP đã được gửi!');
        setFormattedPhoneNumber(formattedPhoneNumber); // Lưu số điện thoại để xác minh OTP
        setStep(2); // Chuyển sang bước nhập OTP
      } else {
        setMessage('Gửi mã OTP thất bại.');
      }
    } catch (error) {
      setMessage(`Lỗi khi gửi OTP: ${error.response?.data?.msg || error.message}`);
    }
  };

  // Hàm để xác minh OTP (bước 2)
  const handleVerifyOTP = async () => {
    try {
      // Gửi mã OTP và số điện thoại tới backend để xác minh
      const response = await axios.post('http://localhost:5000/api/user/verify', {
        phoneNumber: formattedPhoneNumber,
        verificationCode: otp
      });

      if (response.data.success) {
        setMessage('Đăng ký thành công!');
      } else {
        setMessage('Mã OTP không chính xác hoặc đã hết hạn.');
      }
    } catch (error) {
      setMessage(`Lỗi khi xác minh OTP: ${error.response?.data?.msg || error.message}`);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">Register</h2>

        {/* Hiển thị giao diện bước 1: Nhập thông tin */}
        {step === 1 && (
          <>
            <div className="mb-4">
              <label className="block text-gray-700">Full Name:</label>
              <input
                type="text"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700">Email:</label>
              <input
                type="email"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700">Username:</label>
              <input
                type="text"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700">Password:</label>
              <input
                type="password"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700">Phone Number:</label>
              <input
                type="text"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </div>

            <button 
              className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
              onClick={handleRegister}
            >
              Submit
            </button>
          </>
        )}

        {/* Hiển thị giao diện bước 2: Nhập OTP */}
        {step === 2 && (
          <>
            <div className="mb-4">
              <label className="block text-gray-700">OTP:</label>
              <input
                type="text"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />
            </div>

            <button 
              className="w-full bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
              onClick={handleVerifyOTP}
            >
              Verify OTP
            </button>
          </>
        )}
        {message && <p className="text-red-500 mt-4 text-center">{message}</p>}
      </div>
    </div>
  );
};

export default Register;
