import React, { Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Loader from '../shared/Loader/Loader';
import ErrorBoundary from '../shared/ErrorBoundary/ErrorBoundary';
import PrivateRoute from './PrivateRoutes';



import Requirements from 'components/auth/sidebar/Requirements';
import ForgotPassword from 'components/auth/ForgotPassword';
import TripRequest from 'components/home/TripRequest/TripRequest';
import ManageBooking from 'components/CompanyAdmin/pages/ManageBooking';
import ManageExpense from 'components/CompanyAdmin/pages/ManageExpense';
import Comment from 'components/CompanyAdmin/pages/Comment';
import FAQManagement from 'components/SuperAdmin/navSideBar/FAQManagement';

// Lazy-loaded components
const HomePage = React.lazy(() => import('../home/HomePage'));
const Login = React.lazy(() => import('../auth/Login'));
const Register = React.lazy(() => import('../auth/Register'));
const SuperAdminDashboard = React.lazy(() => import('../SuperAdmin/SuperAdminDashboard')); // SuperAdmin
const ManageCompanies = React.lazy(() => import('../SuperAdmin/navSideBar/ManageCompanies')); // Quản lý Nhà Xe
const ManageAdmins = React.lazy(() => import('../SuperAdmin/navSideBar/ManageAdmins')); // Quản lý Admin Nhà Xe
const ManageUsers = React.lazy(() => import('../SuperAdmin/navSideBar/ManageUsers'));

// Quản lý Người Dùng
const UserProfile = React.lazy(() => import('components/auth/UserProfile'));
const TicketBookingPage = React.lazy(() => import('components/Orders/TicketBookingPage'));
const UserDashboardLayout = React.lazy(() => import('components/auth/Dashboard/UserDashboardLayout'));
const OffersPage = React.lazy(() => import('components/auth/sidebar/OffersPage'));

const CompanyAdminDashboard = React.lazy(()=> import ('components/CompanyAdmin/CompanyAdminDashboard'));
const ManageTrips = React.lazy(()=> import ('components/CompanyAdmin/pages/ManageTrips'));
const Dashboard = React.lazy(()=> import ('components/CompanyAdmin/pages/Dashboard'));
const ManageBuses = React.lazy(()=>import('components/CompanyAdmin/pages/ManageBuses'));
const SearchResults = React.lazy(()=> import('components/home/components/SearchResult/SearchResults'));
const ManageDrivers = React.lazy(() => import('components/CompanyAdmin/pages/ManageDrivers'));
const PaymentMethod = React.lazy(() => import('components/home/components/Booking/PaymentMethod'));
const Location = React.lazy(() => import('components/SuperAdmin/navSideBar/Location'));



const ChangePassword = React.lazy(()=> import('components/auth/sidebar/ChangePassword'))
const SearchPage = React.lazy(()=> import ('components/home/components/SearchResult/SearchPage'));
const BookingPage = React.lazy(()=>import ('components/home/components/Booking/BookingPage'));

const Cooperate = React.lazy(()=> import ('components/home/Cooperate'));

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
          <Route path="/forgot-password" element={<ForgotPassword/>} />
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
            <Route path="Location" element={<Location />} />
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
            <Route path="manage-buses" element={<ManageBuses />} />
            <Route path="manage-drivers" element={<ManageDrivers />} />
            <Route path="expense" element={<ManageExpense />} />
            <Route path="bookings" element={<ManageBooking />} />
            <Route path="comment" element={<Comment />} />
            <Route path="faq" element={<FAQManagement/>} />
          </Route>

          {/* Route cho người dùng */}
          <Route path="/user" element={<UserDashboardLayout />}>
            <Route path="profile" element={<UserProfile />} />
            <Route path="ticket-buy" element={<TicketBookingPage />} />
            <Route path="offers" element={<OffersPage />} />
            <Route path="change-password" element={<ChangePassword />} />
            <Route path="requirements" element={<Requirements />} />
          </Route>
          <Route path="/mo-ban-ve-xe" element={<Cooperate />} />
          <Route path="/yeu-cau-mo-chuyen-di" element={<TripRequest />} />
          <Route path="/search-results" element={<SearchResults />} />
          <Route path="/search-page" element={<SearchPage />} />
          <Route path="/bookingconfirmation" element={<BookingPage/>} />
          <Route path="/payment-methods" element={<PaymentMethod/>} />
          {/* Route mặc định khi không tìm thấy */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </ErrorBoundary>
  );
};

export default AppRoutes;
