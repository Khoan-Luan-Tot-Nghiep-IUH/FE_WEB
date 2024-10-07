import React , { useState }from 'react';
import { Link } from 'react-router-dom';
import { useDeleteTripMutation } from '../../../../Redux/Trip/TripApiSlice';
import { useDispatch } from 'react-redux';
import { setTrips, setError, setSuccess } from '../../../../Redux/Trip/TripSlice';
import { Table, Button, Popconfirm } from 'antd';
import Notification from '../../../../components/shared/Notification/Notification'; 

const TripList = ({ trips, openDrawer, hideAddButton ,refetch  }) => {
  const dispatch = useDispatch();
  const [deleteTrip, { isLoading: isDeleting }] = useDeleteTripMutation();
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
    console.log("Chỉnh sửa chuyến đi:", record);
    openDrawer(record); 
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
      render: (text) => <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full">{text}</span>,
    },
    {
      title: 'Thời gian khởi hành',
      dataIndex: 'departureTime',
      key: 'departureTime',
      render: (text) => new Date(text).toLocaleString(),
    },
    {
      title: 'Thao tác',
      key: 'action',
      render: (text, record) => (
        <span>
          <Link to={`/trips/${record._id}`} className="text-blue-500 hover:text-blue-700 mr-4">
            Chi tiết
          </Link>
          <Button
            type="link"
            className="text-yellow-500"
            onClick={() => handleEdit(record)}
          >
            Sửa
          </Button>
          <Popconfirm
            title="Bạn có chắc chắn muốn xóa chuyến đi này không?"
            onConfirm={() => handleDelete(record._id)}
            okText="Có"
            cancelText="Không"
          >
            <Button type="link" className="text-red-500">
              Xóa
            </Button>
          </Popconfirm>
        </span>
      ),
    },
  ];

  return (
    <div>
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
