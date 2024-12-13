  import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLoginMutation } from "../../Redux/User/apiSlice";
import { setCredentials } from "../../Redux/User/userSlice";
import { useNavigate, useLocation } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import Notification from "../shared/Notification/Notification";
import { AiOutlineArrowLeft, AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const Login = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [login, { isLoading }] = useLoginMutation();
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [notificationSeverity, setNotificationSeverity] = useState("success");
  const [showPassword, setShowPassword] = useState(false);
  const from = location.state?.from || { pathname: "/" };

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    try {
      const userData = await login({ userName, password }).unwrap();
      if (userData?.accessToken) {
        const decodedUser = jwtDecode(userData.accessToken);
        const userInfo = { ...decodedUser, token: userData.accessToken };
        localStorage.setItem("user", JSON.stringify(userInfo));
        dispatch(setCredentials(userInfo));
        showNotification("success", "Login successful!");
        navigate(from.pathname + from.search, { replace: true });
      } else {
        throw new Error("Token is missing or invalid.");
      }
    } catch (err) {
      const errorMsg = err?.data?.msg || "Login failed. Please try again.";
      setErrorMessage(errorMsg);
      showNotification("error", errorMsg);
    }
  };

  const handleSocialLoginSuccess = (token) => {
    try {
      const decodedUser = jwtDecode(token);
      const userInfo = { ...decodedUser, token };
      localStorage.setItem("user", JSON.stringify(userInfo));
      dispatch(setCredentials(userInfo));
      navigate(from.pathname + from.search, { replace: true });
      showNotification("success", "Social login successful!");
    } catch (error) {
      setErrorMessage("Social login failed. Please try again.");
      showNotification("error", "Social login failed. Please try again.");
    }
  };

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get("token");
    const from = params.get("from") || "/";

    if (token) {
      handleSocialLoginSuccess(token);
      navigate(from);
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

  const handleNotificationClose = () => {
    setNotificationOpen(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-400">
      <div className="w-full max-w-5xl bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="flex flex-col md:flex-row">
          {/* Left Section */}
          <div
            className="md:w-1/2 hidden md:block bg-cover bg-center"
            style={{ backgroundImage: 'url("https://source.unsplash.com/random")' }}
          >
            <div className="h-full w-full flex flex-col justify-center items-center bg-gradient-to-tr from-purple-600 to-blue-500">
              <h2 className="text-4xl font-bold text-white mb-4">
                Chào Mừng Trở Lại!
              </h2>
              <p className="text-white mb-8 text-center px-8">
                Đăng nhập để tiếp tục truy cập vào hệ thống của chúng tôi.
              </p>
              <button
                className="bg-white text-blue-600 font-semibold py-2 px-6 rounded-full hover:bg-gray-100"
                onClick={() => navigate("/register")}
              >
                Đăng Ký
              </button>
              <div className="mt-[150px] text-center">
              <button
                onClick={() => navigate(-1)}
                className="flex items-center text-white justify-center transition text-sm"
              >
                <AiOutlineArrowLeft className="mr-2" size={32} />
                Quay lại
              </button>
            </div>
            </div>
          </div>

          {/* Right Section */}
          <div className="w-full md:w-1/2 p-8 sm:p-12">
            <h2 className="text-3xl font-semibold text-gray-800 mb-6">
              Đăng Nhập Tài Khoản
            </h2>
            <form onSubmit={handleLogin} className="space-y-5">
              <div>
                <label className="block text-gray-700">Tên Đăng Nhập</label>
                <input
                  type="text"
                  placeholder="Nhập tên đăng nhập"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  required
                  className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
              <div className="relative">
            <label className="block text-gray-700">Mật Khẩu</label>
            <input
              type={showPassword ? "text" : "password"} // Thay đổi type input
              placeholder="Nhập mật khẩu"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full mt-1 px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            {/* Nút toggle mật khẩu */}
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-[48px] transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
            >
              {showPassword ? <AiOutlineEyeInvisible size={24} /> : <AiOutlineEye size={24} />}
            </button>
          </div>
              {errorMessage && (
                <p className="text-sm text-red-500">{errorMessage}</p>
              )}
              <div className="flex items-center justify-between">
                <a
                  href="/forgot-password"
                  className="text-sm text-blue-500 hover:underline"
                >
                  Quên mật khẩu?
                </a>
                <a
                  href="/register"
                  className="text-sm text-blue-500 hover:underline"
                >
                  Đăng Ký Ngay
                </a>
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition duration-300"
              >
                {isLoading ? "Đang Đăng Nhập..." : "Đăng Nhập"}
              </button>
            </form>
            <div className="flex items-center my-6">
              <hr className="flex-grow border-gray-300" />
              <span className="mx-4 text-gray-400">Hoặc</span>
              <hr className="flex-grow border-gray-300" />
            </div>
            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <button
                onClick={handleGoogleLogin}
                className="flex items-center justify-center bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-semibold py-2 px-4 rounded-md shadow-sm w-full sm:w-auto"
              >
                <img
                  src="https://img.icons8.com/color/48/000000/google-logo.png"
                  alt="Google"
                  className="h-6 w-6 mr-2"
                />
                Đăng nhập với Google
              </button>
              <button
                onClick={handleFacebookLogin}
                className="flex items-center justify-center bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-semibold py-2 px-4 rounded-md shadow-sm w-full sm:w-auto"
              >
                <img
                  src="https://img.icons8.com/color/48/000000/facebook-new.png"
                  alt="Facebook"
                  className="h-6 w-6 mr-2"
                />
                Đăng nhập với Facebook
              </button>
            </div>
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

export default Login;
