import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useLoginMutation } from '../../Redux/User/apiSlice';
import { setCredentials } from '../../Redux/User/userSlice';
import { useNavigate, useLocation } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode'; 
import Notification from '../shared/Notification/Notification';

const Login = () => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [login, { isLoading }] = useLoginMutation();

  const [notificationOpen, setNotificationOpen] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');
  const [notificationSeverity, setNotificationSeverity] = useState('success');

  const from = location.state?.from || { pathname: '/search-results', search: location.search };

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    try {
      const userData = await login({ userName, password }).unwrap();
      if (userData?.accessToken) {
        const decodedUser = jwtDecode(userData.accessToken);
        const userInfo = { ...decodedUser, token: userData.accessToken };
        localStorage.setItem('user', JSON.stringify(userInfo));
        dispatch(setCredentials(userInfo));
        showNotification('success', 'Login successful!');
        navigate(from.pathname + from.search, { replace: true });
      } else {
        throw new Error('Token is missing or invalid.');
      }
    } catch (err) {
      const errorMsg = err?.data?.message || 'Login failed. Please try again.';
      setErrorMessage(errorMsg);
      showNotification('error', errorMsg);
    }
  };

  const handleSocialLoginSuccess = (token) => {
    try {
      const decodedUser = jwtDecode(token);
      const userInfo = { ...decodedUser, token };
      console.log("Full Name:", decodedUser.fullName);
      localStorage.setItem('user', JSON.stringify(userInfo));
      dispatch(setCredentials(userInfo));
      navigate(from.pathname + from.search, { replace: true });
      showNotification('success', 'Social login successful!');
    } catch (error) {
      setErrorMessage('Social login failed. Please try again.');
      showNotification('error', 'Social login failed. Please try again.');
    }
  };

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get('token');
    if (token) {
      handleSocialLoginSuccess(token);
    }
  }, [location]);

  const handleFacebookLogin = () => {
    window.location.href = `${process.env.REACT_APP_API_URL}/api/user/facebook`;
  };

  const handleGoogleLogin = () => {
    window.location.href = `${process.env.REACT_APP_API_URL}/api/user/google`;
  };

  const showNotification = (severity, message) => {
    setNotificationSeverity(severity);
    setNotificationMessage(message);
    setNotificationOpen(true);
  };

  // Handle closing the notification
  const handleNotificationClose = () => {
    setNotificationOpen(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">Welcome Back!</h2>
        
        {/* Form */}
        <form className="space-y-4" onSubmit={handleLogin}>
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
          {errorMessage && <p className="text-red-500 text-xs italic">{errorMessage}</p>}
          <div className="flex items-center justify-between mb-4">
           <a href="/register" className="text-sm text-blue-500 hover:text-blue-700">Register Now?</a>
            <a href="/forgot-password" className="text-sm text-blue-500 hover:text-blue-700">Did you forget your password?</a>
          </div>
          <button
            type="submit"
            className="w-full bg-black text-white font-bold py-2 px-4 rounded hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500"
          >
            {isLoading ? 'Logging in...' : 'Log In'}
          </button>
        </form>

        <div className="flex items-center my-4">
          <hr className="flex-grow border-gray-300" />
          <span className="mx-4 text-gray-500">OR</span>
          <hr className="flex-grow border-gray-300" />
        </div>

        {/* Social Login Buttons */}
        <div className="flex justify-center space-x-4">
          <button onClick={handleGoogleLogin} className="flex items-center bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-2 px-4 rounded-full">
            <img src="https://img.icons8.com/color/48/000000/google-logo.png" alt="Google" className="h-6 w-6 mr-2" />
            Google
          </button>
          <button onClick={handleFacebookLogin} className="flex items-center bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-2 px-4 rounded-full">
            <img src="https://img.icons8.com/color/48/000000/facebook-new.png" alt="Facebook" className="h-6 w-6 mr-2" />
            Facebook
          </button>
        </div>
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

export default Login;
