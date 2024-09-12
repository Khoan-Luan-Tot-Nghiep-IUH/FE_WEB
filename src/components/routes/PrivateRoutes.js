import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const PrivateRoute = ({ children, userInfo, requiredRole }) => {
  const location = useLocation();

  if (!userInfo) {
    // Nếu chưa đăng nhập, điều hướng tới trang đăng nhập
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (requiredRole && userInfo.roleId !== requiredRole) {
    // Nếu không có quyền cần thiết, điều hướng tới trang không có quyền truy cập
    return <Navigate to="/not-authorized" replace />;
  }

  // Hiển thị nội dung nếu người dùng có quyền truy cập
  return children;
};

export default PrivateRoute;
