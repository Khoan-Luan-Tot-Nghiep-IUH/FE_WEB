import React from 'react';
import styles from './HomePage.module.css'; // Sử dụng CSS Modules
import Navbar from '../shared/navbar/Navbar'; // Đảm bảo đường dẫn và tên component là chính xác
import banner from '../../assets/Banner.png';
import Footer from '../shared/footer/Footer';
import BookingForm from '../Form/Booking/BookingForm';

const HomePage = () => {
  return (
    <div className={styles.homepage}>
      <Navbar />
      <section className={styles.heroSection}>
        <img src={banner} alt="Banner" className={styles.heroBanner} />
      </section>
      <section className={styles.bookingSection}>
        <BookingForm/>
      </section>
      <Footer/>
    </div>
  );
};

export default React.memo(HomePage);