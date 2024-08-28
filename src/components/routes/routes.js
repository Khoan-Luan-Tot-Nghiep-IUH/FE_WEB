import React, { Suspense } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Loader from '../shared/Loader/Loader';
import ErrorBoundary from '../shared/ErrorBoundary/ErrorBoundary'; 

const HomePage = React.lazy(() => import('../home/HomePage'));
const Login = React.lazy(() => import('../auth/Login'));
const TripSearchResult = React.lazy(() => import('../TripSearchResult/TripSearchResult'));

const PrivateRoute = ({ children, userInfo }) => {
  const location = useLocation();

  if (!userInfo) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

const AppRoutes = ({ userInfo }) => {
  return (
    <ErrorBoundary>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/search-results" element={<TripSearchResult />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </ErrorBoundary>
  );
};

export default AppRoutes;
