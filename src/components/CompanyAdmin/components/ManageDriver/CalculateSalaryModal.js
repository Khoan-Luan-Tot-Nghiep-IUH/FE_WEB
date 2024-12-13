import React, { useState } from 'react';
import { Modal, Form, DatePicker, Button, notification, Typography, Divider, InputNumber, Row, Col } from 'antd';
import { useCalculateAndRecordDriverSalaryMutation } from '../../../../Redux/Company/companyApiSlice';
import moment from 'moment';

const { Title, Text } = Typography;

const CalculateSalaryModal = ({ visible, onClose, driver }) => {
  const [calculateSalary] = useCalculateAndRecordDriverSalaryMutation();
  const [form] = Form.useForm();
  const [salaryDetails, setSalaryDetails] = useState(null);

  const handleCalculateSalary = async (values) => {
    const { month, bonuses = 0, deductions = 0 } = values;
    const startDate = moment(month).startOf('month').format('YYYY-MM-DD');
    const endDate = moment(month).endOf('month').format('YYYY-MM-DD');

    try {
      const response = await calculateSalary({
        userId: driver.userId._id,
        startDate,
        endDate,
        bonuses,
        deductions,
      }).unwrap();

      const adjustedSalary = {
        ...response.salaryRecord,
        bonuses,
        deductions,
        totalSalary: response.salaryRecord.baseSalary + response.salaryRecord.tripEarnings + bonuses - deductions,
      };

      setSalaryDetails(adjustedSalary);
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
      title={<Title level={4}>Tính Lương Cho Tài Xế: {driver.userId.fullName}</Title>}
      visible={visible}
      onOk={handleOk}
      onCancel={onClose}
      okText="Tính Lương"
      cancelText="Hủy"
      width={600}
    >
      <Form form={form} onFinish={handleCalculateSalary} layout="vertical">
        <Row gutter={[16, 16]}>
          <Col span={12}>
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
          </Col>
          <Col span={12}>
            <Form.Item name="bonuses" label="Khoản thưởng">
              <InputNumber
                style={{ width: '100%' }}
                placeholder="Nhập khoản thưởng (nếu có)"
                formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                parser={(value) => value.replace(/[^0-9]/g, '')}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="deductions" label="Khoản khấu trừ">
              <InputNumber
                style={{ width: '100%' }}
                placeholder="Nhập khoản khấu trừ (nếu có)"
                formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                parser={(value) => value.replace(/[^0-9]/g, '')}
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>

      {salaryDetails && (
        <div style={{ marginTop: '20px' }}>
          <Divider />
          <Title level={5}>Chi Tiết Lương</Title>
          <Row gutter={[16, 16]}>
            <Col span={12}>
              <Text><b>Lương cơ bản:</b> {salaryDetails.baseSalary.toLocaleString('vi-VN')} VND</Text>
            </Col>
            <Col span={12}>
              <Text><b>Thu nhập từ chuyến đi:</b> {salaryDetails.tripEarnings.toLocaleString('vi-VN')} VND</Text>
            </Col>
            <Col span={12}>
              <Text><b>Khoản thưởng:</b> {salaryDetails.bonuses.toLocaleString('vi-VN')} VND</Text>
            </Col>
            <Col span={12}>
              <Text><b>Khoản khấu trừ:</b> {salaryDetails.deductions.toLocaleString('vi-VN')} VND</Text>
            </Col>
            <Col span={24}>
              <Text><b>Tổng lương:</b> {salaryDetails.totalSalary.toLocaleString('vi-VN')} VND</Text>
            </Col>
          </Row>
        </div>
      )}
    </Modal>
  );
};

export default CalculateSalaryModal;
