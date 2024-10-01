import React from 'react';
import PromotionCard from './PromotionCard';

const PromotionsSection = () => {
  const promotions = [
    { image: 'https://f1e425bd6cd9ac6.cmccloud.com.vn/cms-tool/post/images/163/img_card.png?v=150', title: 'Thứ 3 hàng tuần - Flash Sale', description: 'Giảm đến 50%' },
    { image: 'https://f1e425bd6cd9ac6.cmccloud.com.vn/cms-tool/post/images/163/img_card.png?v=150', title: 'Say Hi Bạn Mới', description: 'Giảm đến 25%' },
    { image: 'https://f1e425bd6cd9ac6.cmccloud.com.vn/cms-tool/post/images/163/img_card.png?v=150', title: 'Giảm 20% khi đặt vé lần đầu', description: 'Áp dụng cho một số tuyến đường' },
  ];

  return (
    <section className="mt-8">
      <h2 className="text-2xl font-bold mb-4">Ưu đãi nổi bật</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {promotions.map((promo, index) => (
          <PromotionCard
            key={index}
            image={promo.image}
            title={promo.title}
            description={promo.description}
          />
        ))}
      </div>
    </section>
  );
};

export default PromotionsSection;