import React from 'react';

const PromotionsSection = () => {
  const promotions = [
    {
      image:
        'https://f1e425bd6cd9ac6.cmccloud.com.vn/cms-tool/post/images/163/img_card.png?v=150',
      title: 'Thứ 3 hàng tuần - Flash Sale',
      description: 'Giảm đến 50%',
    },
    {
      image:
        'https://f1e425bd6cd9ac6.cmccloud.com.vn/cms-tool/post/images/164/img_card.png?v=150',
      title: 'Say Hi Bạn Mới',
      description: 'Giảm đến 25%',
    },
    {
      image:
        'https://f1e425bd6cd9ac6.cmccloud.com.vn/cms-tool/post/images/165/img_card.png?v=150',
      title: 'Giảm 20% khi đặt vé lần đầu',
      description: 'Áp dụng cho một số tuyến đường',
    },
    // Bạn có thể thêm nhiều mục khác nếu cần
  ];

  return (
    <section className="mt-12 px-4 md:px-6">
      <h2 className="text-3xl font-extrabold text-rose-600  text-center mb-12">
        Ưu Đãi Nổi Bật
      </h2>
      <div className="relative">
        <div className="flex overflow-x-auto md:grid md:grid-cols-3 md:gap-8 space-x-6 md:space-x-0 hide-scroll-bar pb-4">
          {promotions.map((promo, index) => (
            <div
              key={index}
              className="flex-none w-72 md:w-auto rounded-xl shadow-lg overflow-hidden transform hover:scale-105 transition duration-300 cursor-pointer"
            >
              <img
                src={promo.image}
                alt={promo.title}
                className="w-full h-64 object-cover opacity-90"
              />
              <div className="p-6">
                <h3 className="text-2xl font-bold  mb-2">
                  {promo.title}
                </h3>
                <p className="font-normal">{promo.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="absolute left-0 top-0 h-full w-8 pointer-events-none md:hidden"></div>
        <div className="absolute right-0 top-0 h-full w-8  pointer-events-none md:hidden"></div>
      </div>
    </section>
  );
};

export default PromotionsSection;
