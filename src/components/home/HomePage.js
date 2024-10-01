import React from 'react';
import Navbar from '../shared/navbar/Navbar';
import Footer from '../shared/footer/Footer';
import MainSection from './MainSection/MainSection';
import PopularRoutesSection from './components/PopularRoutesSection';
import PromotionsSection from './components/PromotionsSection';

const HomePage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <MainSection />
      <div className="container mx-auto mt-8">
        <PopularRoutesSection />
      </div>
      <div className="container mx-auto mt-8">
        <PromotionsSection />
      </div>
      <Footer />
    </div>
  );
};

export default React.memo(HomePage);
