import React from 'react';
import './Sidebar.css'; // Thêm CSS để tùy chỉnh giao diện
import { FaHome, FaChartBar, FaClipboardList } from 'react-icons/fa'; // Sử dụng icon

const Sidebar = ({ setActiveContent }) => {
  const handleNavigation = (content) => {
    setActiveContent(content);
  };

  return (
    <div className="sidebar">
      <h2 className="sidebar-title">Quản lý Hệ thống</h2>
      <ul className="sidebar-menu">
        <li onClick={() => handleNavigation('default')} className="sidebar-item">
          <FaHome /> Trang chủ
        </li>
        <li onClick={() => handleNavigation('companies')} className="sidebar-item">
          <FaClipboardList /> Quản lý Công ty
        </li>
        <li onClick={() => handleNavigation('admins')} className="sidebar-item">
          <FaClipboardList /> Quản lý Admin
        </li>
        <li onClick={() => handleNavigation('users')} className="sidebar-item">
          <FaClipboardList /> Quản lý Người dùng
        </li>
        <li onClick={() => handleNavigation('statistics')} className="sidebar-item">
          <FaChartBar /> Thống kê
        </li>
        <li onClick={() => handleNavigation('logs')} className="sidebar-item">
          <FaClipboardList /> Nhật ký hoạt động
        </li>
        <li onClick={() => handleNavigation('settings')} className="sidebar-item">
          <FaClipboardList /> Cài đặt
        </li>
        <li onClick={() => handleNavigation('reports')} className="sidebar-item">
          <FaClipboardList /> Báo cáo
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
