import React from "react";
import TripCard from "./TripCard";
import styles from "./TripSearchResult.module.css";

const TripList = ({ trips, onBookTrip, title }) => (
  <div className={styles.tripSection}>
    <h2>{title}</h2>
    {trips.length > 0 ? (
      trips.map((trip) => (
        <TripCard key={trip._id} trip={trip} onBookTrip={onBookTrip} />
      ))
    ) : (
      <p>Không có chuyến đi nào phù hợp với tiêu chí tìm kiếm của bạn.</p>
    )}
  </div>
);

export default TripList;
