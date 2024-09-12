import React from 'react';
import './Sidebar.css';

const Sidebar = ({ setActiveContent }) => {
  return (
    <div className="sidebar">
      <ul>
        <li onClick={() => setActiveContent('companies')}>Quản lý Nhà Xe</li>
        <li onClick={() => setActiveContent('admins')}>Quản lý Admin Nhà Xe</li>
        <li onClick={() => setActiveContent('users')}>Quản lý Người Dùng</li>
      </ul>
    </div>
  );
};

export default Sidebar;
