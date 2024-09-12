import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useLoginMutation } from '../../Redux/User/apiSlice';
import { setCredentials } from '../../Redux/User/userSlice';
import { useNavigate, useLocation } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode'; // Correct import

import './Login.css';

const Login = () => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [login, { isLoading }] = useLoginMutation();

  // Store the full path and search (query params)
  const from = location.state?.from || { pathname: '/search-results', search: location.search };

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMessage(''); // Reset error message before attempt
    try {
      const userData = await login({ userName, password }).unwrap();
      
      // Check if the accessToken exists and decode it
      if (userData?.accessToken) {
        const decodedUser = jwtDecode(userData.accessToken);
        const userInfo = { ...decodedUser, token: userData.accessToken };
        console.log('Role ID:', userInfo.roleId);
        // Save user information to localStorage and Redux store
        localStorage.setItem('user', JSON.stringify(userInfo));
        dispatch(setCredentials(userInfo));

        // Navigate back to the original page, including the search query
        navigate(from.pathname + from.search, { replace: true });
      } else {
        throw new Error('Token is missing or invalid.');
      }
    } catch (err) {
      // If error has data and message, display it; otherwise, display generic error
      const errorMsg = err?.data?.message || 'Login failed. Please try again.';
      setErrorMessage(errorMsg);
    }
  };

  const handleSocialLoginSuccess = (token) => {
    try {
      const decodedUser = jwtDecode(token);
      const userInfo = { ...decodedUser, token };
      localStorage.setItem('user', JSON.stringify(userInfo));
      dispatch(setCredentials(userInfo));
      navigate(from.pathname + from.search, { replace: true });
    } catch (error) {
      setErrorMessage('Social login failed. Please try again.');
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
    window.location.href = 'http://localhost:5000/api/user/facebook';
  };

  const handleGoogleLogin = () => {
    window.location.href = 'http://localhost:5000/api/user/google';
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2 className="login-title">Welcome Back!</h2>
        <form className="login-form" onSubmit={handleLogin}>
          <div className="input-group">
            <input
              type="text"
              placeholder="Username"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              required
              className="login-input"
            />
          </div>
          <div className="input-group">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="login-input"
            />
          </div>
          <button type="submit" className="login-button" disabled={isLoading}>
            {isLoading ? 'Logging in...' : 'Login'}
          </button>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
        </form>
        <div className="divider">or</div>
        <button onClick={handleFacebookLogin} className="social-login-btn facebook">
          Login with Facebook
        </button>
        <button onClick={handleGoogleLogin} className="social-login-btn google">
          Login with Google
        </button>
      </div>
    </div>
  );
};

export default Login;
