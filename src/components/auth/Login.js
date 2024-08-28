import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useLoginMutation } from '../../Redux/User/apiSlice';
import { setCredentials } from '../../Redux/User/userSlice';
import { useNavigate, useLocation } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';  // Cập nhật import đúng cú pháp
import './Login.css'; 

const Login = () => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [login, { isLoading }] = useLoginMutation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get('token');
    if (token) {
      handleSocialLoginSuccess(token);
    }
  }, [location]);

  const handleSocialLoginSuccess = (token) => {
    try {
      const decodedUser = jwtDecode(token);
      const userInfo = { ...decodedUser, token };
      localStorage.setItem('user', JSON.stringify(userInfo));
      dispatch(setCredentials(userInfo));
      navigate(location.state?.from || '/', { replace: true });
    } catch (error) {
      setErrorMessage('Social login failed. Please try again.');
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const userData = await login({ userName, password }).unwrap();
      const decodedUser = jwtDecode(userData.accessToken);
      const userInfo = { ...decodedUser, token: userData.accessToken };

      localStorage.setItem('user', JSON.stringify(userInfo));
      dispatch(setCredentials(userInfo));

      // Điều hướng về trang trước đó hoặc về trang mặc định
      const redirectTo = location.state?.from || '/';
      navigate(redirectTo, { replace: true });
    } catch (err) {
      setErrorMessage(err.data?.message || 'Login failed. Please try again.');
    }
  };

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
