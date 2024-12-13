import React, { useState } from 'react';
import { useGetTripPassengersQuery, useCollectPaymentMutation } from '../../../../Redux/Company/companyApiSlice';
import { Table, Spin, Alert, Typography, Divider, Button, message, Popconfirm, Input } from 'antd';
import { formatCurrency } from 'utils/formatUtils';

const { Title, Text } = Typography;
const { Search } = Input;

const TripBookings = ({ tripId, onClose }) => {
  const { data, isLoading, error, refetch } = useGetTripPassengersQuery(tripId);
  const [collectPayment, { isLoading: isCollectingPayment }] = useCollectPaymentMutation();
  const [selectedPassenger, setSelectedPassenger] = useState(null);
  const [searchText, setSearchText] = useState('');

  // Handle Payment
  const handleCollectPayment = async (bookingId) => {
    try {
      await collectPayment(bookingId).unwrap();
      message.success('Thanh toán thành công.');
      refetch(); // Refresh data
    } catch (err) {
      message.error(err.data?.message || 'Lỗi khi thu tiền.');
    }
  };

  // Handle Search
  const handleSearch = (value) => {
    setSearchText(value.toLowerCase());
  };

  // Filtered Data
  const filteredPassengers = data?.data?.passengers.filter((passenger) => {
    const fullName = passenger?.userDetails?.fullName?.toLowerCase() || '';
    const phoneNumber = passenger?.userDetails?.phoneNumber || '';
    return fullName.includes(searchText) || phoneNumber.includes(searchText);
  });

  // Table Columns
  const columns = [
    {
      title: 'Họ tên',
      dataIndex: ['userDetails', 'fullName'],
      key: 'fullName',
      sorter: (a, b) => a.userDetails.fullName.localeCompare(b.userDetails.fullName),
      render: (text) => text || 'Không xác định',
    },
    {
      title: 'Số điện thoại',
      dataIndex: ['userDetails', 'phoneNumber'],
      key: 'phoneNumber',
      sorter: (a, b) => a.userDetails.phoneNumber(b.userDetails.phoneNumber),
    },
    {
      title: 'Ghế đã đặt',
      dataIndex: 'seatNumbers',
      key: 'seatNumbers',
      render: (seats) => seats?.join(', ') || 'Chưa chọn ghế',
    },
    {
      title: 'Tổng tiền',
      dataIndex: 'totalPrice',
      key: 'totalPrice',
      sorter: (a, b) => a.totalPrice - b.totalPrice,
      render: (price) => formatCurrency(price),
    },
    {
      title: 'Trạng thái thanh toán',
      dataIndex: 'paymentStatus',
      key: 'paymentStatus',
      render: (status) => (
        <span
          className={`font-medium ${
            status === 'Paid' ? 'text-green-600' : 'text-red-600'
          }`}
        >
          {status === 'Paid' ? 'Đã thanh toán' : 'Chưa thanh toán'}
        </span>
      ),
    },
    {
      title: 'Thao tác',
      key: 'action',
      render: (text, record) => (
        record.paymentStatus === 'Unpaid' && (
          <Popconfirm
            title="Bạn có chắc chắn muốn thu tiền vé này không?"
            onConfirm={() => handleCollectPayment(record._id)}
            okText="Có"
            cancelText="Không"
          >
            <Button
              type="primary"
              loading={isCollectingPayment && selectedPassenger === record._id}
              onClick={() => setSelectedPassenger(record._id)}
            >
              Thu tiền
            </Button>
          </Popconfirm>
        )
      ),
    },
  ];

  // Handle Loading and Error States
  if (isLoading) return <Spin size="large" className="flex justify-center items-center mt-10" />;
  if (error)
    return <Alert type="error" message="Lỗi khi tải dữ liệu hành khách" showIcon className="mt-4" />;

  // Calculate Totals
  const totalDue = data?.data?.totalDue || 0;
  const totalPaid = data?.data?.totalPaid || 0;
  const totalUnpaid = data?.data?.totalUnpaid || 0;

  return (
    <div className="p-4">
      <Title level={4} className="mb-4">
        Danh sách đặt vé
      </Title>

      {/* Search Input */}
      <div className="mb-4">
        <Search
          placeholder="Tìm kiếm theo tên hoặc số điện thoại"
          enterButton="Tìm kiếm"
          onSearch={handleSearch}
          allowClear
        />
      </div>

      {/* Data Table */}
      <Table
        columns={columns}
        dataSource={filteredPassengers}
        rowKey={(record) => record._id}
        pagination={{ pageSize: 5 }}
        bordered
        locale={{ emptyText: 'Không có hành khách nào' }}
      />

      <Divider />

      {/* Financial Summary */}
      <div className="grid grid-cols-3 gap-4 mt-6">
        <div>
          <Text strong>Tổng số phải thu:</Text>
          <Text className="block">{formatCurrency(totalDue)}</Text>
        </div>
        <div>
          <Text strong>Đã thu:</Text>
          <Text className="block text-green-600">{formatCurrency(totalPaid)}</Text>
        </div>
        <div>
          <Text strong>Còn lại:</Text>
          <Text className="block text-red-600">{formatCurrency(totalUnpaid)}</Text>
        </div>
      </div>

      {/* Close Button */}
      <div className="flex justify-end mt-8">
        <Button type="primary" onClick={onClose} size="large">
          Đóng
        </Button>
      </div>
    </div>  
  );
};

export default TripBookings;
