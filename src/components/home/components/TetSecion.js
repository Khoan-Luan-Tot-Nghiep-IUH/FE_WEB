import React from 'react';

const TetSection = () => {
  const tetItems = [
    {
      image: 'https://res.cloudinary.com/dehx2ayxv/image/upload/v1734080133/tet_w4s0nb.jpg',
      title: 'Có VeXeOnline, đón Tết không lo',
      description: 'Tận hưởng chuyến đi Tết dễ dàng với VeXeOnline.',
    },
    {
      image: 'https://res.cloudinary.com/dehx2ayxv/image/upload/v1734080212/sale-tet-2023-tai-alofone-shop_wqqonn.jpg',
      title: 'Ưu đãi vé Tết sớm - Giảm đến 100k',
      description: 'Nhập mã VETETSOM100 để nhận ưu đãi cho khách hàng mới.',
    },
    {
      image: 'https://res.cloudinary.com/dehx2ayxv/image/upload/v1734080133/tet_w4s0nb.jpg',
      title: 'Ưu đãi vé Tết sớm - Giảm 10%',
      description: 'Nhập mã VETETSOM25 áp dụng cho tất cả khách hàng.',
    },
    {
      image: 'https://res.cloudinary.com/dehx2ayxv/image/upload/v1734080528/chuong-trinh-khuyen-mai-tet-2_pklo03.jpg',
      title: 'Xem ngay lịch nghỉ Tết 2025',
      description: 'Thông tin chi tiết lịch nghỉ Tết Dương lịch và Âm lịch 2025.',
    },
    {
      image: 'https://res.cloudinary.com/dehx2ayxv/image/upload/v1734080212/sale-tet-2023-tai-alofone-shop_wqqonn.jpg',
      title: 'Lịch tàu Tết 2025',
      description: 'Xem ngay lịch bán vé tàu Tết 2025.',
    },
  ];

  return (
    <section className="tet-section mt-12 px-4 md:px-6">
      <h2 className="text-3xl font-extrabold text-center text-red-600 mb-8">
        Tết 2025
      </h2>
      <div className="flex overflow-x-auto space-x-4 pb-4 hide-scroll-bar">
        {tetItems.map((item, index) => (
          <div
            key={index}
            className="flex-none w-80 bg-white border rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300"
          >
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-40 object-cover rounded-t-lg"
            />
            <div className="p-4">
              <h3 className="text-lg font-bold text-gray-800 mb-2">
                {item.title}
              </h3>
              <p className="text-sm text-gray-600">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TetSection;
