import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';
import { Outlet } from 'react-router-dom';

const CompanyAdminDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex bg-gray-100 min-h-screen">
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <div className={`flex-1 transition-all duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-0'} lg:ml-64`}>
        <Topbar toggleSidebar={toggleSidebar} />
        <div className="p-6 mt-16">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default CompanyAdminDashboard;
