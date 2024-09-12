import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const PrivateRoute = ({ children, userInfo, requiredRole }) => {
  const location = useLocation();

  if (!userInfo) {

    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (requiredRole && userInfo.roleId !== requiredRole) {
    return <Navigate to="/not-authorized" replace />;
  }
  return children;
};

export default PrivateRoute;
