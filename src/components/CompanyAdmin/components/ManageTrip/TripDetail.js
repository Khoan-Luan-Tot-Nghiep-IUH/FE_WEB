import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const TripDetail = () => {
  const { id } = useParams();
  const [trip, setTrip] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTrip();
  }, []);

  const fetchTrip = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`/api/trips/${id}`);
      setTrip(response.data.data);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching trip', err);
      setLoading(false);
    }
  };

  if (loading) {
    return <p>Đang tải chi tiết chuyến đi...</p>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Chi Tiết Chuyến Đi</h1>

      {trip && (
        <>
          <p>Điểm khởi hành: {trip.departureLocation.name}</p>
          <p>Điểm đến: {trip.arrivalLocation.name}</p>
          <p>Loại xe: {trip.busType.name}</p>
          <p>Thời gian khởi hành: {new Date(trip.departureTime).toLocaleString()}</p>

          {/* List of Seats */}
          <h2 className="text-xl font-bold mt-4">Danh sách ghế</h2>
          <ul>
            {trip.seats.map((seat) => (
              <li key={seat._id}>
                Ghế {seat.seatNumber} - {seat.isAvailable ? 'Còn trống' : 'Đã đặt'}
              </li>
            ))}
          </ul>

          <div className="mt-4">
            <Link to={`/trips/${trip._id}/edit`} className="bg-yellow-500 text-white px-4 py-2 rounded">
              Sửa chuyến đi
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default TripDetail;
