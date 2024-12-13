import React, { useRef } from 'react';
import Navbar from 'components/shared/navbar/Navbar';
import Footer from 'components/shared/footer/Footer';
import { Form, Input, Button, message } from 'antd';
import { FaSmileBeam, FaRegCheckCircle, FaHeadset, FaBus } from 'react-icons/fa';
import BenefitsSection from './CooperateComponent/BenefitsSection';
import StepsSection from './CooperateComponent/StepsSection';
import { useCreateCompanyRequestMutation } from '../../Redux/User/apiSlice'; 

const StatsCard = ({ title, description }) => (
  <div className="border border-blue-600 p-4 rounded-lg text-center">
    <h3 className="text-xl font-bold text-blue-600">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

const TrustCard = ({ icon, title, description }) => (
  <div className="flex flex-col items-center text-center p-4">
    <div className="text-5xl text-blue-600 mb-4">{icon}</div>
    <h3 className="text-xl font-bold mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

const Cooperate = () => {
  const [form] = Form.useForm();
  const formRef = useRef(null); 

  const [createCompanyRequest, { isLoading }] = useCreateCompanyRequestMutation();

  const handleScrollToForm = () => {
    formRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleSubmit = async (values) => {
    try {
      const response = await createCompanyRequest(values).unwrap();
      message.success(response.message || 'Yêu cầu mở công ty đã được gửi thành công!');
      form.resetFields();
    } catch (error) {
      message.error(error?.data?.message || 'Đã xảy ra lỗi khi gửi yêu cầu.');
    }
  };

  return (
    <>
      <Navbar />

      {/* Header Section */}
      <div ref={formRef} className="bg-blue-300 text-white py-16">
        <div className="container mx-auto flex flex-col md:flex-row items-center px-4">
          {/* Text Section */}
          <div className="md:w-1/2 text-center md:text-left mb-8 md:mb-0">
            <h1 className="text-3xl md:text-4xl font-bold leading-tight mb-4">
              Tăng 30% lượng khách đặt vé khi mở bán online trên VeXeOnline ngay hôm nay!
            </h1>
            <p className="text-lg">Đăng ký miễn phí và chỉ mất 1 phút để hoàn tất</p>
          </div>
          <div  id="formSection"  className="md:w-1/2 bg-white text-black p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold text-center mb-4">
              Bắt đầu lấp đầy chỗ trống trên xe của bạn
            </h2>
            <Form form={form} layout="vertical" onFinish={handleSubmit}className="space-y-4">
              <Form.Item
                name="name"
                label="Tên công ty"
                rules={[{ required: true, message: 'Vui lòng nhập tên công ty!' }]}
              >
                <Input placeholder="Tên công ty" />
              </Form.Item>
              <Form.Item
                name="address"
                label="Địa chỉ"
                rules={[{ required: true, message: 'Vui lòng nhập địa chỉ!' }]}
              >
                <Input placeholder="Địa chỉ" />
              </Form.Item>
              <Form.Item
                name="contactInfo"
                label="Thông tin liên hệ"
                rules={[{ required: true, message: 'Vui lòng nhập thông tin liên hệ!' }]}
              >
                <Input placeholder="Thông tin liên hệ" />
              </Form.Item>
              <Form.Item
                name="phoneNumber"
                label="Số điện thoại liên hệ"
                rules={[
                  { required: true, message: 'Vui lòng nhập số điện thoại!' },
                  { pattern: /^[0-9]{10}$/, message: 'Số điện thoại không hợp lệ!' },
                ]}
              >
                <Input placeholder="Số điện thoại liên hệ" />
              </Form.Item>
              <Form.Item
                name="email"
                label="Email"
                rules={[
                  { required: true, type: 'email', message: 'Email không hợp lệ!' },
                ]}
              >
                <Input placeholder="Email" />
              </Form.Item>
              <Form.Item name="website" label="Website">
                <Input placeholder="Website (tuỳ chọn)" />
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit" className="w-full">
                  Đăng ký mở bán
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
      <div className="py-16 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-8">
            Sự an tâm của Chủ nhà xe là ưu tiên hàng đầu của VeXeOnline
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <TrustCard
              icon={<FaSmileBeam />}
              title="Tỷ lệ khách đặt vé mà không đi qua sàn VeXeOnline rất thấp chỉ 0.2%"
              description="99.8% khách hàng đặt vé trên sàn VeXeOnline là khách thật; 80% khách đặt qua VeXeOnline đã thanh toán trước. Nếu khách đặt chỗ thanh toán tiền mặt tại nhà xe, hệ thống của VeXeOnline đều xác minh lại thông tin khách đặt, giúp nhà xe cắt giảm tình trạng đặt ảo giữ ghế mà không đi."
            />
            <TrustCard
              icon={<FaRegCheckCircle />}
              title="Quy trình đổi soát, thanh toán công nợ đúng hạn"
              description="VeXeOnline sẽ không làm chậm trễ việc thanh toán công nợ của nhà xe bằng bất kỳ cách nào. Đối tác nhà xe có nhiều phương thức thanh toán với VeXeOnline như chuyển khoản điện tử và các phương thức khác."
            />
            <TrustCard
              icon={<FaHeadset />}
              title="Được hỗ trợ tận tình từ đội ngũ chuyên viên VeXeOnline"
              description="Sau khi hoàn tất quy trình đăng ký mở bán trên sàn, nhà xe không cần lo lắng về dịch vụ và quy trình vận hành. Đội ngũ VeXeOnline sẽ phụ trách việc hướng dẫn nhà xe kiểm soát quy trình bán vé trực tuyến trong thời gian đầu tiên, từ thiết lập dịch vụ mở bán đến giai đoạn thanh toán."
            />
          </div>
          <div className="mt-12">
            <Button
              type="primary"
              onClick={handleScrollToForm}
              className="bg-yellow-500 text-white font-bold px-6 py-3 rounded-lg shadow-lg hover:bg-yellow-600 transition-all"
            >
              Đăng ký mở bán
            </Button>
          </div>
        </div>
      </div>
      <BenefitsSection /> 
      <StepsSection />
      <Footer />
    </>
  );
};

export default Cooperate;
