import React from 'react';
import { Link } from 'react-router-dom';
import { useDeleteTripMutation } from '../../../Redux/Trip/TripApiSlice';
import { useDispatch } from 'react-redux';
import { setTrips, setError, setSuccess } from '../../../Redux/Trip/TripSlice'; 

const TripList = ({ trips }) => {
  const dispatch = useDispatch();

  const [deleteTrip, { isLoading: isDeleting }] = useDeleteTripMutation();

  // Hàm xử lý khi người dùng nhấn nút "Xóa"
  const handleDelete = async (tripId) => {
    const confirmDelete = window.confirm('Bạn có chắc chắn muốn xóa chuyến đi này?');
    if (confirmDelete) {
      try {
        // Gọi API xóa chuyến đi
        await deleteTrip(tripId).unwrap();
        dispatch(setSuccess('Xóa chuyến đi thành công.'));
        // Cập nhật lại danh sách chuyến đi sau khi xóa
        const updatedTrips = trips.filter((trip) => trip._id !== tripId);
        dispatch(setTrips(updatedTrips));
      } catch (error) {
        dispatch(setError('Lỗi khi xóa chuyến đi: ' + error.message));
      }
    }
  };

  if (!trips.length) {
    return <p>Không có chuyến đi nào.</p>;
  }

  return (
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
          <tr key={trip._id}>
            <td className="border px-4 py-2">{trip.departureLocation.name}</td>
            <td className="border px-4 py-2">{trip.arrivalLocation.name}</td>
            <td className="border px-4 py-2">{trip.busType.name}</td>
            <td className="border px-4 py-2">{new Date(trip.departureTime).toLocaleString()}</td>
            <td className="border px-4 py-2">
              <Link to={`/trips/${trip._id}`} className="text-blue-500 hover:underline">
                Chi tiết
              </Link>
              <Link to={`/trips/${trip._id}/edit`} className="ml-4 text-yellow-500 hover:underline">
                Sửa
              </Link>
              <button
                onClick={() => handleDelete(trip._id)}
                disabled={isDeleting} // Khóa nút nếu đang xóa
                className="ml-4 text-red-500 hover:underline"
              >
                {isDeleting ? 'Đang xóa...' : 'Xóa'}
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TripList;
