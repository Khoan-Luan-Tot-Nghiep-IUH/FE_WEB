import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSearchTripQuery } from '../../../../Redux/Trip/TripApiSlice';
import TripCard from '../SearchResult/Trip/TripCard';
import SkeletonLoader from '../../../shared/Loader/Loader';
import { Modal, Button } from 'antd';

const SearchResults = ({ filters = {} }) => {
  const location = useLocation();
  const navigate = useNavigate();
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
  const [isModalVisible, setIsModalVisible] = useState(false);

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

  useEffect(() => {
    setLoading(true);

    const delayDebounceFn = setTimeout(() => {
      const applyFilters = () => {
        let filtered = [...allTrips];

        // Lọc theo giá
        if (filters.priceRange === 'low') {
          filtered = filtered.filter(trip => trip.basePrice < 200000);
        } else if (filters.priceRange === 'medium') {
          filtered = filtered.filter(trip => trip.basePrice >= 200000 && trip.basePrice <= 500000);
        } else if (filters.priceRange === 'high') {
          filtered = filtered.filter(trip => trip.basePrice > 500000);
        }

        // Lọc theo nhà xe
        if (filters.busOperator) {
          filtered = filtered.filter(trip => trip.companyId?._id === filters.busOperator);
        }

        // **Lọc theo loại xe**
        if (filters.busType) {
          filtered = filtered.filter(trip => trip.busType._id === filters.busType);
        }
        

        // Lọc theo giờ đi
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
        if (filtered.length === 0) {
          setIsModalVisible(true);
        }
      };

      applyFilters();
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [filters, allTrips]);

  useEffect(() => {
    if (error || (trips && trips.data.departureTrips.length === 0)) {
      setIsModalVisible(true);
    }
  }, [error, trips]);


  const handleModalOk = () => {
    setIsModalVisible(false);
    navigate('/yeu-cau-mo-chuyen-di');
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
  };
  if (!departureLocation || !arrivalLocation || !departureDate) {
    return <div>Thiếu thông tin tìm kiếm. Vui lòng thử lại.</div>;
  }

  if (loading || isLoading) {
    return (
      <div className="container mx-auto py-8">
        <SkeletonLoader />
      </div>
    );
  }


  const handleContinue = (seats, price, trip) => {
    setSelectedSeats(seats);
    setTotalPrice(price);
    setTripDetails(trip);
  };

  return (
    <div className="container mx-auto py-8">
      <div>
      {filteredTrips.length > 0 && (
      <h1 className="text-2xl font-bold mb-2">
        Tìm thấy {filteredTrips.length} chuyến xe phù hợp
      </h1>
    )}
      </div>
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
      <Modal
        title="Không tìm thấy chuyến xe phù hợp"
        visible={isModalVisible}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
        okText="Yêu cầu mở chuyến đi"
        cancelText="Đóng"
      >
        <p>Chúng tôi không tìm thấy chuyến xe nào phù hợp với yêu cầu của bạn.</p>
        <p>
          Bạn có thể yêu cầu mở chuyến đi phù hợp bằng cách nhấn vào nút
          <strong> "Yêu cầu mở chuyến đi"</strong>.
        </p>
      </Modal>
    </div>
  );
};

export default SearchResults;
