import React from 'react';
import styles from './Navbar.module.css';
import { Link } from 'react-router-dom';
import logo from '../../../assets/logo.webp';

const Navbar = () => {
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
          <Link to="/login" className={styles.btnLogin}>Đăng nhập/Đăng ký</Link>
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
      </nav>
    </header>
  );
};

export default React.memo(Navbar);
