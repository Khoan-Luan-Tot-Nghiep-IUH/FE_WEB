import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Breadcrumbs = () => {
  const location = useLocation();

  const breadcrumbsMap = {
    '/user/profile': 'Thông tin tài khoản',
    '/user/membership': 'Thành viên Thường',
    '/user/ticket-buy': 'Đơn hàng của tôi',
    '/user/offers': 'Ưu đãi',
    '/user/cards': 'Quản lý thẻ',
    '/user/reviews': 'Nhận xét chuyến đi',
    '/logout': 'Đăng xuất',
  };

  const currentPath = location.pathname;
  const currentBreadcrumb = breadcrumbsMap[currentPath] || 'Thông tin tài khoản';

  return (
    <nav className="text-gray-600 text-sm mb-6">
      <Link to="/" className="text-blue-500">Trang chủ</Link>
      <span className="mx-2 text-gray-400">{'>'}</span>
      <span className="text-gray-700 font-semibold">{currentBreadcrumb}</span>
    </nav>
  );
};

export default Breadcrumbs;
