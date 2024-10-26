import React from 'react';
import { FaBus, FaTicketAlt, FaCheckCircle, FaTags } from 'react-icons/fa';

const PlatformSection = () => {
  return (
    <section className="platform-section container mx-auto mt-8 px-4 md:px-0">
      <h2 className="text-2xl font-bold text-center mb-6">Nền tảng kết nối người dùng và nhà xe</h2>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
        <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center text-center">
          <FaBus className="text-blue-500 text-4xl mb-3" />
          <h3 className="font-semibold text-lg text-gray-800 mb-2">2000+ nhà xe chất lượng cao</h3>
          <p className="text-gray-600">5000+ tuyến đường trên toàn quốc, chủ động và đa dạng lựa chọn.</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center text-center">
          <FaTicketAlt className="text-yellow-500 text-4xl mb-3" />
          <h3 className="font-semibold text-lg text-gray-800 mb-2">Đặt vé dễ dàng</h3>
          <p className="text-gray-600">Đặt vé chỉ với 60s. Chọn xe yêu thích cực nhanh và thuận tiện.</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center text-center">
          <FaCheckCircle className="text-green-500 text-4xl mb-3" />
          <h3 className="font-semibold text-lg text-gray-800 mb-2">Chắc chắn có chỗ</h3>
          <p className="text-gray-600">Hoàn ngay 150% nếu nhà xe không cung cấp dịch vụ vận chuyển.</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center text-center">
          <FaTags className="text-red-500 text-4xl mb-3" />
          <h3 className="font-semibold text-lg text-gray-800 mb-2">Nhiều ưu đãi</h3>
          <p className="text-gray-600">Hàng ngàn ưu đãi cực chất độc quyền tại Vé Xe Online.</p>
        </div>
      </div>

      <h2 className="text-2xl font-bold text-center mb-6">Vé Xe Online hi vọng sẽ được phát triển với</h2>
      <div className="flex justify-center space-x-8 mb-10">
        <img src="https://229a2c9fe669f7b.cmccloud.com.vn/images/logo-baochi/logo-vne.png" alt="VnExpress" className="h-10" />
        <img src="https://229a2c9fe669f7b.cmccloud.com.vn/images/logo-baochi/logo-vtv.png" alt="VTV" className="h-10" />
        <img src="https://229a2c9fe669f7b.cmccloud.com.vn/images/logo-baochi/logo-dantri.png" alt="Dan Tri" className="h-10" />
        <img src="https://229a2c9fe669f7b.cmccloud.com.vn/images/logo-baochi/logo-tuoitre.png" alt="Tuoi Tre" className="h-10" />
      </div>
    </section>
  );
};

export default PlatformSection;
