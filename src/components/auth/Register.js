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
    <div className="min-h-screen flex items-center justify-center bg-gray-400">
      <div className="bg-white shadow-2xl rounded-2xl w-full max-w-4xl overflow-hidden">
        <div className="md:flex w-full">
          {/* Left Section */}
          <div className="hidden md:flex w-1/2 bg-gradient-to-tr from-purple-600 to-blue-500 items-center justify-center p-10">
            <div>
              <h2 className="text-white text-4xl font-bold mb-4">Chào Mừng!</h2>
              <p className="text-white mb-8">
                Hãy nhập thông tin cá nhân của bạn để tạo tài khoản và bắt đầu hành trình với chúng tôi.
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
              <h2 className="text-3xl font-bold text-gray-800">{step === 1 ? 'Đăng Ký' : 'Xác Minh OTP'}</h2>
              <p className="text-gray-600">{step === 1 ? 'Vui lòng điền thông tin để tạo tài khoản.' : 'Nhập mã OTP đã được gửi cho bạn.'}</p>
            </div>

            {step === 1 ? (
              <form onSubmit={handleRegister}>
                <div className="flex -mx-3">
                  <div className="w-full px-3 mb-5">
                    <label className="text-gray-700 font-semibold">Tên đăng nhập</label>
                    <input
                      type="text"
                      placeholder="Nhập tên đăng nhập"
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                      required
                      className="w-full mt-2 p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div className="flex -mx-3">
                  <div className="w-full px-3 mb-5">
                    <label className="text-gray-700 font-semibold">Mật khẩu</label>
                    <input
                      type="password"
                      placeholder="Nhập mật khẩu"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="w-full mt-2 p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div className="flex -mx-3">
                  <div className="w-full px-3 mb-5">
                    <label className="text-gray-700 font-semibold">Họ và tên</label>
                    <input
                      type="text"
                      placeholder="Nhập họ và tên"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      required
                      className="w-full mt-2 p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div className="flex -mx-3">
                  <div className="w-full px-3 mb-5">
                    <label className="text-gray-700 font-semibold">Email</label>
                    <input
                      type="email"
                      placeholder="Nhập email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="w-full mt-2 p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div className="flex -mx-3">
                  <div className="w-full px-3 mb-5">
                    <label className="text-gray-700 font-semibold">Số điện thoại</label>
                    <input
                      type="text"
                      placeholder="Nhập số điện thoại"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      required
                      className="w-full mt-2 p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div className="flex -mx-3 mb-5">
                  <div className="w-full px-3">
                    <label className="text-gray-700 font-semibold mb-2">Phương thức xác minh</label>
                    <div className="flex items-center space-x-4 mt-2">
                      <label className="flex items-center">
                        <input
                          type="radio"
                          value="email"
                          checked={verificationMethod === 'email'}
                          onChange={() => setVerificationMethod('email')}
                          className="form-radio h-5 w-5 text-blue-600"
                        />
                        <span className="ml-2 text-gray-700">Email</span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="radio"
                          value="phone"
                          checked={verificationMethod === 'phone'}
                          onChange={() => setVerificationMethod('phone')}
                          className="form-radio h-5 w-5 text-blue-600"
                        />
                        <span className="ml-2 text-gray-700">Số điện thoại</span>
                      </label>
                    </div>
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
                      {isRegistering ? 'Đang Đăng Ký...' : 'Đăng Ký'}
                    </button>
                  </div>
                </div>
              </form>
            ) : (
              <form onSubmit={handleVerifyOTP}>
                <div className="flex -mx-3 mb-5">
                  <div className="w-full px-3">
                    <label className="text-gray-700 font-semibold">Mã OTP</label>
                    <input
                      type="text"
                      placeholder="Nhập mã OTP"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
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
                      {isVerifying ? 'Đang Xác Minh...' : 'Xác Minh OTP'}
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

export default Register;
