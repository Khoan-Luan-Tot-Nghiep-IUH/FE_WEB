import React from 'react';

const CustomerTestimonialsSection = () => {
  return (
    <section className="customer-testimonials-section container mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">Khách hàng nói gì về Vé Xe Online</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white rounded-lg shadow-md p-4 flex">
          <img
            src="https://229a2c9fe669f7b.cmccloud.com.vn/images/testimonial-quynh.jpg"
            alt="Anh Nguyễn Tuấn Quỳnh"
            className="w-24 h-24 rounded-full object-cover mr-4"
          />
          <div>
            <h3 className="text-lg font-semibold text-blue-600">Anh Nguyễn Tuấn Quỳnh</h3>
            <p className="text-gray-600 mb-2">CEO Saigon Books</p>
            <p className="text-gray-600">
              Lần trước tôi có việc gấp phải đi công tác, lên mạng tìm đặt vé xe thì tình cờ tìm thấy Vé Xe Onine. Sau khi tham khảo, tôi quyết định đặt vé và thanh toán. Công nhận rất tiện và nhanh chóng...
            </p>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-md p-4 flex">
          <img
            src="https://229a2c9fe669f7b.cmccloud.com.vn/images/testimonial-phi.jpg"
            alt="Shark Phi"
            className="w-24 h-24 rounded-full object-cover mr-4"
          />
          <div>
            <h3 className="text-lg font-semibold text-blue-600">Shark Phi</h3>
            <p className="text-gray-600 mb-2">Giám đốc BSSC</p>
            <p className="text-gray-600">
              Các đối tác của Vé Xe Online đều là những hãng xe lớn, có uy tín nên tôi hoàn toàn yên tâm khi lựa chọn đặt vé cho bản thân và gia đình. Nhờ hiển thị rõ nhà xe và vị trí chỗ trống trên xe...
            </p>
          </div>
        </div>
        {/* Thêm các đánh giá khác tại đây nếu cần */}
      </div>
    </section>
  );
};

export default CustomerTestimonialsSection;
