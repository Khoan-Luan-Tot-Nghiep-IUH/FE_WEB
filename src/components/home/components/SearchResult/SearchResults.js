import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useSearchTripQuery } from '../../../../Redux/Trip/TripApiSlice';
import TripCard from '../SearchResult/Trip/TripCard';
import SkeletonLoader from '../../../shared/Loader/Loader';

const SearchResults = ({ filters }) => {
  const { state } = useLocation();
  const {
    departureLocation,
    arrivalLocation,
    departureDate,
    returnDate,
    ticketCount,
  } = state || {};

  const [filteredTrips, setFilteredTrips] = useState([]);
  const [allTrips, setAllTrips] = useState([]);
  const [loading, setLoading] = useState(true);

  const { data: trips, error, isLoading } = useSearchTripQuery({
    departureLocation,
    arrivalLocation,
    departureDate,
    returnDate,
    ticketCount,
  });

  useEffect(() => {
    if (trips?.data?.departureTrips) {
      setAllTrips(trips.data.departureTrips);
      setFilteredTrips(trips.data.departureTrips);
    }
  }, [trips]);

  useEffect(() => {
    setLoading(true);


    const delayDebounceFn = setTimeout(() => {
      const applyFilters = () => {
        let filtered = [...allTrips];

        if (filters.priceRange === 'low') {
          filtered = filtered.filter(trip => trip.basePrice < 200000);
        } else if (filters.priceRange === 'medium') {
          filtered = filtered.filter(trip => trip.basePrice >= 200000 && trip.basePrice <= 500000);
        } else if (filters.priceRange === 'high') {
          filtered = filtered.filter(trip => trip.basePrice > 500000);
        }

        if (filters.busOperator) {
          filtered = filtered.filter(trip => trip.busType?.name === filters.busOperator);
        }

        if (filters.departureTimeRange === 'morning') {
          filtered = filtered.filter(trip => {
            const hour = new Date(trip.departureTime).getHours();
            return hour >= 6 && hour < 12;
          });
        } else if (filters.departureTimeRange === 'afternoon') {
          filtered = filtered.filter(trip => {
            const hour = new Date(trip.departureTime).getHours();
            return hour >= 12 && hour < 18;
          });
        }

        // Sắp xếp chuyến đi
        if (filters.sort === 'priceAsc') {
          filtered.sort((a, b) => a.basePrice - b.basePrice); // Sắp xếp giá tăng dần
        } else if (filters.sort === 'priceDesc') {
          filtered.sort((a, b) => b.basePrice - a.basePrice); // Sắp xếp giá giảm dần
        } else if (filters.sort === 'earliest') {
          filtered.sort((a, b) => new Date(a.departureTime) - new Date(b.departureTime)); // Sắp xếp giờ đi sớm nhất
        } else if (filters.sort === 'latest') {
          filtered.sort((a, b) => new Date(b.departureTime) - new Date(a.departureTime)); // Sắp xếp giờ đi muộn nhất
        }

        setFilteredTrips(filtered); // Cập nhật danh sách sau khi lọc và sắp xếp
        setLoading(false); // Tắt trạng thái loading khi kết thúc
      };

      applyFilters(); // Gọi hàm lọc sau thời gian delay
    }, 500); // Thêm độ trễ 500ms

    return () => clearTimeout(delayDebounceFn); // Xóa timeout nếu component bị unmount
  }, [filters, allTrips]);

  // Hiển thị loading
  if (loading || isLoading) {
    return (
      <div className="container mx-auto py-8">
        <SkeletonLoader /> {/* Giả sử bạn có component SkeletonLoader */}
      </div>
    );
  }

  if (error) return <div>Không tìm thấy chuyến xe. Lỗi: {error.message}</div>;

  // Nếu không có chuyến đi phù hợp sau khi lọc và sắp xếp
  if (filteredTrips.length === 0) {
    return <div>Không tìm thấy chuyến xe nào phù hợp với yêu cầu tìm kiếm của bạn.</div>;
  }

  return (
    <div className="container mx-auto py-8">
      <h2 className="text-2xl font-bold mb-4">Kết quả tìm kiếm chuyến xe</h2>

      <div className="space-y-4">
        {filteredTrips.map((trip) => (
          <TripCard key={trip._id} trip={trip} />
        ))}
      </div>
    </div>
  );
};

export default SearchResults;
