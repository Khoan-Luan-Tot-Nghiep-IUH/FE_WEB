import React, { Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Loader from '../shared/Loader/Loader';
import ErrorBoundary from '../shared/ErrorBoundary/ErrorBoundary'; 

const HomePage = React.lazy(() => import('../home/HomePage'));
const Login = React.lazy(() => import('../auth/Login'));
const TripSearchResult = React.lazy(() => import('../TripSearchResult/TripSearchResult'));

const PrivateRoute = ({ element, userInfo, ...rest }) => {
  return userInfo ? element : <Navigate to="/login" />;
};

const AppRoutes = ({ userInfo }) => (
  <ErrorBoundary>
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/search-results"
          element={
            <PrivateRoute
              userInfo={userInfo}
              element={<TripSearchResult />}
            />
          }
        />
      </Routes>
    </Suspense>
  </ErrorBoundary>
);

export default AppRoutes;
