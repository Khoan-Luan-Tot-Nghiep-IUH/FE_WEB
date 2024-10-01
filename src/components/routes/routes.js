import React, { Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Loader from '../shared/Loader/Loader';
import ErrorBoundary from '../shared/ErrorBoundary/ErrorBoundary';
import PrivateRoute from './PrivateRoutes';



const HomePage = React.lazy(() => import('../home/HomePage'));
const Login = React.lazy(() => import('../auth/Login'));
const Register = React.lazy(() => import('../auth/Register'));
const SuperAdminDashboard = React.lazy(() => import('../SuperAdmin/SuperAdminDashboard')); // SuperAdmin
const ManageCompanies = React.lazy(() => import('../SuperAdmin/navSideBar/ManageCompanies')); // Quản lý Nhà Xe
const ManageAdmins = React.lazy(() => import('../SuperAdmin/navSideBar/ManageAdmins')); // Quản lý Admin Nhà Xe
const ManageUsers = React.lazy(() => import('../SuperAdmin/navSideBar/ManageUsers')); // Quản lý Người Dùng
const UserProfile = React.lazy(()=> import('components/auth/UserProfile'));
const TicketBookingPage = React.lazy(()=> import('components/Orders/TicketBookingPage'));
const UserDashboardLayout = React.lazy(()=> import('components/auth/Dashboard/UserDashboardLayout'));
const OffersPage = React.lazy(() => import('components/auth/sidebar/OffersPage'));


const AppRoutes = ({ userInfo }) => {
  return (
    <ErrorBoundary>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          {/* <Route path="/search-results" element={<TripSearchResult />} /> */}
          
          {/* Route cho SuperAdminDashboard */}
          <Route
            path="/superadmin/*"
            element={
              <PrivateRoute userInfo={userInfo} requiredRole="superadmin">
                <SuperAdminDashboard />
              </PrivateRoute>
            }
          />

          {/* Các route cụ thể cho từng phần trong SuperAdminDashboard */}
          <Route
            path="/superadmin/companies"
            element={
              <PrivateRoute userInfo={userInfo} requiredRole="superadmin">
                <ManageCompanies />
              </PrivateRoute>
            }
          />
          <Route
            path="/superadmin/admins"
            element={
              <PrivateRoute userInfo={userInfo} requiredRole="superadmin">
                <ManageAdmins />
              </PrivateRoute>
            }
          />
          <Route
            path="/superadmin/users"
            element={
              <PrivateRoute userInfo={userInfo} requiredRole="superadmin">
                <ManageUsers />
              </PrivateRoute>
            }
          />
          <Route path="/user" element={<UserDashboardLayout />}>
          <Route path="profile" element={<UserProfile />} />
          <Route path="ticket-buy" element={<TicketBookingPage />} />
          <Route path="offers" element={<OffersPage />} />
        </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </ErrorBoundary>
  );
};

export default AppRoutes;
