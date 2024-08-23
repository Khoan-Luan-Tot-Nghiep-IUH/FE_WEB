import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useLoginMutation } from '../../Redux/User/apiSlice';
import { setCredentials } from '../../Redux/User/userSlice';
import { useNavigate, useLocation } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';
import "./login.css";

const Login = () => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [login, { isLoading, error }] = useLoginMutation();

  useEffect(() => {
    // Check for token in URL (after social login redirect)
    const params = new URLSearchParams(location.search);
    const token = params.get('token');
    if (token) {
      handleSocialLoginSuccess(token);
      console.log(token);
    }
  }, [location]);

  const handleSocialLoginSuccess = (token) => {
    const decodedUser = jwtDecode(token);
    const userInfo = { ...decodedUser, token };
    localStorage.setItem('user', JSON.stringify(userInfo));
    dispatch(setCredentials(userInfo));
    navigate('/seatmap');
  };

  // Handle normal login
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const userData = await login({ userName, password }).unwrap();
      const decodedUser = jwtDecode(userData.accessToken);
      const userInfo = { ...decodedUser, token: userData.accessToken };

      localStorage.setItem('user', JSON.stringify(userInfo));
      dispatch(setCredentials(userInfo));
      navigate('/seatmap');
      console.log('User info saved to localStorage and Redux store');
    } catch (err) {
      console.error('Login failed:', err);
    }
  };

  // Handle Facebook login
  const handleFacebookLogin = () => {
    window.location.href = 'http://localhost:5000/api/user/facebook';
  };

  // Handle Google login
  const handleGoogleLogin = () => {
    window.location.href = 'http://localhost:5000/api/user/google';
  };

  return (
    <div className="login-container">
      <h2 className="login-title">Login</h2>
      
      {/* Normal login form */}
      <form className="login-form" onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Username"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Logging in...' : 'Login'}
        </button>
        {error && <p className="error-message">{error.data?.message || 'An error occurred'}</p>}
      </form>

      <div className="divider">or</div>

      {/* Facebook login button */}
      <button onClick={handleFacebookLogin} className="facebook-login-btn">
        Login with Facebook
      </button>

      {/* Google login button */}
      <button onClick={handleGoogleLogin} className="google-login-btn">
        Login with Google
      </button>
    </div>
  );
};

export default Login;