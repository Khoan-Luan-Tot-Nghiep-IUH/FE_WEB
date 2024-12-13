const BenefitCard = ({ icon, title, description }) => (
    <div className="bg-white shadow-md rounded-lg p-6 text-center">
      <div className="text-5xl text-blue-600 mb-4">{icon}</div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
  
  const BenefitsSection = () => (
    <div className="py-16 bg-gray-100">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">
          Lợi ích khi mở bán vé tại VeXeOnline
        </h2>
        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Hàng đầu tiên với 3 thẻ */}
          <BenefitCard
            icon="📈"
            title="Tăng trưởng 30% doanh thu"
            description="VeXeOnline là một giải pháp toàn diện để bán được nhiều vé trong thời gian ngắn nhờ kênh bán vé với 5000+ đại lý trong và ngoài nước. Việc tiếp cận nhanh chóng và dễ dàng tới hàng triệu khách hàng, và là thương hiệu đáng tin cậy nhất cho việc đặt vé xe khách trực tuyến, Vexere có thể giúp các công ty xe khách bán vé nhanh chóng và tăng trưởng doanh thu."
          />
          <BenefitCard
            icon="🛠️"
            title="Cung cấp đầy đủ công cụ giúp nhà xe tăng doanh thu bán vé qua sàn"
            description="VeXeOnline cung cấp công cụ giúp tăng lượng truy cập vào gian hàng của nhà xe trên sàn, hỗ trợ nâng cao chất lượng khách mua vé nhờ đánh giá từ công cụ, chương trình ưu đãi như đặt chỗ nhanh, xác thực khách hàng, vé ưu tiên,..."
          />
          <BenefitCard
            icon="⚖️"
            title="Đảm bảo công bằng cho tất cả các nhà xe"
            description="VeXeOnline có thuật toán sắp xếp thứ tự hiển thị của nhà xe dành cho khách trên các tuyến đường dựa vào các tiêu chí như chất lượng dịch vụ, chính sách huy hiệu,..."
          />
        </div>
        {/* Hàng thứ hai với 2 thẻ, căn giữa */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 justify-center">
          <BenefitCard
            icon="🤝"
            title="Đồng hành trên hành trình thành công của nhà xe"
            description="Với VeXeOnline, thành công của nhà xe là thành công của chúng tôi. Chúng tôi không chỉ cung cấp các công cụ hỗ trợ mà còn luôn đồng hành trên từng tuyến đường."
          />
          <BenefitCard
            icon="🌟"
            title="Chương trình độc quyền từ VeXeOnline"
            description="Nhà xe của bạn sẽ tận hưởng lợi ích truyền thông từ VeXeOnline lên đến 50 triệu người dùng, ưu tiên trong các chiến lược kinh doanh."
          />
        </div>
      </div>
    </div>
  );
  
  export default BenefitsSection;
  
  