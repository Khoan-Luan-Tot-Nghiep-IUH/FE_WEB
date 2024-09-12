
import React from 'react';
import './Sidebar.css';
import { FaBuilding, FaUserShield, FaUsers } from 'react-icons/fa';

const Sidebar = ({ setActiveContent }) => {
  return (
    <div className="sidebar">
      <ul>
        <li onClick={() => setActiveContent('companies')} className="sidebar-item">
          <FaBuilding /> Quản lý Nhà Xe
        </li>
        <li onClick={() => setActiveContent('admins')} className="sidebar-item">
          <FaUserShield /> Quản lý Admin Nhà Xe
        </li>
        <li onClick={() => setActiveContent('users')} className="sidebar-item">
          <FaUsers /> Quản lý Người Dùng
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
