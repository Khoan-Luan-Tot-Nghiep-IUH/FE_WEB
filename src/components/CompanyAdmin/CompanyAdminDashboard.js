import React from 'react';
import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';
import { Outlet } from 'react-router-dom';

const CompanyAdminDashboard = () => {
  return (
    <div className="flex bg-gray-100 min-h-screen">
      <Sidebar />
      <div className="flex-1 ml-64">
        <Topbar />
        <div className="p-6 mt-16">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default CompanyAdminDashboard;
