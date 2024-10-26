import React from 'react';

const TetSection = () => {
  return (
    <section className="tet-section container mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">Tết 2025</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg shadow-md p-4">
          <img src={"https://f1e425bd6cd9ac6.cmccloud.com.vn/cms-tool/post/images/313/img_card.png?v=27"} alt="Vé tàu Tết 2025" className="w-full h-48 object-cover rounded" />
          <h3 className="mt-2 text-lg font-semibold">Vé tàu Tết 2025</h3>
          <p className="text-gray-600">Lịch mở bán, giá vé tàu Tết Ất Tỵ</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-4">
          <img src={"https://f1e425bd6cd9ac6.cmccloud.com.vn/cms-tool/post/images/314/img_card.png?v=11"} alt="Vé máy bay Tết 2025" className="w-full h-48 object-cover rounded" />
          <h3 className="mt-2 text-lg font-semibold">Vé máy bay Tết 2025</h3>
          <p className="text-gray-600">Lịch mở bán, giá vé máy bay Tết Ất Tỵ</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-4">
          <img src={"https://f1e425bd6cd9ac6.cmccloud.com.vn/cms-tool/post/images/316/img_card.png"} alt="Lịch nghỉ Tết Dương lịch" className="w-full h-48 object-cover rounded" />
          <h3 className="mt-2 text-lg font-semibold">Lịch nghỉ Tết 2025</h3>
          <p className="text-gray-600">Thông báo lịch nghỉ Tết Dương lịch, Âm lịch 2025</p>
        </div>
      </div>
    </section>
  );
};

export default TetSection;
