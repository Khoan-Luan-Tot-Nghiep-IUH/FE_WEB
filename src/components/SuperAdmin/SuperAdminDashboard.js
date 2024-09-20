import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Sidebar from './SideBar/Sidebar';
import ManageCompanies from './navSideBar/ManageCompanies';
import ManageAdmins from './navSideBar/ManageAdmins';
import ManageUsers from './navSideBar/ManageUsers';
import './SuperAdminDashboard.css';

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
          <div style={{ color: 'red', fontWeight: 'bold', fontSize: '32px', textAlign: 'center' }}>
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
        return <div>Thống kê Content</div>; // Placeholder for statistics
      case 'logs':
        return <div>Nhật ký hoạt động Content</div>; // Placeholder for logs
      case 'settings':
        return <div>Cài đặt Content</div>; // Placeholder for settings
      case 'reports':
        return <div>Báo cáo Content</div>; // Placeholder for reports
      default:
        return null;
    }
  };

  return (
    <div className="super-admin-dashboard">
      <Sidebar setActiveContent={setActiveContent} />
      <div className="main-content">
        {renderContent()}
        <ToastContainer />
      </div>
    </div>
  );
};

export default SuperAdminDashboard;
