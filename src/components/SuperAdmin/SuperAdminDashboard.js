import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Sidebar from './SideBar/Sidebar';
import ManageCompanies from './navSideBar/ManageCompanies';
import ManageAdmins from './navSideBar/ManageAdmins';
import ManageUsers from './navSideBar/ManageUsers';
import './SuperAdminDashboard.css';
import Statistics from './navSideBar/Statistics';
import Settings from './navSideBar/Settings';

const SuperAdminDashboard = () => {
  const [activeContent, setActiveContent] = useState('default');

  useEffect(() => {
    notify();
  }, []);

  const notify = () => {
    toast.success("Chào mừng bạn đến với hệ thống!", {
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const renderContent = () => {
    switch (activeContent) {
      case 'default':
        return (
          <div className="text-3xl font-bold text-center text-red-500 mt-10">
            CHÀO MỪNG BẠN ĐẾN TRANG QUẢN LÍ HỆ THỐNG
          </div>
        );
      case 'companies':
        return <ManageCompanies />;
      case 'admins':
        return <ManageAdmins />;
      case 'users':
        return <ManageUsers />;
        case 'statistics':
          return <Statistics />;
      case 'logs':
        return <div>Nhật ký hoạt động Content</div>; // Placeholder for logs
      case 'settings':
        return  <Settings/>; // Placeholder for settings
      case 'reports':
        return <div>Báo cáo Content</div>; // Placeholder for reports
      default:
        return null;
    }
  };

  return (
    <div className="super-admin-dashboard">
      <Sidebar setActiveContent={setActiveContent} />
      <div className="main-content ml-64 p-8">
        {renderContent()}
        <ToastContainer />
      </div>
    </div>
  );
};

export default SuperAdminDashboard;
