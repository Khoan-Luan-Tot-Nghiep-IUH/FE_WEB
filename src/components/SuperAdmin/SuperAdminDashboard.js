import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Sidebar from '../shared/SideBar/SideBar';
import ManageCompanies from './navSideBar/ManageCompanies';
import ManageAdmins from './navSideBar/ManageAdmins';
import ManageUsers from './navSideBar/ManageUsers';
import './SuperAdminDashboard.css';

const SuperAdminDashboard = () => {
  const [activeContent, setActiveContent] = useState(null);

  const notify = () => {
    toast.success("Chào mừng bạn đến với hệ thống!", {
      autoClose: 3000, // Đóng sau 3 giây
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const renderContent = () => {
    switch (activeContent) {
      case 'companies':
        return <ManageCompanies />;
      case 'admins':
        return <ManageAdmins />;
      case 'users':
        return <ManageUsers />;
      default:
        notify();
        return (
          <div style={{ color: 'red', fontWeight: 'bold', fontSize: '32px', textAlign: 'center' }}>
            CHÀO MỪNG BẠN ĐẾN TRANG QUẢN LÍ HỆ THỐNG
          </div>
        );
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
