import React, { useState } from 'react';
import { useGetTripRequestsForCompanyQuery, useApproveTripRequestMutation, useRejectTripRequestMutation } from '../../../../Redux/Company/companyApiSlice';
import { Button, Spin, Alert, Table, Popconfirm, message, Badge, Modal, Form, Input, InputNumber } from 'antd';

const TripRequest = () => {
  // Fetch trip requests
  const { data: tripRequestsData = {}, isLoading, error, refetch } = useGetTripRequestsForCompanyQuery();
  const tripRequests = tripRequestsData.data || []; // Extract the `data` array

  // Approve and reject mutations
  const [approveTripRequest, { isLoading: isApproving }] = useApproveTripRequestMutation();
  const [rejectTripRequest, { isLoading: isRejecting }] = useRejectTripRequestMutation();

  // Modal state
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentRequestId, setCurrentRequestId] = useState(null);
  const [form] = Form.useForm();

  const showApproveModal = (requestId) => {
    setCurrentRequestId(requestId);
    setIsModalVisible(true);
  };

  const handleApprove = async (values) => {
    try {
      const formattedValues = {
        basePrice: values.basePrice,
        pickupPoints: values.pickupPoints.split(',').map((point) => ({
          time: '',
          location: point.trim(),
          note: '',
        })),
        dropOffPoints: values.dropOffPoints.split(',').map((point) => ({
          time: '',
          location: point.trim(),
          note: '',
        })),
      };
  
      console.log('Sending approve request with ID:', currentRequestId);
      console.log('Sending approve request with values:', formattedValues);
  
      const response = await approveTripRequest({
        requestId: currentRequestId,
        ...formattedValues,
      }).unwrap();
  
      console.log('Approve response:', response);
      message.success('Yêu cầu đã được duyệt thành công!');
      setIsModalVisible(false);
      form.resetFields();
      refetch();
    } catch (error) {
      console.error('Approve error:', error);
      message.error(error?.data?.message || 'Duyệt yêu cầu thất bại.');
    }
  };
  

  const handleReject = async (requestId) => {
    try {
      const response = await rejectTripRequest({ requestId, reason: 'Không phù hợp với lịch trình' }).unwrap();
      message.success('Yêu cầu đã bị từ chối!');
      refetch();
    } catch (error) {
      message.error(error?.data?.message || 'Từ chối yêu cầu thất bại.');
    }
  };

  const columns = [
    {
      title: 'Người Yêu Cầu',
      dataIndex: 'userId',
      key: 'userId',
      render: (user) => user?.fullName || 'N/A',
    },
    {
      title: 'Khởi Hành',
      dataIndex: 'departureLocation',
      key: 'departureLocation',
      render: (location) => location?.name || 'N/A',
    },
    {
      title: 'Điểm Đến',
      dataIndex: 'arrivalLocation',
      key: 'arrivalLocation',
      render: (location) => location?.name || 'N/A',
    },
    {
      title: 'Thời Gian',
      dataIndex: 'preferredDepartureTime',
      key: 'preferredDepartureTime',
      render: (time) => (time ? new Date(time).toLocaleString() : 'N/A'),
    },
    {
      title: 'Số Ghế',
      dataIndex: 'seatNumbers',
      key: 'seatNumbers',
      render: (seatNumbers) => seatNumbers?.join(', ') || 'N/A',
    },
    {
      title: 'Trạng Thái',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <Badge
          status={
            status === 'Pending'
              ? 'processing'
              : status === 'Approved'
              ? 'success'
              : 'error'
          }
          text={
            status === 'Pending'
              ? 'Đang Chờ'
              : status === 'Approved'
              ? 'Đã Duyệt'
              : 'Đã Từ Chối'
          }
        />
      ),
    },
    {
      title: 'Hành Động',
      key: 'actions',
      render: (record) => (
        <div className="flex gap-2">
          {record.status === 'Pending' && (
            <>
              <Button
                type="primary"
                onClick={() => showApproveModal(record._id)}
                loading={isApproving}
                disabled={isApproving || isRejecting}
              >
                Duyệt
              </Button>
              <Popconfirm
                title="Bạn có chắc chắn muốn từ chối yêu cầu này?"
                onConfirm={() => handleReject(record._id)}
                okText="Từ Chối"
                cancelText="Hủy"
              >
                <Button
                  type="danger"
                  loading={isRejecting}
                  disabled={isApproving || isRejecting}
                >
                  Từ Chối
                </Button>
              </Popconfirm>
            </>
          )}
        </div>
      ),
    },
  ];

  return (
    <div className="container mx-auto p-6 bg-white rounded-md shadow-md">
      {isLoading ? (
        <div className="flex justify-center py-2">
          <Spin tip="Đang tải danh sách yêu cầu..." size="large" />
        </div>
      ) : error ? (
        <Alert
          message="Có lỗi xảy ra khi tải danh sách yêu cầu"
          description={error.message}
          type="error"
          showIcon
        />
      ) : tripRequests.length === 0 ? (
        <p className="text-center text-gray-500">Không có yêu cầu nào.</p>
      ) : (
        <Table
          columns={columns}
          dataSource={tripRequests}
          rowKey={(record) => record._id}
          pagination={{
            pageSize: 5,
            showSizeChanger: true,
            pageSizeOptions: ['5', '10', '20'],
          }}
        />
      )}

      <Modal
        title="Nhập thông tin chuyến đi"
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        onOk={() => form.submit()}
        okText="Xác Nhận"
        cancelText="Hủy"
      >
        <Form form={form} layout="vertical" onFinish={handleApprove}>
          <Form.Item
            label="Giá Vé Cơ Bản"
            name="basePrice"
            rules={[{ required: true, message: 'Vui lòng nhập giá vé cơ bản!' }]}
          >
            <InputNumber min={0} style={{ width: '100%' }} placeholder="Nhập giá vé" />
          </Form.Item>
          <Form.Item
            label="Điểm Đón"
            name="pickupPoints"
            rules={[{ required: true, message: 'Vui lòng nhập điểm đón!' }]}
          >
            <Input.TextArea rows={2} placeholder="Nhập danh sách điểm đón (ngăn cách bởi dấu phẩy)" />
          </Form.Item>
          <Form.Item
            label="Điểm Trả"
            name="dropOffPoints"
            rules={[{ required: true, message: 'Vui lòng nhập điểm trả!' }]}
          >
            <Input.TextArea rows={2} placeholder="Nhập danh sách điểm trả (ngăn cách bởi dấu phẩy)" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default TripRequest;
