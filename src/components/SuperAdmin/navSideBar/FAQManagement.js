import React, { useState } from 'react';
import { Table, Button, Modal, Form, Input, Popconfirm, Space, Spin } from 'antd';
import { useGetRootQuestionsQuery, useCreateFAQMutation, useUpdateFAQMutation, useDeleteFAQMutation } from '../../../Redux/User/apiSlice';

const FAQManagement = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingRecord, setEditingRecord] = useState(null);

  const { data: faqs = [], isLoading: isFAQsLoading } = useGetRootQuestionsQuery();
  const [createFAQ] = useCreateFAQMutation();
  const [updateFAQ] = useUpdateFAQMutation();
  const [deleteFAQ] = useDeleteFAQMutation();

  const [form] = Form.useForm();

  const handleAddFAQ = () => {
    setIsModalOpen(true);
    setIsEditing(false);
    form.resetFields(); // Reset form trước khi thêm
  };

  const handleEditFAQ = (record) => {
    setIsModalOpen(true);
    setIsEditing(true);
    setEditingRecord(record);
    form.setFieldsValue(record); // Gán dữ liệu vào form để chỉnh sửa
  };

  const handleDeleteFAQ = async (id) => {
    try {
      await deleteFAQ(id);
    } catch (error) {
      console.error('Xóa FAQ thất bại:', error);
    }
  };

  const handleModalSubmit = async (values) => {
    try {
      if (isEditing) {
        await updateFAQ({ ...values, _id: editingRecord._id });
      } else {
        await createFAQ(values);
      }
      setIsModalOpen(false);
      form.resetFields();
    } catch (error) {
      console.error('Lưu FAQ thất bại:', error);
    }
  };

  const columns = [
    {
      title: 'Câu hỏi',
      dataIndex: 'question',
      key: 'question',
    },
    {
      title: 'Hành động',
      key: 'actions',
      render: (_, record) => (
        <Space>
          <Button type="link" onClick={() => handleEditFAQ(record)}>
            Sửa
          </Button>
          <Popconfirm
            title="Bạn có chắc chắn muốn xóa FAQ này?"
            onConfirm={() => handleDeleteFAQ(record._id)}
            okText="Xóa"
            cancelText="Hủy"
          >
            <Button type="link" danger>
              Xóa
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <h2>Quản lý FAQ</h2>
      <Button type="primary" onClick={handleAddFAQ}>
        Thêm FAQ
      </Button>
      {isFAQsLoading ? (
        <Spin tip="Đang tải dữ liệu..." />
      ) : (
        <Table dataSource={faqs.data} columns={columns} rowKey="_id" />
      )}

      <Modal
        title={isEditing ? 'Chỉnh sửa FAQ' : 'Thêm mới FAQ'}
        visible={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        onOk={() => {
          form.validateFields().then((values) => handleModalSubmit(values));
        }}
        okText={isEditing ? 'Lưu' : 'Thêm'}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="question"
            label="Câu hỏi"
            rules={[{ required: true, message: 'Vui lòng nhập câu hỏi!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="answers"
            label="Câu trả lời (dạng JSON)"
            rules={[{ required: true, message: 'Vui lòng nhập câu trả lời!' }]}
          >
            <Input.TextArea rows={4} placeholder='[{ "text": "Câu trả lời", "nextQuestionId": "id"}]' />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default FAQManagement;
