import React, { Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Loader from '../shared/Loader/Loader';
import ErrorBoundary from '../shared/ErrorBoundary/ErrorBoundary';
import PrivateRoute from './PrivateRoutes';
import CompanyAdminDashboard from 'components/CompanyAdmin/CompanyAdminDashboard';
import ManageTrips from 'components/CompanyAdmin/pages/ManageTrips';
import Dashboard from 'components/CompanyAdmin/pages/Dashboard';

// Lazy-loaded components
const HomePage = React.lazy(() => import('../home/HomePage'));
const Login = React.lazy(() => import('../auth/Login'));
const Register = React.lazy(() => import('../auth/Register'));
const SuperAdminDashboard = React.lazy(() => import('../SuperAdmin/SuperAdminDashboard')); // SuperAdmin
const ManageCompanies = React.lazy(() => import('../SuperAdmin/navSideBar/ManageCompanies')); // Quản lý Nhà Xe
const ManageAdmins = React.lazy(() => import('../SuperAdmin/navSideBar/ManageAdmins')); // Quản lý Admin Nhà Xe
const ManageUsers = React.lazy(() => import('../SuperAdmin/navSideBar/ManageUsers')); // Quản lý Người Dùng
const UserProfile = React.lazy(() => import('components/auth/UserProfile'));
const TicketBookingPage = React.lazy(() => import('components/Orders/TicketBookingPage'));
const UserDashboardLayout = React.lazy(() => import('components/auth/Dashboard/UserDashboardLayout'));
const OffersPage = React.lazy(() => import('components/auth/sidebar/OffersPage'));

const AppRoutes = ({ userInfo }) => {
  return (
    <ErrorBoundary>
      <Suspense fallback={<Loader />}>
        <Routes>
          {/* Route cho trang chủ */}
          <Route path="/" element={<HomePage />} />

          {/* Route cho login và register */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Route cho SuperAdminDashboard và các route con */}
          <Route
            path="/superadmin/dashboard"
            element={
              <PrivateRoute userInfo={userInfo} requiredRole="superadmin">
                <SuperAdminDashboard />
              </PrivateRoute>
            }
          >
            <Route path="companies" element={<ManageCompanies />} />
            <Route path="admins" element={<ManageAdmins />} />
            <Route path="users" element={<ManageUsers />} />
          </Route>

          {/* Route cho CompanyAdminDashboard và các route con */}
          <Route
            path="/companyadmin"
            element={
              <PrivateRoute userInfo={userInfo} requiredRole="companyadmin">
                <CompanyAdminDashboard />
              </PrivateRoute>
            }
          >
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="trip" element={<ManageTrips />} />
          </Route>

          {/* Route cho người dùng */}
          <Route path="/user" element={<UserDashboardLayout />}>
            <Route path="profile" element={<UserProfile />} />
            <Route path="ticket-buy" element={<TicketBookingPage />} />
            <Route path="offers" element={<OffersPage />} />
          </Route>

          {/* Route mặc định khi không tìm thấy */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </ErrorBoundary>
  );
};

export default AppRoutes;
