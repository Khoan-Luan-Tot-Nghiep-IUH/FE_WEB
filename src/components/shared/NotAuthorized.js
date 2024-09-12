import React from 'react';

const NotAuthorized = () => {
  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>403 - Không có quyền truy cập</h1>
      <p>Bạn không có quyền truy cập vào trang này.</p>
      <a href="/">Quay về trang chủ</a>
    </div>
  );
};

export default NotAuthorized;
