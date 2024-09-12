import React, { useState } from 'react';
import Sidebar from '../shared/SideBar/SideBar'; // Import Sidebar
import ManageCompanies from './navSideBar/ManageCompanies'; // Import các component cần hiển thị
import ManageAdmins from './navSideBar/ManageAdmins';
import ManageUsers from './navSideBar/ManageUsers';

import './SuperAdminDashboard.css';

const SuperAdminDashboard = () => {
  const [activeContent, setActiveContent] = useState('companies');

  const renderContent = () => {
    switch (activeContent) {
      case 'companies':
        return <ManageCompanies />; // Hiển thị trang Quản lý Nhà xe
      case 'admins':
        return <ManageAdmins />; // Hiển thị trang Quản lý Admin
      case 'users':
        return <ManageUsers />; // Hiển thị trang Quản lý Người dùng
      default:
        return <div>Chọn một mục từ sidebar</div>;
    }
  };

  return (
    <div className="super-admin-dashboard">
      <Sidebar setActiveContent={setActiveContent} />

      <div className="main-content">
        {renderContent()}
      </div>
    </div>
  );
};

export default SuperAdminDashboard;
