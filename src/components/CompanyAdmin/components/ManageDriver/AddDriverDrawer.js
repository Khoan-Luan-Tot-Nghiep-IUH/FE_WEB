import React from 'react';
import { Drawer, Button, Form, Input, notification, Row, Col } from 'antd';
import { useAddDriverMutation } from '../../../../Redux/Company/companyApiSlice';

const AddDriverDrawer = ({ visible, onClose, onAddDriverSuccess }) => {
  const [addDriver, { isLoading }] = useAddDriverMutation();
  const [form] = Form.useForm();

  const handleFinish = async (values) => {
    try {
      const result = await addDriver(values).unwrap();
      notification.success({
        message: 'Thành công',
        description: 'Tài xế mới đã được thêm thành công!',
      });
      form.resetFields();
      onAddDriverSuccess(result.driver); // Gọi hàm callback để cập nhật danh sách
      onClose();
    } catch (error) {
      notification.error({
        message: 'Lỗi',
        description: 'Có lỗi xảy ra khi thêm tài xế!',
      });
    }
  };

  return (
    <Drawer
      title="Thêm Tài Xế Mới"
      width={720}
      onClose={onClose}
      visible={visible}
      bodyStyle={{ paddingBottom: 80 }}
    >
      <Form
        layout="vertical"
        form={form}
        onFinish={handleFinish}
      >
        <Form.Item
          name="fullName"
          label="Họ và Tên"
          rules={[{ required: true, message: 'Vui lòng nhập họ và tên tài xế' }]}
        >
          <Input placeholder="Nhập họ và tên tài xế" />
        </Form.Item>

        <Form.Item
          name="email"
          label="Email"
          rules={[{ required: true, type: 'email', message: 'Vui lòng nhập email hợp lệ' }]}
        >
          <Input placeholder="Nhập email" />
        </Form.Item>

        <Form.Item
          name="phoneNumber"
          label="Số điện thoại"
          rules={[{ required: true, message: 'Vui lòng nhập số điện thoại' }]}
        >
          <Input placeholder="Nhập số điện thoại" />
        </Form.Item>

        <Form.Item
          name="licenseNumber"
          label="Giấy phép lái xe"
          rules={[{ required: true, message: 'Vui lòng nhập giấy phép lái xe' }]}
        >
          <Input placeholder="Nhập giấy phép lái xe" />
        </Form.Item>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="userName"
              label="Tên đăng nhập"
              rules={[{ required: true, message: 'Vui lòng nhập tên đăng nhập' }]}
            >
              <Input placeholder="Nhập tên đăng nhập" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="password"
              label="Mật khẩu"
              rules={[{ required: true, message: 'Vui lòng nhập mật khẩu', min: 3 }]}
            >
              <Input.Password placeholder="Nhập mật khẩu" />
            </Form.Item>
          </Col>
        </Row>

        <div className="flex justify-end gap-4">
          <Button onClick={onClose} className="bg-gray-300">
            Hủy
          </Button>
          <Button
            type="primary"
            htmlType="submit"
            loading={isLoading}
            className="bg-blue-500 text-white"
          >
            Thêm
          </Button>
        </div>
      </Form>
    </Drawer>
  );
};

export default AddDriverDrawer;
