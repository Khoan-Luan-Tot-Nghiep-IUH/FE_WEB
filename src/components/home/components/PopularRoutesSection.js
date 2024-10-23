import React, { useState } from 'react';
import RouteCard from './RouteCard';

const PopularRoutesSection = () => {
  const routes = [
    { 
      image: 'https://f1e425bd6cd9ac6.cmccloud.com.vn/cms-tool/destination/images/5/img_hero.png?v1', 
      title: 'Thành Phố Hồ Chí Minh - Đà Lạt', 
      price: 'Từ 200.000đ', 
      from: 'Thành Phố Hồ Chí Minh', 
      to: 'Đà Lạt'     
    },
    { 
      image: 'https://f1e425bd6cd9ac6.cmccloud.com.vn/cms-tool/destination/images/24/img_hero.png', 
      title: 'Đồng Nai - Đà Lạt', 
      price: 'Từ 100.000đ',
      from: 'Đồng Nai',
      to: 'Đà Lạt'
    },
    { 
      image: 'https://f1e425bd6cd9ac6.cmccloud.com.vn/cms-tool/destination/images/3/img_hero.png', 
      title: 'Hà Nội - Đà Lạt', 
      price: 'Từ 200.000đ', 
      from: 'Hà Nội', 
      to: 'Đà Lạt'     
    },
    { 
      image: 'https://f1e425bd6cd9ac6.cmccloud.com.vn/cms-tool/destination/images/22/img_hero.png', 
      title: 'Đồng Nai - Thành Phố Hồ Chí Minh', 
      price: 'Từ 80.000đ', 
      from: 'Đồng Nai', 
      to: 'Thành Phố Hồ Chí Minh'     
    },
    { 
      image: 'https://f1e425bd6cd9ac6.cmccloud.com.vn/cms-tool/destination/images/25/img_hero.png', 
      title: 'Đồng Nai - Hà Nội', 
      price: 'Từ 700.000đ', 
      from: 'Đồng Nai', 
      to: 'Hà Nội'     
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const visibleRoutesCount = 4;

  const handleNext = () => {
    if (currentIndex + visibleRoutesCount < routes.length) {
      setCurrentIndex(currentIndex + 1); 
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1); 
    }
  };

  return (
    <section className="mt-8">
      <h2 className="text-2xl font-bold mb-4">Tuyến đường phổ biến</h2>

      <div className="relative">
        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {routes.slice(currentIndex, currentIndex + visibleRoutesCount).map((route, index) => (
            <RouteCard
              key={index}
              image={route.image}
              title={route.title}
              price={route.price}
              from={route.from}
              to={route.to}    
            />
          ))}
        </div>
        {currentIndex > 0 && (
          <button
            className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-300 hover:bg-gray-400 text-white px-4 py-2 rounded-full shadow-md"
            onClick={handlePrev}
          >
            Prev
          </button>
        )}
        {currentIndex + visibleRoutesCount < routes.length && (
          <button
            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-300 hover:bg-gray-400 text-white px-4 py-2 rounded-full shadow-md"
            onClick={handleNext}
          >
            Next    
          </button>
        )}
      </div>
    </section>
  );
};

export default PopularRoutesSection;
