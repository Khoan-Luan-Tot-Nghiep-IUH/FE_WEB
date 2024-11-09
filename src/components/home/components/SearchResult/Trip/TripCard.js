import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import io from 'socket.io-client';
import TripDetails from './TripDetails';
import SeatSelection from './SeatSelection';
import { useGetSeatsByTripIdQuery } from '../../../../../Redux/Trip/TripApiSlice';

const TripCard = ({ trip, isOpen, onToggle, onReleaseSeats }) => {
  const navigate = useNavigate();
  const socketRef = useRef(null);
  const userInfo = useSelector((state) => state.user.userInfo);
  const userId = userInfo?.id;

  const [selectedSeats, setSelectedSeats] = useState([]);
  const [seatsData, setSeatsData] = useState({ lower: [], upper: [] }); 
  const [lockTimers, setLockTimers] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const { data: initialSeatsData, isLoading: isLoadingSeats } = useGetSeatsByTripIdQuery(trip._id, {
    skip: !isOpen,
  });

  const setupSocket = useCallback(() => {
    try {
      socketRef.current = io(process.env.REACT_APP_SOCKET_URL || 'http://localhost:5000', {
        reconnection: true,
        reconnectionAttempts: 5,
        reconnectionDelay: 1000,
      });

      socketRef.current.on('connect', () => {
        console.log('Connected to socket server');
        if (isOpen && trip._id) {
          socketRef.current.emit('joinTrip', trip._id);
          console.log(`Joining trip room: ${trip._id}`);
        }
      });

      socketRef.current.on('connect_error', (error) => {
        console.error('Socket connection error:', error);
        setError('Unable to connect to booking service. Please try again later.');
      });

      return () => {
        if (socketRef.current) {
          socketRef.current.disconnect();
        }
      };
    } catch (error) {
      console.error('Socket setup error:', error);
      setError('Unable to initialize booking service. Please try again later.');
    }
  }, [trip._id, isOpen]);

  useEffect(() => {
    if (initialSeatsData) {
      setSeatsData(initialSeatsData.data);
      setError(null);
    }
  }, [initialSeatsData]);

  useEffect(() => {
    if (!socketRef.current) {
      setupSocket();
    }

    const socket = socketRef.current;

    const handleSeatLocked = ({ seatNumber, lockedBy, lockExpiration }) => {
      setSeatsData((prevSeats) => ({
        lower: prevSeats.lower.map((seat) =>
          seat.seatNumber === seatNumber
            ? { ...seat, isAvailable: false, lockedBy, lockExpiration }
            : seat
        ),
        upper: prevSeats.upper.map((seat) =>
          seat.seatNumber === seatNumber
            ? { ...seat, isAvailable: false, lockedBy, lockExpiration }
            : seat
        ),
      }));
    };

    const handleSeatReleased = ({ seatNumber }) => {
      setSeatsData((prevSeats) => ({
        lower: prevSeats.lower.map((seat) =>
          seat.seatNumber === seatNumber
            ? { ...seat, isAvailable: true, lockedBy: null }
            : seat
        ),
        upper: prevSeats.upper.map((seat) =>
          seat.seatNumber === seatNumber
            ? { ...seat, isAvailable: true, lockedBy: null }
            : seat
        ),
      }));
    
      if (lockTimers[seatNumber]) {
        clearTimeout(lockTimers[seatNumber]);
        setLockTimers((prev) => {
          const newTimers = { ...prev };
          delete newTimers[seatNumber];
          return newTimers;
        });
      }
    };

    const handleError = ({ type, message }) => {
      setError(message);
      setLoading(false);

      if (type === 'RESERVE_ERROR') {
        setSelectedSeats((prev) => prev.filter((seat) => !seat.includes(message.seatNumber)));
      }
    };

    socket.on('seatLocked', handleSeatLocked);
    socket.on('seatReleased', handleSeatReleased);
    socket.on('error', handleError);
    socket.on('seatUnavailable', ({ seatNumber }) => {
      setError(`Ghế số ${seatNumber} không khả dụng`);
      setSelectedSeats((prev) => prev.filter((s) => s !== seatNumber));
    });

    return () => {
      socket.off('seatLocked', handleSeatLocked);
      socket.off('seatReleased', handleSeatReleased);
      socket.off('error', handleError);
      socket.off('seatUnavailable');
      Object.values(lockTimers).forEach(clearTimeout);
    };
  }, [userId, trip._id, setupSocket, lockTimers]);

  useEffect(() => {
    if (isOpen) {
      if (trip._id) {
        socketRef.current.emit('joinTrip', trip._id);
      }
    }
  }, [isOpen]);

  // Hàm để giải phóng tất cả ghế đã chọn
 
  const releaseSeats = () => {
    selectedSeats.forEach((seatNumber) => {
      socketRef.current.emit('releaseSeat', { tripId: trip._id, seatNumber });
    });
    setSelectedSeats([]);
  };
  useEffect(() => {
    if (onReleaseSeats) {
      onReleaseSeats(releaseSeats);
    }
  }, [onReleaseSeats, releaseSeats]);


  
  const handleSeatSelect = useCallback(
    async (seatNumber) => {
        if (!userId) {
            setError('Vui lòng đăng nhập để chọn ghế');
            return;
        }

        setLoading(true);
        setError(null);

        try {
            console.log("Selected seat number:", seatNumber);
            
            // Nếu ghế đã được chọn, người dùng muốn bỏ chọn
            if (selectedSeats.includes(seatNumber)) {
                const seat = [...seatsData.lower, ...seatsData.upper].find((seat) => seat.seatNumber === seatNumber);
                if (!seat.isAvailable && seat.lockedBy && seat.lockedBy !== userId) {
                    setError(`Seat ${seatNumber} is temporarily reserved by another user`);
                    return;
                }
                console.log("Releasing seat:", seatNumber);
                socketRef.current.emit('releaseSeat', { tripId: trip._id, seatNumber, userId });
                setSelectedSeats((prev) => prev.filter((s) => s !== seatNumber));
            } else {
                // Chọn ghế nếu chưa chọn
                console.log("Reserving seat:", seatNumber);
                socketRef.current.emit('reserveSeat', { tripId: trip._id, seatNumber, userId });
                setSelectedSeats((prev) => [...prev, seatNumber]);
            }
        } catch (error) {
            console.error("Error in seat selection:", error);
            setError('Failed to process seat selection. Please try again.');
        } finally {
            setLoading(false);
        }
    },
    [trip._id, userId, seatsData, selectedSeats]
);

  const handleContinue = useCallback(() => {
    if (selectedSeats.length === 0) {
      setError('Please select at least one seat to continue');
      return;
    }

    navigate('/bookingconfirmation', {
      state: {
        selectedSeats,
        totalPrice: selectedSeats.length * trip.basePrice,
        trip,
      },
    });
  }, [navigate, selectedSeats, trip]);

  return (
    <div className="bg-white rounded-lg shadow-lg mb-6 p-4 hover:shadow-xl transition-shadow duration-300">
      <TripDetails trip={trip} onToggle={onToggle} isOpen={isOpen} loading={loading} />
      {isOpen && (
        <SeatSelection
          seatsData={seatsData}
          isLoadingSeats={isLoadingSeats}
          handleSeatSelect={handleSeatSelect}
          selectedSeats={selectedSeats}
          lockTimers={lockTimers}
          loading={loading}
          totalPrice={selectedSeats.length * trip.basePrice}
          handleContinue={handleContinue}
          error={error}
          userId={userId}
        />
      )}
    </div>
  );
};

export default TripCard;
