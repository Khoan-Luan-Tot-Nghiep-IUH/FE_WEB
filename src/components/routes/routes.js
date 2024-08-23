import React, { Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Loader from '../shared/Loader/Loader';
import SearchResults from 'components/booking/TripSearchResult';

const HomePage = React.lazy(() => import('../home/HomePage'));
const Login = React.lazy(() => import('../auth/Login')); 
const SeatMap = React.lazy(() => import('../booking/Seatmap')); 

const AppRoutes = ({ userInfo }) => (
  <Suspense fallback={<Loader />}>
    <Routes>
     <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/search-results" element={<SearchResults />} />
      <Route 
        path="/seatmap" 
        element={userInfo ? <SeatMap /> : <Navigate to="/login" replace />} 
      />
    </Routes>
  </Suspense>
);

export default AppRoutes;
