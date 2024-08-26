import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { searchTrips } from "../../api/tripApi";
import Layout from "../layout";
import FilterSection from "./FilterSection";
import TripList from "./TripList";
import styles from "./TripSearchResult.module.css";

const TripSearchResult = () => {
  const [departureTrips, setDepartureTrips] = useState([]);
  const [returnTrips, setReturnTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [departureTimeFilter, setDepartureTimeFilter] = useState([]);
  const [busTypeFilter, setBusTypeFilter] = useState([]);
  const [seatLocationFilter, setSeatLocationFilter] = useState("");

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const searchParams = {
          departureLocation: queryParams.get("departureLocation"),
          arrivalLocation: queryParams.get("arrivalLocation"),
          departureDate: queryParams.get("departureDate"),
          returnDate: queryParams.get("returnDate"),
        };

        const result = await searchTrips(searchParams);
        setDepartureTrips(result.departureTrips);
        setReturnTrips(result.returnTrips || []);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch search results.");
        setLoading(false);
      }
    };

    fetchTrips();
  }, [location.search]);

  const handleBookTrip = (tripId, isReturnTrip = false) => {
    const path = isReturnTrip ? `/booking?returnTripId=${tripId}` : `/booking?tripId=${tripId}`;
    navigate(path);
  };

  const filteredDepartureTrips = filterTrips(departureTrips, departureTimeFilter, busTypeFilter, seatLocationFilter);
  const filteredReturnTrips = filterTrips(returnTrips, departureTimeFilter, busTypeFilter, seatLocationFilter);

  return (
    <Layout>
      <div className={styles.container}>
        <h1>Kết quả tìm kiếm</h1>
        {loading ? (
          <div>Loading...</div>
        ) : error ? (
          <div>{error}</div>
        ) : departureTrips.length > 0 ? (
          <div className={styles.resultsContainer}>
            <FilterSection
              departureTimeFilter={departureTimeFilter}
              setDepartureTimeFilter={setDepartureTimeFilter}
              busTypeFilter={busTypeFilter}
              setBusTypeFilter={setBusTypeFilter}
              seatLocationFilter={seatLocationFilter}
              setSeatLocationFilter={setSeatLocationFilter}
            />
            <TripList
              trips={filteredDepartureTrips}
              onBookTrip={handleBookTrip}
              title="Chuyến đi"
            />
            {filteredReturnTrips.length > 0 && (
              <TripList
                trips={filteredReturnTrips}
                onBookTrip={(tripId) => handleBookTrip(tripId, true)}
                title="Chuyến về"
              />
            )}
          </div>
        ) : (
          <div>Không có chuyến xe nào được tìm thấy</div>
        )}
      </div>
    </Layout>
  );
};

export default TripSearchResult;

const filterTrips = (trips, departureTimeFilter, busTypeFilter, seatLocationFilter) => {
  return trips.filter((trip) => {
    const matchesTime =
      departureTimeFilter.length === 0 ||
      departureTimeFilter.some((timeRange) =>
        isTimeInRange(trip.departureTime, timeRange)
      );

    const matchesBusType =
      busTypeFilter.length === 0 || busTypeFilter.includes(trip.busType.name);

    const matchesSeatLocation =
      !seatLocationFilter ||
      (seatLocationFilter === "front" && trip.frontSeatsAvailable > 0) ||
      (seatLocationFilter === "middle" && trip.middleSeatsAvailable > 0) ||
      (seatLocationFilter === "back" && trip.backSeatsAvailable > 0);

    return matchesTime && matchesBusType && matchesSeatLocation;
  });
};

const isTimeInRange = (time, range) => {
  const hour = new Date(time).getUTCHours();
  switch (range) {
    case "morning":
      return hour >= 0 && hour < 6;
    case "forenoon":
      return hour >= 6 && hour < 12;
    case "afternoon":
      return hour >= 12 && hour < 18;
    case "evening":
      return hour >= 18 && hour < 24;
    default:
      return true;
  }
};
