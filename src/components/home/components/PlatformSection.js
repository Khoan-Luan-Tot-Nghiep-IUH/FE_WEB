import React from 'react';
import { FaBus, FaTicketAlt, FaCheckCircle, FaTags } from 'react-icons/fa';

const PlatformSection = () => {
  return (
    <section className="platform-section container mx-auto mt-12 px-4 md:px-6">
      <h2 className="text-3xl font-arial text-center text-gray-800 mb-12">
        Nền tảng kết nối người dùng và nhà xe
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
        <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl shadow-xl p-8 flex flex-col items-center text-center transform hover:scale-105 transition duration-300">
          <FaBus className="text-white text-6xl mb-4" />
          <h3 className="font-bold text-xl text-white mb-3">
            2000+ nhà xe chất lượng cao
          </h3>
          <p className="text-white">
            5000+ tuyến đường trên toàn quốc, chủ động và đa dạng lựa chọn.
          </p>
        </div>
        <div className="bg-gradient-to-br from-yellow-400 to-orange-500 rounded-xl shadow-xl p-8 flex flex-col items-center text-center transform hover:scale-105 transition duration-300">
          <FaTicketAlt className="text-white text-6xl mb-4" />
          <h3 className="font-bold text-xl text-white mb-3">
            Đặt vé dễ dàng
          </h3>
          <p className="text-white">
            Đặt vé chỉ với 60s. Chọn xe yêu thích cực nhanh và thuận tiện.
          </p>
        </div>
        <div className="bg-gradient-to-br from-green-400 to-teal-500 rounded-xl shadow-xl p-8 flex flex-col items-center text-center transform hover:scale-105 transition duration-300">
          <FaCheckCircle className="text-white text-6xl mb-4" />
          <h3 className="font-bold text-xl text-white mb-3">
            Chắc chắn có chỗ
          </h3>
          <p className="text-white">
            Hoàn ngay 150% nếu nhà xe không cung cấp dịch vụ vận chuyển.
          </p>
        </div>
        <div className="bg-gradient-to-br from-pink-500 to-red-500 rounded-xl shadow-xl p-8 flex flex-col items-center text-center transform hover:scale-105 transition duration-300">
          <FaTags className="text-white text-6xl mb-4" />
          <h3 className="font-bold text-xl text-white mb-3">
            Nhiều ưu đãi
          </h3>
          <p className="text-white">
            Hàng ngàn ưu đãi cực chất độc quyền tại Vé Xe Online.
          </p>
        </div>
      </div>

      <h2 className="text-3xl font-arial text-center text-gray-800 mb-12">
        Vé Xe Online hi vọng sẽ được phát triển với
      </h2>
      <div className="flex flex-wrap justify-center items-center space-x-6 space-y-4 md:space-y-0 mb-16">
        <img
          src="https://229a2c9fe669f7b.cmccloud.com.vn/images/logo-baochi/logo-vne.png"
          alt="VnExpress"
          className="h-12 object-contain"
        />
        <img
          src="https://229a2c9fe669f7b.cmccloud.com.vn/images/logo-baochi/logo-vtv.png"
          alt="VTV"
          className="h-12 object-contain"
        />
        <img
          src="https://229a2c9fe669f7b.cmccloud.com.vn/images/logo-baochi/logo-dantri.png"
          alt="Dân Trí"
          className="h-12 object-contain"
        />
        <img
          src="https://229a2c9fe669f7b.cmccloud.com.vn/images/logo-baochi/logo-tuoitre.png"
          alt="Tuổi Trẻ"
          className="h-12 object-contain"
        />
      </div>
    </section>
  );
};

export default PlatformSection;
