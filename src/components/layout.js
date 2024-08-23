// src/components/Layout.js

import React from 'react';
import Navbar from './shared/navbar/Navbar';
import BookingForm from './Form/Booking/BookingForm';

const Layout = ({ children }) => {
  return (
    <div>
      <Navbar />
      <BookingForm />
      <div>{children}</div>
    </div>
  );
};

export default Layout;
