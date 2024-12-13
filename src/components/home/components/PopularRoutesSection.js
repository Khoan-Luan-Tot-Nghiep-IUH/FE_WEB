import React from 'react';
import RouteCard from './RouteCard';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const PopularRoutesSection = () => {
  const routes = [
    {
      image: 'https://f1e425bd6cd9ac6.cmccloud.com.vn/cms-tool/destination/images/5/img_hero.png?v1',
      title: 'Thành Phố Hồ Chí   - Đà Lạt',
      price: 'Từ 300.000đ',
      from: 'Thành Phố Hồ Chí Minh',
      to: 'Đà Lạt',
    },
    {
      image: 'https://f1e425bd6cd9ac6.cmccloud.com.vn/cms-tool/destination/images/24/img_hero.png',
      title: 'Đồng Nai - Đà Lạt',
      price: 'Từ 200.000đ',
      from: 'Đồng Nai',
      to: 'Đà Lạt',
    },
    {
      image: 'https://f1e425bd6cd9ac6.cmccloud.com.vn/cms-tool/destination/images/3/img_hero.png',
      title: 'Hà Nội - Đà Lạt',
      price: 'Từ 700.000đ',
      from: 'Hà Nội',
      to: 'Đà Lạt',
    },
    {
      image: 'https://f1e425bd6cd9ac6.cmccloud.com.vn/cms-tool/destination/images/22/img_hero.png',
      title: 'Thành Phố Hồ Chí Minh - Đà Nẵng',
      price: 'Từ 500.000đ',
      from: 'Thành Phố Hồ Chí Minh',
      to: 'Đà Nẵng',
    },
    {
      image: 'https://f1e425bd6cd9ac6.cmccloud.com.vn/cms-tool/destination/images/22/img_hero.png',
      title: 'Đồng Nai - Thành Phố Hồ Chí Minh',
      price: 'Từ 100.000đ',
      from: 'Đồng Nai',
      to: 'Thành Phố Hồ Chí Minh',
    },
    {
      image: 'https://f1e425bd6cd9ac6.cmccloud.com.vn/cms-tool/destination/images/25/img_hero.png',
      title: 'Đồng Nai - Hà Nội',
      price: 'Từ 999.000đ',
      from: 'Đồng Nai',
      to: 'Hà Nội',
    },
    {
      image: 'https://f1e425bd6cd9ac6.cmccloud.com.vn/cms-tool/destination/images/22/img_hero.png',
      title: 'Đồng Nai - Đà Nẵng',
      price: 'Từ 600.000đ',
      from: 'Đồng Nai',
      to: 'Đà Nẵng',
    },
  ];

  return (
    <section className="mt-12">
      <h2 className="text-3xl font-extrabold text-center text-rose-600 mb-12">
        Tuyến Đường Phổ Biến
      </h2>

      <div className="relative">
        <div className="flex overflow-x-auto space-x-6 hide-scroll-bar">
          {routes.map((route, index) => (
            <div key={index} className="flex-none w-72">
              <RouteCard
                image={route.image}
                title={route.title}
                price={route.price}
                from={route.from}
                to={route.to}
              />
            </div>
          ))}
        </div>

        <div className="absolute left-0 top-0 h-full w-12  pointer-events-none"></div>
        <div className="absolute right-0 top-0 h-full w-12  pointer-events-none"></div>
        <button
          className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white hover:bg-gray-100 text-gray-700 p-2 rounded-full shadow-md"
          onClick={() => {
            document.querySelector('.hide-scroll-bar').scrollBy({
              left: -300,
              behavior: 'smooth',
            });
          }}
        >
          <FaChevronLeft size={20} />
        </button>

        {/* Next Button */}
        <button
          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white hover:bg-gray-100 text-gray-700 p-2 rounded-full shadow-md"
          onClick={() => {
            document.querySelector('.hide-scroll-bar').scrollBy({
              left: 300,
              behavior: 'smooth',
            });
          }}
        >
          <FaChevronRight size={20} />
        </button>
      </div>
    </section>
  );
};

export default PopularRoutesSection;
