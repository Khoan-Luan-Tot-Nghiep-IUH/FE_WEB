// Requirements.jsx
import React from 'react';
import { Tabs, Table, Tag, message, Modal, Button, Space } from 'antd';
import { useGetUserRequestsQuery, useCancelUserRequestMutation } from '../../../Redux/User/apiSlice';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import TripRequestTab from './TripRequestTab';

const { confirm } = Modal;

const Requirements = () => {
  const [activeTab, setActiveTab] = React.useState('cooperation');

  const {
    data: apiResponse,
    isLoading: isLoadingRequests,
  } = useGetUserRequestsQuery();

  const cooperationRequests = apiResponse?.data || [];

  const [cancelRequest, { isLoading: isCancelling }] = useCancelUserRequestMutation();

  const handleCancelRequest = (requestId) => {
    confirm({
      title: 'Bạn có chắc muốn hủy yêu cầu này?',
      icon: <ExclamationCircleOutlined />,
      content: 'Hành động này không thể hoàn tác.',
      okText: 'Hủy yêu cầu',
      okType: 'danger',
      cancelText: 'Quay lại',
      onOk: async () => {
        try {
          await cancelRequest(requestId).unwrap();
          message.success('Hủy yêu cầu thành công!');
        } catch (error) {
          message.error(error?.data?.message || 'Đã xảy ra lỗi khi hủy yêu cầu.');
        }
      },
    });
  };

  const cooperationColumns = [
    {
      title: 'Tên công ty',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Ngày tạo',
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
            color = 'blue';
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
            onClick={() => handleCancelRequest(record._id)}
            loading={isCancelling}
          >
            Hủy yêu cầu
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold text-center mb-6">Quản lý yêu cầu</h1>
      <div className="bg-white shadow-md rounded-lg p-4">
        <Tabs
          defaultActiveKey="cooperation"
          activeKey={activeTab}
          onChange={(key) => setActiveTab(key)}
          type="card"
        >
          <Tabs.TabPane tab="Yêu cầu hợp tác" key="cooperation">
            <Table
              dataSource={cooperationRequests}
              columns={cooperationColumns}
              loading={isLoadingRequests || isCancelling}
              rowKey={(record) => record._id}
              pagination={{ pageSize: 10 }}
            />
          </Tabs.TabPane>
          <Tabs.TabPane tab="Yêu cầu mở chuyến đi" key="trip">
            <TripRequestTab/>
          </Tabs.TabPane>
        </Tabs>
      </div>
    </div>
  );
};

export default Requirements;
