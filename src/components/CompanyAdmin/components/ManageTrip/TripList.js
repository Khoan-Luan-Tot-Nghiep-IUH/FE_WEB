import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDeleteTripMutation, useUpdateTripDriversMutation } from '../../../../Redux/Trip/TripApiSlice';
import { useGetDriversQuery } from '../../../../Redux/Company/companyApiSlice';
import { useDispatch } from 'react-redux';
import { setTrips, setError, setSuccess } from '../../../../Redux/Trip/TripSlice';
import { Table, Button, Popconfirm, Modal, Select, Spin, Tooltip } from 'antd';
import Notification from '../../../../components/shared/Notification/Notification';
import { FaEdit, FaTrash, FaEye, FaUserPlus } from 'react-icons/fa';
import { formatCurrency, timeUtils } from 'utils/formatUtils';
import moment from 'moment-timezone';

const TripList = ({ trips, openDrawer, hideAddButton, refetch }) => {
  const dispatch = useDispatch();
  const [deleteTrip] = useDeleteTripMutation();
  const [updateTripDrivers] = useUpdateTripDriversMutation();
  const [notification, setNotification] = useState({ open: false, severity: '', message: '' });
  const [selectedTrip, setSelectedTrip] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedDrivers, setSelectedDrivers] = useState([]);

  // Lấy danh sách tài xế từ API
  const { data: driversData, isLoading: isDriversLoading } = useGetDriversQuery();

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

  const handleAddDriver = (trip) => {
    setSelectedTrip(trip);
    setIsModalVisible(true);
  };

  const handleConfirmAddDriver = async () => {
    if (!selectedDrivers.length) {
      showNotification('error', 'Bạn phải chọn ít nhất một tài xế');
      return;
    }
    try {
      await updateTripDrivers({
        tripId: selectedTrip._id,
        driverIds: selectedDrivers,
      }).unwrap();
      showNotification('success', 'Thêm tài xế thành công.');
      setIsModalVisible(false);
      refetch();
    } catch (err) {
      const errorMessage = err.data.message || 'Lỗi khi thêm tài xế.';
      const conflictingDrivers = err.data.conflictingDrivers || [];
      const conflictingDriversMessage = conflictingDrivers.length
        ? `Các tài xế gây xung đột: ${conflictingDrivers.join(', ')}`
        : '';
      
      showNotification('error', `${errorMessage} ${conflictingDriversMessage}`);
    }
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
      title: 'Tài xế',
      dataIndex: 'drivers',
      key: 'drivers',
      render: (drivers) => (
        drivers && drivers.length > 0 ? (
          drivers.map((driver) => <span key={driver._id}>{driver.userId?.fullName}</span>)
        ) : (
          <span className="text-rose-400">Chưa có tài xế</span>
        )
      ),
    },
    {
      title: 'Thao tác',
      key: 'action',
      render: (text, record) => (
        <div className="flex space-x-2">
          <Tooltip title="Chi tiết">
            <Link to={`/trips/${record._id}`} className="text-blue-500 hover:text-blue-700">
              <FaEye className="inline mr-1 text-lg align-middle" />
            </Link>
          </Tooltip>
          <Tooltip title="Sửa">
            <Button
              type="link"
              className="text-yellow-500 hover:text-yellow-700"
              onClick={() => handleEdit(record)}
            >
              <FaEdit className="inline mr-1 text-lg align-middle" />
            </Button>
          </Tooltip>
          {!record.drivers || record.drivers.length === 0 ? (
            <Tooltip title="Thêm tài xế">
              <Button
                type="link"
                className="text-green-500 hover:text-green-700"
                onClick={() => handleAddDriver(record)}
              >
                <FaUserPlus className="inline mr-1 text-lg align-middle" />
              </Button>
            </Tooltip>
          ) : null}
          <Tooltip title="Xóa">
            <Popconfirm
              title="Bạn có chắc chắn muốn xóa chuyến đi này không?"
              onConfirm={() => handleDelete(record._id)}
              okText="Có"
              cancelText="Không"
            >
              <Button type="link" className="text-red-500 hover:text-red-700">
                <FaTrash className="inline mr-1 text-lg align-middle" />
              </Button>
            </Popconfirm>
          </Tooltip>
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
      <Modal
        title="Thêm tài xế"
        visible={isModalVisible}
        onOk={handleConfirmAddDriver}
        onCancel={() => setIsModalVisible(false)}
      >
        {isDriversLoading ? (
          <Spin />
        ) : driversData && Array.isArray(driversData.drivers) && driversData.drivers.length > 0 ? (
          <Select
            mode="multiple"
            style={{ width: '100%' }}
            placeholder="Chọn tài xế"
            onChange={(value) => setSelectedDrivers(value)}
          >
            {driversData.drivers.map((driver) => (
              <Select.Option key={driver._id} value={driver._id}>
                {driver.userId?.fullName ? driver.userId.fullName : 'Tên không xác định'}
              </Select.Option>
            ))}
          </Select>
        ) : (
          <p>Không có tài xế nào</p>
        )}
      </Modal>
    </div>
  );
};

export default TripList;
