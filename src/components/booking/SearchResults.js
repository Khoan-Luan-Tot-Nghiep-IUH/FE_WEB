// src/pages/SearchResults.j
import React, { useEffect, useState } from 'react';
import { searchTrips } from '../../api/tripApi';
import Layout from '../layout';

const SearchResults = ({ location }) => {
  const [trips, setTrips] = useState([]);

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const query = new URLSearchParams(location.search);
        const departureLocation = query.get('departureLocation');
        const arrivalLocation = query.get('arrivalLocation');
        const departureDate = query.get('departureDate');

        const results = await searchTrips({ departureLocation, arrivalLocation, departureDate });
        setTrips(results);
      } catch (error) {
        console.error('Failed to fetch search results:', error);
      }
    };

    fetchTrips();
  }, [location.search]);

  return (
    <Layout>
      <div>
        <h1>Kết quả tìm kiếm</h1>
        {trips.length > 0 ? (
          trips.map((trip) => (
            <div key={trip._id}>
              <h2>{trip.departureLocation.name} - {trip.arrivalLocation.name}</h2>
              <p>Departure Time: {new Date(trip.departureTime).toLocaleString()}</p>
              <p>Arrival Time: {new Date(trip.arrivalTime).toLocaleString()}</p>
              <p>Price: {trip.price}</p>
            </div>
          ))
        ) : (
          <p>Không tìm thấy chuyến nào.</p>
        )}
      </div>
    </Layout>
  );
};

export default SearchResults;
