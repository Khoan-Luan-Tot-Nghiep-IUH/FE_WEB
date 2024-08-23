import React, { Suspense } from 'react';
import { Routes, Route, } from 'react-router-dom';
import Loader from '../shared/Loader/Loader';

const HomePage = React.lazy(() => import('../home/HomePage'));
const Login = React.lazy(() => import('../auth/Login')); 
const TripSearchResult = React.lazy(()=>import('../booking/TripSearchResult'))
const AppRoutes = ({ userInfo }) => (
  <Suspense fallback={<Loader />}>
    <Routes>
     <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/search-results" element={<TripSearchResult />} />
    </Routes>
  </Suspense>
);

export default AppRoutes;
