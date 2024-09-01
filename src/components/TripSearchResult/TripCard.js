import React, { useState } from "react";
import styles from "./TripSearchResult.module.css";
import axios from "axios";

const TripCard = ({ trip, onBookTrip }) => {
  const [showSeatSelection, setShowSeatSelection] = useState(false);
  const [seats, setSeats] = useState({ lower: [], upper: [] }); // Khởi tạo seats với các tầng rỗng
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const formatTime = (time) => {
    const date = new Date(time);
    return date.toLocaleTimeString("vi-VN", {
      hour: "2-digit",
      minute: "2-digit",
      timeZone: "UTC", // Sử dụng UTC
    });
  };

  const formatDuration = (durationInMinutes) => {
    const hours = Math.floor(durationInMinutes / 60);
    const minutes = durationInMinutes % 60;
    return `${hours} giờ ${minutes} phút`;
  };

  const duration = (new Date(trip.arrivalTime) - new Date(trip.departureTime)) / 60000;

  const handleSeatSelection = async (e) => {
    e.preventDefault();
    setShowSeatSelection(!showSeatSelection);
    if (!showSeatSelection) {
      setIsLoading(true);
      try {
        const response = await axios.get(`http://localhost:5000/api/trips/${trip._id}/seats`);
        setSeats(response.data.data || { lower: [], upper: [] });
      } catch (error) {
        console.error("Error fetching seats:", error);
        setSeats({ lower: [], upper: [] }); // Đảm bảo `seats` luôn có cấu trúc đúng
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleSeatClick = (seat) => {
    if (selectedSeats.includes(seat.seatNumber)) {
      setSelectedSeats(selectedSeats.filter(s => s !== seat.seatNumber));
    } else {
      setSelectedSeats([...selectedSeats, seat.seatNumber]);
    }
  };

  return (
    <div className={styles.tripCard}>
      <div className={styles.mainInfo}>
        <div className={styles.timeInfo}>
          <span className={styles.departureTime}>{formatTime(trip.departureTime)}</span>
          <span className={styles.duration}>{formatDuration(duration)} (UTC)</span>
          <span className={styles.arrivalTime}>{formatTime(trip.arrivalTime)}</span>
        </div>
        <div className={styles.locationInfo}>
          <span className={styles.departureLocation}>{trip.departureLocation.name}</span>
          <span className={styles.arrivalLocation}>{trip.arrivalLocation.name}</span>
        </div>
        <div className={styles.busInfo}>
          <span>{trip.busType.name}</span>
          <span>{trip.availableSeats} chỗ trống</span>
        </div>
        <div className={styles.priceInfo}>
          <span>{trip.basePrice.toLocaleString("vi-VN")}đ</span>
          <button className={styles.bookButton} onClick={handleSeatSelection}>
            Chọn ghế
          </button>
        </div>
      </div>
      <div className={styles.extraInfo}>
        <a href="#" onClick={handleSeatSelection}>Chọn ghế</a>
        <a href="#">Lịch trình</a>
        <a href="#">Trung chuyển</a>
        <a href="#">Chính sách</a>
      </div>

      {showSeatSelection && (
        <div className={styles.seatSelection}>
          <h4>Chọn ghế</h4>
          {isLoading ? (
            <p>Đang tải ghế...</p>
          ) : (
            <div className={styles.seatMap}>
              <div className={styles.floor}>
                <h5>Tầng dưới</h5>
                <div className={styles.seatRow}>
                  {seats.lower.map(seat => (
                    <div
                      key={seat._id}
                      className={`${styles.seat} ${seat.isAvailable ? (selectedSeats.includes(seat.seatNumber) ? styles.selected : styles.available) : styles.sold}`}
                      onClick={() => seat.isAvailable && handleSeatClick(seat)}
                    >
                      {seat.seatNumber}
                    </div>
                  ))}
                </div>
              </div>
              <div className={styles.floor}>
                <h5>Tầng trên</h5>
                <div className={styles.seatRow}>
                  {seats.upper.map(seat => (
                    <div
                      key={seat._id}
                      className={`${styles.seat} ${seat.isAvailable ? (selectedSeats.includes(seat.seatNumber) ? styles.selected : styles.available) : styles.sold}`}
                      onClick={() => seat.isAvailable && handleSeatClick(seat)}
                    >
                      {seat.seatNumber}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default TripCard;
