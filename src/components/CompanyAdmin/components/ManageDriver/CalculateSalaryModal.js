import React, { useState } from 'react';
import { Modal, Form, DatePicker, Button, notification, Typography, Divider, InputNumber } from 'antd';
import { useCalculateAndRecordDriverSalaryMutation } from '../../../../Redux/Company/companyApiSlice';
import moment from 'moment';

const { Title, Text } = Typography;

const CalculateSalaryModal = ({ visible, onClose, driver }) => {
  const [calculateSalary] = useCalculateAndRecordDriverSalaryMutation();
  const [form] = Form.useForm();
  const [salaryDetails, setSalaryDetails] = useState(null);

  const handleCalculateSalary = async (values) => {
    const { month, bonuses, deductions } = values;
    const startDate = moment(month).startOf('month').format('YYYY-MM-DD');
    const endDate = moment(month).endOf('month').format('YYYY-MM-DD');

    try {
      const response = await calculateSalary({
        userId: driver.userId._id,
        startDate,
        endDate,
        bonuses: bonuses || 0,  // Nếu không có giá trị, gán mặc định là 0
        deductions: deductions || 0 // Nếu không có giá trị, gán mặc định là 0
      }).unwrap();
      
      setSalaryDetails(response.salaryRecord);
      notification.success({
        message: 'Tính lương thành công',
        description: `Lương đã được tính và lưu cho tài xế ${driver.userId.fullName}.`,
      });
    } catch (error) {
      notification.error({
        message: 'Lỗi khi tính lương',
        description: error.data?.message || 'Có lỗi xảy ra khi tính lương.',
      });
    }
  };

  const handleOk = () => {
    form.submit();
  };

  return (
    <Modal
      title={`Tính Lương Cho Tài Xế: ${driver.userId.fullName}`}
      visible={visible}
      onOk={handleOk}
      onCancel={onClose}
      okText="Tính Lương"
      cancelText="Hủy"
    >
      <Form form={form} onFinish={handleCalculateSalary} layout="vertical">
        <Form.Item
          name="month"
          label="Chọn tháng"
          rules={[{ required: true, message: 'Vui lòng chọn tháng' }]}
        >
          <DatePicker
            picker="month"
            style={{ width: '100%' }}
            disabledDate={(current) => current && current > moment().endOf('month')}
          />
        </Form.Item>

        <Form.Item
          name="bonuses"
          label="Khoản thưởng"
        >
          <InputNumber
            style={{ width: '100%' }}
            placeholder="Nhập khoản thưởng (nếu có)"
            formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            parser={value => value.replace(/\$\s?|(,*)/g, '')}
          />
        </Form.Item>

        <Form.Item
          name="deductions"
          label="Khoản khấu trừ"
        >
          <InputNumber
            style={{ width: '100%' }}
            placeholder="Nhập khoản khấu trừ (nếu có)"
            formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            parser={value => value.replace(/\$\s?|(,*)/g, '')}
          />
        </Form.Item>
      </Form>

      {salaryDetails && (
        <div style={{ marginTop: '20px' }}>
          <Divider />
          <Title level={5}>Chi Tiết Lương</Title>
          <Text><b>Lương cơ bản:</b> {salaryDetails.baseSalary.toLocaleString('vi-VN')} VND</Text>
          <br />
          <Text><b>Thu nhập từ chuyến đi:</b> {salaryDetails.tripEarnings.toLocaleString('vi-VN')} VND</Text>
          <br />
          <Text><b>Tổng lương:</b> {salaryDetails.totalSalary.toLocaleString('vi-VN')} VND</Text>
          <br />
          <Text><b>Khoản thưởng:</b> {salaryDetails.bonuses.toLocaleString('vi-VN')} VND</Text>
          <br />
          <Text><b>Khoản khấu trừ:</b> {salaryDetails.deductions.toLocaleString('vi-VN')} VND</Text>
        </div>
      )}
    </Modal>
  );
};

export default CalculateSalaryModal;
