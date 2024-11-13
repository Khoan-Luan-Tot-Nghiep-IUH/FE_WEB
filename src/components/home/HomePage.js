import React from 'react';
import Navbar from '../shared/navbar/Navbar';
import Footer from '../shared/footer/Footer';
import MainSection from './MainSection/MainSection';
import PopularRoutesSection from './components/PopularRoutesSection';
import PromotionsSection from './components/PromotionsSection';
import TetSection from './components/TetSecion';
import MotorbikeRentalSection from './components/MotorbikeRentalSection';
import CustomerTestimonialsSection from './components/CustomerTestimonialsSection';
import banner from '../../assets/Banner.png';
import PlatformSection from './components/PlatformSection';

const HomePage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      {/* Banner Section - Hidden on small screens */}
      <section className="relative h-[500px] hidden md:block">
        <img src={banner} alt="Banner" className="w-full h-full object-cover" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-6xl px-4">
          <MainSection />
        </div>
      </section>

      {/* MainSection with adjusted margin-top on small screens */}
      <div className={`container mx-auto ${window.innerWidth < 768 ? "mt-20" : "mt-8"}`}>
        {window.innerWidth < 768 && <MainSection />}
      </div>

      {/* Sections */}
      <div className="container mx-auto mt-8">
        <PopularRoutesSection />
      </div>
      <div className="container mx-auto mt-8">
        <TetSection />
      </div>
      <div className="container mx-auto mt-8">
        <PromotionsSection />
      </div>
      <div className="container mx-auto mt-8">
        <MotorbikeRentalSection />
      </div>
      <div className="container mx-auto mt-8">
        <CustomerTestimonialsSection />
      </div>
      <div className="container mx-auto mt-8">
        <PlatformSection />
      </div>

      <Footer />
    </div>
  );
};

export default React.memo(HomePage);
