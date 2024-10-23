import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useSearchTripQuery } from '../../../../Redux/Trip/TripApiSlice';
import TripCard from '../SearchResult/Trip/TripCard';
import SkeletonLoader from '../../../shared/Loader/Loader';

const SearchResults = ({ filters }) => {
  const location = useLocation();

  // Lấy các giá trị params từ URL thay vì sử dụng state
  const searchParams = new URLSearchParams(location.search);
  const departureLocation = searchParams.get('departureLocation');
  const arrivalLocation = searchParams.get('arrivalLocation');
  const departureDate = searchParams.get('departureDate');
  const returnDate = searchParams.get('returnDate');
  const ticketCount = searchParams.get('ticketCount');

  const [filteredTrips, setFilteredTrips] = useState([]);
  const [allTrips, setAllTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [tripDetails, setTripDetails] = useState(null);

  // Gọi API để tìm kiếm chuyến xe, mặc định gọi API không điều kiện
  const { data: trips, error, isLoading } = useSearchTripQuery({
    departureLocation,
    arrivalLocation,
    departureDate,
    returnDate,
    ticketCount,
  });

  // Cập nhật dữ liệu khi nhận được từ API
  useEffect(() => {
    if (trips?.data?.departureTrips) {
      setAllTrips(trips.data.departureTrips);
      setFilteredTrips(trips.data.departureTrips);
    }
  }, [trips]);

  // Áp dụng bộ lọc và cập nhật danh sách chuyến xe
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

        // Sort trips
        if (filters.sort === 'priceAsc') {
          filtered.sort((a, b) => a.basePrice - b.basePrice);
        } else if (filters.sort === 'priceDesc') {
          filtered.sort((a, b) => b.basePrice - a.basePrice);
        } else if (filters.sort === 'earliest') {
          filtered.sort((a, b) => new Date(a.departureTime) - new Date(b.departureTime));
        } else if (filters.sort === 'latest') {
          filtered.sort((a, b) => new Date(b.departureTime) - new Date(a.departureTime));
        }

        setFilteredTrips(filtered);
        setLoading(false);
      };

      applyFilters();
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [filters, allTrips]);

  // Đặt tất cả hooks trước khi kiểm tra điều kiện

  // Nếu thiếu params, hiển thị thông báo sau khi hooks đã được gọi
  if (!departureLocation || !arrivalLocation || !departureDate) {
    return <div>Thiếu thông tin tìm kiếm. Vui lòng thử lại.</div>;
  }

  // Hiển thị loader nếu đang tải dữ liệu
  if (loading || isLoading) {
    return (
      <div className="container mx-auto py-8">
        <SkeletonLoader />
      </div>
    );
  }

  // Xử lý lỗi từ API
  if (error) {
    return <div>Không tìm thấy chuyến xe. Lỗi: {error.message}</div>;
  }

  // Xử lý trường hợp không có kết quả phù hợp với bộ lọc
  if (filteredTrips.length === 0) {
    return <div>Không tìm thấy chuyến xe nào phù hợp với yêu cầu tìm kiếm của bạn.</div>;
  }

  // Hàm để xử lý khi người dùng chọn ghế và tiếp tục
  const handleContinue = (seats, price, trip) => {
    setSelectedSeats(seats);
    setTotalPrice(price);
    setTripDetails(trip);
  };

  return (
    <div className="container mx-auto py-8">
      <h2 className="text-2xl font-bold mb-4">Kết quả tìm kiếm chuyến xe</h2>
      <div className="space-y-4">
        {filteredTrips.map((trip) => (
          <TripCard 
            key={trip._id} 
            trip={trip} 
            isOpen={trip._id === tripDetails?._id} 
            onToggle={() => {
              setTripDetails(tripDetails?._id === trip._id ? null : trip); 
            }} 
            onContinue={handleContinue}
          />
        ))}
      </div>
    </div>
  );
};

export default SearchResults;
