import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDeleteTripMutation } from '../../../../Redux/Trip/TripApiSlice';
import { useDispatch } from 'react-redux';
import { setTrips, setError, setSuccess } from '../../../../Redux/Trip/TripSlice';
import { Table, Button, Popconfirm } from 'antd';
import Notification from '../../../../components/shared/Notification/Notification';
import { FaEdit, FaTrash, FaEye } from 'react-icons/fa'; // Import biểu tượng từ react-icons
import { formatCurrency, formatDisplayTime, timeUtils } from 'utils/formatUtils';
import moment from 'moment-timezone';

const TripList = ({ trips, openDrawer, hideAddButton, refetch }) => {
  const dispatch = useDispatch();
  const [deleteTrip] = useDeleteTripMutation();
  const [notification, setNotification] = useState({ open: false, severity: '', message: '' });

  const showNotification = (severity, message) => {
    setNotification({ open: true, severity, message });
  };

  const handleDelete = async (tripId) => {
    try {
      await deleteTrip(tripId).unwrap();
      dispatch(setSuccess('Xóa chuyến đi thành công.'));
      const updatedTrips = trips.filter((trip) => trip._id !== tripId);
      dispatch(setTrips(updatedTrips));
      showNotification('success', 'Xóa chuyến đi thành công.');
      refetch();
    } catch (err) {
      dispatch(setError('Lỗi khi xóa chuyến đi: ' + err.message));
      showNotification('error', `Lỗi khi xóa chuyến đi: ${err.message}`);
    }
  };

  const handleEdit = (record) => {
    const tripToEdit = {
      ...record,
      departureTime: moment.utc(record.departureTime).toISOString(),
      arrivalTime: moment.utc(record.arrivalTime).toISOString(),
    };
    openDrawer(tripToEdit); 
  };
  const columns = [
    {
      title: 'Điểm khởi hành',
      dataIndex: ['departureLocation', 'name'],
      key: 'departureLocation',
    },
    {
      title: 'Điểm đến',
      dataIndex: ['arrivalLocation', 'name'],
      key: 'arrivalLocation',
    },
    {
      title: 'Loại xe',
      dataIndex: ['busType', 'name'],
      key: 'busType',
      render: (text) => <span className="bg-green-200 text-green-800 px-2 py-1 rounded-full">{text}</span>,
    },
    {
      title: 'Thời gian khởi hành',
      dataIndex: 'departureTime',
      key: 'departureTime',
      render: (text) => timeUtils.formatDisplayTime(text),
    },
    {
      title: 'Thời gian đến',
      dataIndex: 'arrivalTime',
      key: 'arrivalTime', 
      render: (text) => timeUtils.formatDisplayTime(text),
    },
    {
      title: 'Giá vé',
      dataIndex: 'basePrice',
      key: 'basePrice',
      render: (text) => formatCurrency(text),
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <span className={`px-2 py-1 rounded-full ${status === 'Scheduled' ? 'bg-blue-200 text-blue-800' : 'bg-gray-200 text-gray-800'}`}>
          {status}
        </span>
      ),
    },
    {
      title: 'Thao tác',
      key: 'action',
      render: (text, record) => (
        <div className="flex space-x-2">
          <Link to={`/trips/${record._id}`} className="text-blue-500 hover:text-blue-700">
            <FaEye className="inline mr-1 text-lg align-middle" /> Chi tiết
          </Link>
          <Button
            type="link"
            className="text-yellow-500 hover:text-yellow-700"
            onClick={() => handleEdit(record)}
          >
            <FaEdit className="inline mr-1 text-lg align-middle" /> Sửa
          </Button>
          <Popconfirm
            title="Bạn có chắc chắn muốn xóa chuyến đi này không?"
            onConfirm={() => handleDelete(record._id)}
            okText="Có"
            cancelText="Không"
          >
            <Button type="link" className="text-red-500 hover:text-red-700">
              <FaTrash className="inline mr-1 text-lg align-middle" /> Xóa
            </Button>
          </Popconfirm>
        </div>
      ),
    },
  ];

  return (
    <div className="p-4">
      <Table
        columns={columns}
        dataSource={trips}
        rowKey={(record) => record._id}
        pagination={false}
        bordered
        className="bg-white shadow-md rounded-lg overflow-hidden"
      />
      <Notification
        open={notification.open}
        severity={notification.severity}
        message={notification.message}
        onClose={() => setNotification({ ...notification, open: false })}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      />
    </div>
  );
};

export default TripList;
