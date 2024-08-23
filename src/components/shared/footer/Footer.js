import React from 'react';
import styles from './Footer.module.css';
// import chplayIcon from '../../../assets/chplay.png'; // Thay thế đường dẫn icon tương ứng
// import appStoreIcon from '../../../assets/appstore.png'; // Thay thế đường dẫn icon tương ứng
// import logoFuta from '../../../assets/logo-futa.png'; // Thay thế đường dẫn logo tương ứng
// import logoFutaExpress from '../../../assets/logo-futa-express.png'; // Thay thế đường dẫn logo tương ứng
// import logoFutaAdvertising from '../../../assets/logo-futa-advertising.png'; // Thay thế đường dẫn logo tương ứng
// import logoPhucLoc from '../../../assets/logo-phucloc.png'; // Thay thế đường dẫn logo tương ứng

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.contactInfo}>
          <h3>TRUNG TÂM TỔNG ĐÀI & CSKH</h3>
          <h2>1900 6067</h2>
          <p>CÔNG TY CỔ PHẦN XE KHÁCH PHƯƠNG TRANG - FUTA BUS LINES</p>
          <p>Địa chỉ: Số 01 Tô Hiến Thành, Phường 3, Thành phố Đà Lạt, Tỉnh Lâm Đồng, Việt Nam.</p>
          <p>Email: <a href="mailto:hotro@futa.vn">hotro@futa.vn</a></p>
          <p>Điện thoại: 02838386852</p>
          <p>Fax: 02838386853</p>
        </div>

        <div className={styles.appLinks}>
          <h4>TẢI APP FUTA</h4>
          <div className={styles.downloadIcons}>
            <img src={1} alt="CH Play" />
            <img src={1} alt="App Store" />
          </div>
        </div>

        <div className={styles.footerLinks}>
          <div className={styles.footerCol}>
            <h4>FUTA Bus Lines</h4>
            <ul>
              <li><a href="/">Về chúng tôi</a></li>
              <li><a href="/">Lịch trình</a></li>
              <li><a href="/">Tuyển dụng</a></li>
              <li><a href="/">Tin tức & Sự kiện</a></li>
              <li><a href="/">Mạng lưới văn phòng</a></li>
            </ul>
          </div>
          <div className={styles.footerCol}>
            <h4>Hỗ trợ</h4>
            <ul>
              <li><a href="/">Tra cứu thông tin đặt vé</a></li>
              <li><a href="/">Điều khoản sử dụng</a></li>
              <li><a href="/">Câu hỏi thường gặp</a></li>
              <li><a href="/">Hướng dẫn đặt vé trên Web</a></li>
              <li><a href="/">Hướng dẫn nạp tiền trên App</a></li>
            </ul>
          </div>
        </div>

        <div className={styles.footerLogos}>
          <img src={1} alt="FUTA Bus Lines" />
          <img src={1} alt="FUTA Express" />
          <img src={1} alt="FUTA Advertising" />
          <img src={1} alt="Phúc Lộc Rest Stop" />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
