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
import Location from './navSideBar/Location';

const SuperAdminDashboard = () => {
  const [activeContent, setActiveContent] = useState('default');
  const [collapsed, setCollapsed] = useState(false); // Trạng thái Sidebar thu nhỏ/mở rộng

  useEffect(() => {
    notify();
  }, []);

  // Thông báo chào mừng
  const notify = () => {
    toast.success("Chào mừng bạn đến với hệ thống!", {
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      position: 'top-right' // Đặt vị trí thông báo cho dễ nhìn
    });
  };

  // Render nội dung chính theo từng lựa chọn
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
      case 'Location':
        return <Location/>
      case 'settings':
        return <Settings />;
      case 'reports':
        return <div>Báo cáo Content</div>;
      default:
        return null;
    }
  };

  return (
    <div className="super-admin-dashboard flex">
      <Sidebar setActiveContent={setActiveContent} collapsed={collapsed} setCollapsed={setCollapsed} />
      <div className={`main-content transition-all duration-300 ${collapsed ? 'ml-16' : 'ml-64'} p-8`}>
        {renderContent()}
      </div>
      <ToastContainer />
    </div>
  );
};

export default SuperAdminDashboard;
