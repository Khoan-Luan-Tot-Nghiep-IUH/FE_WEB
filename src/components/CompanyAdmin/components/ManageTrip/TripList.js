import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDeleteTripMutation } from '../../../../Redux/Trip/TripApiSlice';
import { useDispatch } from 'react-redux';
import { setTrips, setError, setSuccess } from '../../../../Redux/Trip/TripSlice';
import Modal from 'react-modal';

const TripList = ({ trips }) => {
  const dispatch = useDispatch();
  const [deleteTrip, { isLoading: isDeleting }] = useDeleteTripMutation();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedTrip, setSelectedTrip] = useState(null);

  const handleDelete = async () => {
    if (selectedTrip) {
      try {
        await deleteTrip(selectedTrip).unwrap();
        dispatch(setSuccess('Xóa chuyến đi thành công.'));
        const updatedTrips = trips.filter((trip) => trip._id !== selectedTrip);
        dispatch(setTrips(updatedTrips));
        setModalIsOpen(false); 
      } catch (error) {
        dispatch(setError('Lỗi khi xóa chuyến đi: ' + error.message));
      }
    }
  };

  const openModal = (tripId) => {
    setSelectedTrip(tripId);
    setModalIsOpen(true);
  };

  if (!trips.length) {
    return <p className="text-center text-gray-500">Không có chuyến đi nào.</p>;
  }

  return (
    <div className="relative">
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center"
        contentLabel="Xác nhận xóa chuyến đi"
      >
        <div className="bg-white p-6 rounded-md shadow-lg">
          <h2 className="text-xl font-semibold text-red-500">Xác nhận xóa</h2>
          <p className="mt-4">Bạn có chắc chắn muốn xóa chuyến đi này không?</p>
          <div className="mt-6 flex justify-end space-x-4">
            <button
              className="bg-gray-400 px-4 py-2 rounded hover:bg-gray-500 text-white"
              onClick={() => setModalIsOpen(false)}
            >
              Hủy
            </button>
            <button
              className="bg-red-500 px-4 py-2 rounded hover:bg-red-600 text-white"
              onClick={handleDelete}
            >
              {isDeleting ? 'Đang xóa...' : 'Xóa'}
            </button>
          </div>
        </div>
      </Modal>

      {/* Bảng danh sách chuyến đi */}
      <table className="table-auto w-full bg-white shadow-md rounded-lg">
        <thead>
          <tr className="bg-gray-200">
            <th className="px-4 py-2">Điểm khởi hành</th>
            <th className="px-4 py-2">Điểm đến</th>
            <th className="px-4 py-2">Loại xe</th>
            <th className="px-4 py-2">Thời gian khởi hành</th>
            <th className="px-4 py-2">Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {trips.map((trip) => (
            <tr
              key={trip._id}
              className="border hover:bg-gray-100 transition-colors duration-150"
            >
              <td className="border px-4 py-2">{trip.departureLocation.name}</td>
              <td className="border px-4 py-2">{trip.arrivalLocation.name}</td>
              <td className="border px-4 py-2">
                <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full">
                  {trip.busType.name}
                </span>
              </td>
              <td className="border px-4 py-2">{new Date(trip.departureTime).toLocaleString()}</td>
              <td className="border px-4 py-2">
                <Link to={`/trips/${trip._id}`} className="text-blue-500 hover:underline">
                  Chi tiết
                </Link>
                <Link to={`/trips/${trip._id}/edit`} className="ml-4 text-yellow-500 hover:underline">
                  Sửa
                </Link>
                <button
                  onClick={() => openModal(trip._id)}
                  className="ml-4 text-red-500 hover:underline"
                >
                  Xóa
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TripList;
