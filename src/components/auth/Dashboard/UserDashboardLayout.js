import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../sidebar/Sidebar';
import Navbar from 'components/shared/navbar/Navbar';
import Breadcrumbs from '../sidebar/Breadcrumbs';
 
const UserDashboardLayout = () => {
  return (
    <div>
    <Navbar/>
    <div className="container mx-auto mt-10 bg-white shadow-md rounded-lg">
    <div>
        <Breadcrumbs/>
    </div>
      <div className="flex gap-6">
        <div className="w-1/4">
          <Sidebar />
        </div>
        <div className="w-3/4">
          <Outlet />
        </div>
      </div>
      </div>
    </div>
  );
};

export default UserDashboardLayout;
