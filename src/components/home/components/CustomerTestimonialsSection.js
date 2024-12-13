import React from 'react';
import { FaQuoteLeft } from 'react-icons/fa';

const CustomerTestimonialsSection = () => {
  const testimonials = [
    {
      image: 'https://229a2c9fe669f7b.cmccloud.com.vn/images/testimonial-quynh.jpg',
      name: 'Anh Nguyễn Tuấn Quỳnh',
      position: 'CEO Saigon Books',
      feedback:
        'Lần trước tôi có việc gấp phải đi công tác, lên mạng tìm đặt vé xe thì tình cờ tìm thấy Vé Xe Online. Sau khi tham khảo, tôi quyết định đặt vé và thanh toán. Công nhận rất tiện và nhanh chóng...',
    },
    {
      image: 'https://229a2c9fe669f7b.cmccloud.com.vn/images/testimonial-phi.jpg',
      name: 'Shark Phi',
      position: 'Giám đốc BSSC',
      feedback:
        'Các đối tác của Vé Xe Online đều là những hãng xe lớn, có uy tín nên tôi hoàn toàn yên tâm khi lựa chọn đặt vé cho bản thân và gia đình. Nhờ hiển thị rõ nhà xe và vị trí chỗ trống trên xe...',
    },
    // Bạn có thể thêm các đánh giá khác tại đây nếu cần
  ];

  return (
    <section className="customer-testimonials-section container mx-auto mt-12 px-4 md:px-6">
      <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-12">
        Khách Hàng Nói Gì Về Vé Xe Online
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {testimonials.map((testimonial, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-lg p-6 flex flex-col md:flex-row items-center transform hover:scale-105 transition duration-300"
          >
            <img
              src={testimonial.image}
              alt={testimonial.name}
              className="w-24 h-24 rounded-full object-cover border-4 border-blue-500 mb-4 md:mb-0 md:mr-6"
            />
            <div>
              <h3 className="text-xl font-bold text-blue-600 mb-1">{testimonial.name}</h3>
              <p className="text-gray-600 italic mb-3">{testimonial.position}</p>
              <p className="text-gray-700 flex items-start">
                <FaQuoteLeft className="text-blue-500 mr-2 mt-1" />
                {testimonial.feedback}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CustomerTestimonialsSection;
