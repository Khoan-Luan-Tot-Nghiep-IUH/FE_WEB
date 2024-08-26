import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { searchTrips } from "../../api/tripApi";
import Layout from "../layout";
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

  const handleDepartureTimeFilterChange = (timeRange) => {
    setDepartureTimeFilter((prevState) =>
      prevState.includes(timeRange)
        ? prevState.filter((time) => time !== timeRange)
        : [...prevState, timeRange]
    );
  };

  const handleBusTypeFilterChange = (type) => {
    setBusTypeFilter((prevState) =>
      prevState.includes(type)
        ? prevState.filter((busType) => busType !== type)
        : [...prevState, type]
    );
  };

  const handleSeatLocationFilterChange = (location) => {
    setSeatLocationFilter(location);
  };

  const formatTime = (time) => {
    const date = new Date(time);
    return date.toLocaleTimeString("vi-VN", {
      hour: "2-digit",
      minute: "2-digit",
      timeZone: "UTC", 
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

  const filterTrips = (trips) => {
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

  const filteredDepartureTrips = filterTrips(departureTrips);
  const filteredReturnTrips = filterTrips(returnTrips);

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
            {/* Filter Sidebar */}
            <div className={styles.filterContainer}>
              <h3>Bộ Lọc Tìm Kiếm</h3>

              <div className={styles.filterSection}>
                <h4>Giờ đi</h4>
                <div>
                  <label>
                    <input
                      type="checkbox"
                      onChange={() => handleDepartureTimeFilterChange("morning")}
                    />
                    Sáng sớm (00:00 - 5:59)
                  </label>
                  <label>
                    <input
                      type="checkbox"
                      onChange={() => handleDepartureTimeFilterChange("forenoon")}
                    />
                    Buổi sáng (06:00 - 11:59)
                  </label>
                  <label>
                    <input
                      type="checkbox"
                      onChange={() => handleDepartureTimeFilterChange("afternoon")}
                    />
                    Buổi chiều (12:00 - 17:59)
                  </label>
                  <label>
                    <input
                      type="checkbox"
                      onChange={() => handleDepartureTimeFilterChange("evening")}
                    />
                    Buổi tối (18:00 - 24:00)
                  </label>
                </div>
              </div>

              <div className={styles.filterSection}>
                <h4>Loại xe</h4>
                <div>
                  <label>
                    <input
                      type="checkbox"
                      onChange={() => handleBusTypeFilterChange("Ghế Ngồi")}
                    />
                    Ghế
                  </label>
                  <label>
                    <input
                      type="checkbox"
                      onChange={() => handleBusTypeFilterChange("Giường Nằm")}
                    />
                    Giường
                  </label>
                  <label>
                    <input
                      type="checkbox"
                      onChange={() => handleBusTypeFilterChange("Limousine")}
                    />
                    Limousine
                  </label>
                </div>
              </div>

              <div className={styles.filterSection}>
                <h4>Hàng ghế</h4>
                <div>
                  <label>
                    <input
                      type="radio"
                      name="seatLocation"
                      onChange={() => handleSeatLocationFilterChange("Front")}
                    />
                    Hàng đầu
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="seatLocation"
                      onChange={() => handleSeatLocationFilterChange("Middle")}
                    />
                    Hàng giữa
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="seatLocation"
                      onChange={() => handleSeatLocationFilterChange("Back")}
                    />
                    Hàng cuối
                  </label>
                </div>
              </div>
            </div>

            {/* Trip Results */}
            <div className={styles.results}>
              <div className={styles.tripSection}>
                <h2>Chuyến đi</h2>
                {filteredDepartureTrips.length > 0 ? (
                  filteredDepartureTrips.map((trip) => (
                    <div key={trip._id} className={styles.tripCard}>
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
                        onClick={() => handleBookTrip(trip._id)}
                      >
                        Đặt vé
                      </button>
                    </div>
                  ))
                ) : (
                  <p>Không có chuyến đi nào phù hợp với tiêu chí tìm kiếm của bạn.</p>
                )}
              </div>

              {filteredReturnTrips.length > 0 && (
                <div className={styles.tripSection}>
                  <h2>Chuyến về</h2>
                  {filteredReturnTrips.map((trip) => (
                    <div key={trip._id} className={styles.tripCard}>
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
                        onClick={() => handleBookTrip(trip._id, true)}
                      >
                        Đặt vé chuyến về
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ) : (
          <div>Không có chuyến xe nào được tìm thấy</div>
        )}
      </div>
    </Layout>
  );
};

export default TripSearchResult;
