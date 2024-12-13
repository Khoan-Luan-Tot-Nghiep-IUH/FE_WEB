import React from 'react';

const MotorbikeRentalSection = () => {
  const rentals = [
    {
      image:
        'https://res.cloudinary.com/dehx2ayxv/image/upload/v1734079367/thuexe_ucxvqc.png',
      title: 'Thuê xe máy tại Đà Lạt',
      description: 'Chỉ từ 80K, giao xe tận nơi',
    },
    {
      image:
        'https://res.cloudinary.com/dehx2ayxv/image/upload/v1734079458/Thu%C3%AA_Xe_M%C3%A1y_Nha_Trang_azv3vp.jpg',
      title: 'Thuê xe máy tại Nha Trang',
      description: 'Chỉ từ 100K, giao xe tận nơi',
    },
    {
      image:
        'https://res.cloudinary.com/dehx2ayxv/image/upload/v1734079559/thue-xe-may-vung-tau-tripbike_de93hj.jpg',
      title: 'Thuê xe máy tại Vũng Tàu',
      description: 'Chỉ từ 110K, giao xe tận nơi',
    },
    {
      image:
        'https://res.cloudinary.com/dehx2ayxv/image/upload/v1734079670/Logo-Sieu-Toc-white-background_b8fy1b.webp',
      title: 'Thuê xe máy tại Hà Nội',
      description: 'Chỉ từ 100K, giao xe tận nơi',
    }, 
    {
      image:
        'https://res.cloudinary.com/dehx2ayxv/image/upload/v1734079945/pngtree-vintage-scooter-rental-fast-delivery-logo-designs-inspiration-png-image_12500131_erwnqe.png',
      title: 'Thuê xe máy tại Đà Nẵng',
      description: 'Chỉ từ 100K, giao xe tận nơi',
    },   
  ];

  return (
    <section className="motorbike-rental-section mt-12 px-4 md:px-6">
      <h2 className="text-3xl font-extrabold text-center text-rose-600 mb-12">
        Thuê Xe Máy
      </h2>
      <div className="relative">
        {/* Thay vì sử dụng grid ở md, ta giữ nguyên flex để trượt ngang */}
        <div className="flex overflow-x-auto space-x-6 pb-4 hide-scroll-bar">
          {rentals.map((rental, index) => (
            <div
              key={index}
              className="flex-none w-72 bg-gradient-to-br from-green-400 to-blue-500 rounded-xl shadow-lg overflow-hidden transform hover:scale-105 transition duration-300 cursor-pointer"
            >
              <img
                src={rental.image}
                alt={rental.title}
                className="w-full h-64 object-cover opacity-90"
              />
              <div className="p-6">
                <h3 className="text-2xl font-bold text-white mb-2">
                  {rental.title}
                </h3>
                <p className="text-white">{rental.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Left Gradient (nếu cần, có thể thêm gradient hoặc xóa đi nếu không muốn) */}
        <div className="absolute left-0 top-0 h-full w-8 pointer-events-none bg-gradient-to-r from-white md:hidden"></div>
        {/* Right Gradient */}
        <div className="absolute right-0 top-0 h-full w-8 pointer-events-none bg-gradient-to-l from-white md:hidden"></div>
      </div>
    </section>
  );
};

export default MotorbikeRentalSection;
