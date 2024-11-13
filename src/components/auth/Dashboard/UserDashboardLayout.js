import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../sidebar/Sidebar';
import Navbar from 'components/shared/navbar/Navbar';
import Breadcrumbs from '../sidebar/Breadcrumbs';

const UserDashboardLayout = () => {
  return (
    <div>
      <Navbar />
      <div className="container mx-auto mt-10 bg-white shadow-md rounded-lg p-4 sm:p-6">
        <Breadcrumbs />

        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar */}
          <div className="md:w-1/4">
            <Sidebar />
          </div>

          {/* Main Content */}
          <div className="md:w-3/4">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboardLayout;
