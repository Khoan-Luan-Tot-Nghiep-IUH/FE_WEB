import React from 'react';
import styles from './Navbar.module.css';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import logo from '../../../assets/logo.webp';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../../Redux/User/userSlice';

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const userInfo = useSelector((state) => state.user.userInfo);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  const handleLoginClick = (e) => {
    e.preventDefault();
    navigate('/login', { state: { from: location } });
  };

  return (
    <header className={styles.navbar}>
      <div className={styles.navbarContainer}>
        <div className={styles.navbarLeft}>
          <select className={styles.languageSelect}>
            <option value="vi">VI</option>
            <option value="en">EN</option>
          </select>
          <button className={styles.downloadApp}>Tải ứng dụng</button>
        </div>
        <div className={styles.navbarMiddle}>
          <Link to="/">
            <img src={logo} alt="Logo" className={styles.logo} />
          </Link>
        </div>
        <div className={styles.navbarRight}>
          {userInfo ? (
            <>
              <span>Welcome, {userInfo.fullName}!</span>
              <button onClick={handleLogout} className={styles.btnLogout}>Logout</button>
            </>
          ) : (
            <a href="/login" onClick={handleLoginClick} className={styles.btnLogin}>Đăng nhập/Đăng ký</a>
          )}
        </div>
      </div>
      <nav className={styles.navLinks}>
        <Link to="/">Trang chủ</Link>
        <Link to="/lich-trinh">Lịch trình</Link>
        <Link to="/tra-cuu-ve">Tra cứu vé</Link>
        <Link to="/tin-tuc">Tin tức</Link>
        <Link to="/hoa-don">Hóa đơn</Link>
        <Link to="/lien-he">Liên hệ</Link>
        <Link to="/ve-chung-toi">Về chúng tôi</Link>
        
        {/* Links theo role */}
        {userInfo && userInfo.roleId === 'superadmin' && (
          <>
            <Link to="/superadmin/dashboard">Quản lý hệ thống</Link>
            <Link to="/company/dashboard">Quản lý nhà xe</Link>
          </>
        )}

        {userInfo && userInfo.roleId === 'companyadmin' && (
          <>
            <Link to="/company/dashboard">Quản lý nhà xe</Link>
            <Link to="/company/manage-trips">Quản lý chuyến đi</Link>
          </>
        )}

        {userInfo && userInfo.roleId === 'staff' && (
          <>
            <Link to="/staff/dashboard">Trang quản lý nhân viên</Link>
            <Link to="/staff/support">Hỗ trợ khách hàng</Link>
          </>
        )}

        {userInfo && userInfo.roleId === 'user' && (
          <>
            <Link to="/user/profile">Thông tin cá nhân</Link>
            <Link to="/user/bookings">Lịch sử đặt vé</Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default React.memo(Navbar);
