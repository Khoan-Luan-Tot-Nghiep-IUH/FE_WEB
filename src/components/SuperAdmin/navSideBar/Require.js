import React, { useState } from 'react';
import { useGetCompanyRequestsQuery, useUpdateCompanyRequestMutation } from '../../../Redux/User/apiSlice';
import { Table, Tag, Button, Modal, message, Space } from 'antd';

const CompanyRequests = () => {
  const { data: companyRequests, isLoading } = useGetCompanyRequestsQuery();
  const [updateCompanyRequest] = useUpdateCompanyRequestMutation();
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAction = async (requestId, status) => {
    try {
      console.log({ requestId, status }); // Log dữ liệu gửi đi
      await updateCompanyRequest({ requestId, status }).unwrap();
      message.success(`Yêu cầu đã được ${status === 'Approved' ? 'phê duyệt' : 'từ chối'} thành công!`);
    } catch (error) {
      console.error('Lỗi khi cập nhật yêu cầu:', error); // Log lỗi chi tiết

      // Hiển thị lỗi từ backend (nếu có)
      if (error?.data?.message) {
        message.error(error.data.message);
      } else {
        message.error('Đã xảy ra lỗi. Vui lòng thử lại.');
      }
    }
  };

  const columns = [
    {
      title: 'Tên công ty',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <Tag color={status === 'Pending' ? 'blue' : status === 'Approved' ? 'green' : 'red'}>
          {status === 'Pending' ? 'Chờ xử lý' : status === 'Approved' ? 'Đã phê duyệt' : 'Đã từ chối'}
        </Tag>
      ),
    },
    {
      title: 'Thông tin người dùng',
      dataIndex: 'userId',
      key: 'userId',
      render: (user) => (
        <div>
          <p>{user?.fullName}</p>
          <p style={{ fontSize: '12px', color: '#888' }}>{user?.email}</p>
        </div>
      ),
    },
    {
      title: 'Ngày tạo',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (date) => new Date(date).toLocaleDateString('vi-VN'),
    },
    {
      title: 'Hành động',
      key: 'actions',
      render: (_, record) => (
        <Space>
          <Button
            type="primary"
            onClick={() => handleAction(record._id, 'Approved')}
            disabled={record.status !== 'Pending'}
          >
            Phê duyệt
          </Button>
          <Button
            danger
            onClick={() => handleAction(record._id, 'Rejected')}
            disabled={record.status !== 'Pending'}
          >
            Từ chối
          </Button>
          <Button
            onClick={() => {
              setSelectedRequest(record);
              setIsModalOpen(true);
            }}
          >
            Xem chi tiết
          </Button>
        </Space>
      ),
    },
  ];

  if (isLoading) {
    return <p>Đang tải danh sách yêu cầu...</p>;
  }

  return (
    <div style={{ padding: '20px' }}>
      <h1>Danh sách yêu cầu công ty</h1>
      <Table
        dataSource={companyRequests?.data || []}
        columns={columns}
        rowKey="_id"
        bordered
        pagination={{ pageSize: 10 }}
      />
      <Modal
        title="Chi tiết yêu cầu"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={[
          <Button key="close" onClick={() => setIsModalOpen(false)}>
            Đóng
          </Button>,
        ]}
      >
        {selectedRequest && (
          <div>
            <p><strong>Tên công ty:</strong> {selectedRequest.name}</p>
            <p><strong>Trạng thái:</strong> {selectedRequest.status === 'Pending' ? 'Chờ xử lý' : selectedRequest.status === 'Approved' ? 'Đã phê duyệt' : 'Đã từ chối'}</p>
            <p><strong>Địa chỉ:</strong> {selectedRequest.address}</p>
            <p><strong>Thông tin liên lạc:</strong> {selectedRequest.contactInfo}</p>
            <p><strong>Số điện thoại:</strong> {selectedRequest.phoneNumber}</p>
            <p><strong>Email:</strong> {selectedRequest.email}</p>
            <p><strong>Website:</strong> {selectedRequest.website}</p>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default CompanyRequests;
