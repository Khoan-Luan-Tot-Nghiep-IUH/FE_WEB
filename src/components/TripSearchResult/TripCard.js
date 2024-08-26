import React from "react";
import styles from "./TripSearchResult.module.css";

const TripCard = ({ trip, onBookTrip }) => (
  <div className={styles.tripCard}>
    <div className={styles.tripInfo}>
      <h3>
        {trip.departureLocation.name} → {trip.arrivalLocation.name}
      </h3>
      <p>Giờ đi: {formatTime(trip.departureTime)}</p>
      <p>Giờ đến: {formatTime(trip.arrivalTime)}</p>
      <p>Giá vé: {trip.basePrice} VND</p>
      <p>Số chỗ trống: {trip.totalSeats} chỗ</p>
    </div>
    <button
      className={styles.bookButton}
      onClick={() => onBookTrip(trip._id)}
    >
      Đặt vé
    </button>
  </div>
);

const formatTime = (time) => {
  const date = new Date(time);
  return date.toLocaleTimeString("vi-VN", {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "UTC",
  });
};

export default TripCard;
