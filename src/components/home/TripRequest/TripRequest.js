import React, { useState } from 'react';
import { Form, DatePicker, Button, message } from 'antd';
import LocationSelect from './LocationSelect';
import CompanySelect from './CompanySelect';
import BusTypeInput from './BusTypeInput';
import { useCreateTripRequestMutation } from '../../../Redux/User/apiSlice';
import Navbar from 'components/shared/navbar/Navbar';
import Footer from 'components/shared/footer/Footer';

const TripRequest = () => {
  const [form] = Form.useForm();
  const [departureLocation, setDepartureLocation] = useState('');
  const [arrivalLocation, setArrivalLocation] = useState('');
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [selectedBusType, setSelectedBusType] = useState(null);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);


  const [createTripRequest, { isLoading }] = useCreateTripRequestMutation();

  const handleSubmit = async (values) => {
    if (!departureLocation || !arrivalLocation || !selectedCompany || !selectedBusType) {
      message.warning('Vui lòng chọn đầy đủ thông tin trước khi gửi yêu cầu!');
      return;
    }

    try {
      const tripData = {
        ...values,
        departureLocation,
        arrivalLocation,
        preferredDepartureTime: values.preferredDepartureTime.toISOString(),
        companyId: selectedCompany,
        busType: selectedBusType,
        seatNumbers: selectedSeats,
      };
      await createTripRequest(tripData).unwrap();
      message.success('Yêu cầu chuyến đi đã được gửi thành công!');
      form.resetFields();
      setDepartureLocation('');
      setArrivalLocation('');
      setSelectedCompany(null);
      setSelectedBusType(null);
      setActiveDropdown(null); // Đóng tất cả dropdown sau khi gửi thành công
    } catch (err) {
      console.error('Lỗi khi tạo yêu cầu chuyến đi:', err);
      message.error(err.data?.message || 'Đã xảy ra lỗi. Vui lòng thử lại.');
    }
  };

  const toggleDropdown = (dropdownName) => {
    setActiveDropdown((prev) => (prev === dropdownName ? null : dropdownName)); // Đóng nếu đã mở, mở nếu khác
  };

  return (
    <div>
    <Navbar/>
    <div className="p-6 max-w-3xl mx-auto bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold text-center mb-4">Tạo Yêu Cầu Chuyến Đi</h2>
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        className="space-y-4"
      >
        <LocationSelect
          label="Điểm đi"
          value={departureLocation}
          onChange={setDepartureLocation}
          placeholder="Chọn điểm đi"
          isOpen={activeDropdown === 'departure'}
          onToggle={() => toggleDropdown('departure')}
        />
        <LocationSelect
          label="Điểm đến"
          value={arrivalLocation}
          onChange={setArrivalLocation}
          placeholder="Chọn điểm đến"
          isOpen={activeDropdown === 'arrival'}
          onToggle={() => toggleDropdown('arrival')}
        />
        <CompanySelect
          selectedCompany={selectedCompany}
          onSelectCompany={setSelectedCompany}
        />
        <BusTypeInput
          companyId={selectedCompany}
          selectedBusType={selectedBusType}
          onSelectBusType={setSelectedBusType}
          selectedSeats={selectedSeats}
          onSelectSeats={setSelectedSeats}
        />
        <Form.Item
          label="Thời gian khởi hành mong muốn"
          name="preferredDepartureTime"
          rules={[{ required: true, message: 'Vui lòng chọn thời gian khởi hành!' }]}
        >
          <DatePicker
            showTime
            className="w-full"
            placeholder="Chọn thời gian khởi hành"
          />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="w-full"
            loading={isLoading}
            disabled={!selectedCompany || !selectedBusType}
          >
            {isLoading ? 'Đang gửi...' : 'Gửi Yêu Cầu'}
          </Button>
        </Form.Item>
      </Form>
    </div>
    </div>
  );
};

export default TripRequest;
