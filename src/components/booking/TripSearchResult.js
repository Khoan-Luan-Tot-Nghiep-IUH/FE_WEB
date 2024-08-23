import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { searchTrips } from "../../api/tripApi";
import Layout from "../layout"; // Make sure the path is correct based on your folder structure

const TripSearchResult = () => {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const searchParams = {
          departureLocation: queryParams.get("departureLocation"),
          arrivalLocation: queryParams.get("arrivalLocation"),
          departureDate: queryParams.get("departureDate"),
          returnDate: queryParams.get("returnDate"),
          ticketCount: queryParams.get("ticketCount"),
        };

        const result = await searchTrips(searchParams);
        setTrips(result);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch search results.");
        setLoading(false);
      }
    };

    fetchTrips();
  }, [location.search]);

  return (
    <Layout>
      <div>
        <h1>Kết quả tìm kiếm</h1>
        {loading ? (
          <div>Loading...</div>
        ) : error ? (
          <div>{error}</div>
        ) : trips.length > 0 ? (
          <ul>
            {trips.map((trip) => (
              <div key={trip._id}>
                <h3>From: {trip.departureLocation?.name}</h3>
                <p>To: {trip.arrivalLocation?.name}</p>
                <p>Departure: {new Date(trip.departureTime).toLocaleString()}</p>
                <p>Arrival: {new Date(trip.arrivalTime).toLocaleString()}</p>
                <p>Price: {trip.price} VND</p>
              </div>
            ))}
          </ul>
        ) : (
          <div>No trips found</div>
        )}
      </div>
    </Layout>
  );
};

export default TripSearchResult;
