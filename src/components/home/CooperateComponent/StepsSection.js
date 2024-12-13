import React from 'react';

const StepCard = ({ stepNumber, title, description }) => (
  <div className="bg-white shadow-md rounded-lg p-6 text-center">
    <div className="bg-blue-600 text-white text-2xl font-bold w-12 h-12 flex items-center justify-center rounded-full mx-auto mb-4">
      {stepNumber}
    </div>
    <h3 className="text-xl font-bold mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

const StepsSection = () => {
  const handleScrollToForm = () => {
    const formSection = document.getElementById('formSection');
    if (formSection) {
      formSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="py-16 bg-gray-500 text-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">
          Đăng ký mở bán theo 4 bước đơn giản
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <StepCard
            stepNumber="1"
            title="Đăng ký thông tin"
            description="Quý khách vui lòng để lại thông tin hoặc liên hệ hotline để được tư vấn hỗ trợ."
          />
          <StepCard
            stepNumber="2"
            title="Tư vấn"
            description="VeXeOnline sẽ liên hệ xác minh thông tin và tư vấn sớm nhất. Giải đáp tất cả thắc mắc của nhà xe và tiếp nhận hàng mục tiêu và kỳ vọng của nhà xe."
          />
          <StepCard
            stepNumber="3"
            title="Ký hợp đồng"
            description="Sau khi tư vấn thành công, chủ nhà xe và VeXeOnline sẽ tiến hành ký kết hợp đồng."
          />
          <StepCard
            stepNumber="4"
            title="Mở bán tại VeXeOnline"
            description="Mở bán trên sàn VeXeOnline.com, chúng tôi luôn đồng hành và hỗ trợ nhà xe cho đến khi phát sinh doanh thu."
          />
        </div>
        <div className="text-center">
          <button
            onClick={handleScrollToForm}
            className="bg-yellow-500 text-gray-800 font-bold px-6 py-3 rounded-lg shadow-lg hover:bg-yellow-600 transition-all"
          >
            Đăng ký mở bán
          </button>
        </div>
      </div>
    </div>
  );
};

export default StepsSection;
