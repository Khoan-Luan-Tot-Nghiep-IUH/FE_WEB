import React from 'react';
import { Table, Button, Tag, message, Space, Modal } from 'antd';
import { useGetTripRequestsQuery, useCancelTripRequestMutation } from '../../../Redux/User/apiSlice';
import { ExclamationCircleOutlined } from '@ant-design/icons';

const { confirm } = Modal;

const TripRequestTab = () => {
  const { data, isLoading, isError, refetch } = useGetTripRequestsQuery();
  const [cancelTripRequest, { isLoading: isCancelling }] = useCancelTripRequestMutation();

  const handleCancelTripRequest = (requestId) => {
    confirm({
      title: 'Bạn có chắc muốn hủy yêu cầu mở chuyến đi này?',
      icon: <ExclamationCircleOutlined />,
      content: 'Hành động này không thể hoàn tác.',
      okText: 'Hủy yêu cầu',
      okType: 'danger',
      cancelText: 'Quay lại',
      onOk: async () => {
        try {
          await cancelTripRequest(requestId).unwrap();
          message.success('Hủy yêu cầu mở chuyến đi thành công!');
          refetch();
        } catch (error) {
          message.error(error?.data?.message || 'Đã xảy ra lỗi khi hủy yêu cầu.');
        }
      },
    });
  };

  const columns = [
    {
      title: 'Điểm đi',
      dataIndex: 'departureLocation',
      key: 'departureLocation',
      render: (departureLocation) => departureLocation?.name || 'Không xác định',
    },
    {
      title: 'Điểm đến',
      dataIndex: 'arrivalLocation',
      key: 'arrivalLocation',
      render: (arrivalLocation) => arrivalLocation?.name || 'Không xác định',
    },
    {
      title: 'Công ty',
      dataIndex: 'companyId',
      key: 'companyId',
      render: (companyId) => companyId?.name || 'Không xác định',
    },
    {
      title: 'Loại xe',
      dataIndex: 'busType',
      key: 'busType',
      render: (busType) => busType?.name || 'Không xác định',
    },
    {
      title: 'Ngày gửi',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (createdAt) => new Date(createdAt).toLocaleDateString('vi-VN'),
    },
    {
        title: 'Trạng thái',
        dataIndex: 'status',
        key: 'status',
        render: (status) => {
          let color = '';
          let label = '';
          switch (status) {
            case 'Pending':
              color = 'orange';
              label = 'Đang chờ duyệt';
              break;
            case 'Approved':
              color = 'green';
              label = 'Đã phê duyệt';
              break;
            case 'Rejected':
              color = 'red';
              label = 'Bị từ chối';
              break;
            case 'Created':
              color = 'blue';
              label = 'Đã tạo';
              break;
            default:
              color = 'gray';
              label = 'Không xác định';
          }
          return <Tag color={color}>{label}</Tag>;
        },
      },      
    {
      title: 'Thao tác',
      key: 'actions',
      render: (_, record) => (
        <Space size="middle">
          <Button
            type="primary"
            danger
            onClick={() => handleCancelTripRequest(record._id)}
            loading={isCancelling}
          >
            Hủy yêu cầu
          </Button>
        </Space>
      ),
    },
  ];

  if (isLoading) return <p>Đang tải dữ liệu...</p>;
  if (isError || !data?.success) return <p>Không thể tải dữ liệu yêu cầu mở chuyến đi.</p>;

  return (
    <Table
      dataSource={data?.data || []}
      columns={columns}
      rowKey={(record) => record._id}
      pagination={{ pageSize: 10 }}
      loading={isLoading || isCancelling}
    />
  );
};

export default TripRequestTab;
