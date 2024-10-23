import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect, useCallback, Suspense } from 'react';
import Navbar from 'components/shared/navbar/Navbar';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const FilterSidebar = React.lazy(() => import('./FilterSidebar'));
const SearchResults = React.lazy(() => import('./SearchResults'));
const MainSection = React.lazy(() => import('components/home/MainSection/MainSection'));

const SearchPage = () => {
  const [filters, setFilters] = useState({
    sort: 'default',
    busOperator: '',
    departureTimeRange: '',
    priceRange: '',
    pickupPoint: '',
    dropoffPoint: ''
  });

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Sử dụng useNavigate để điều hướng

  useEffect(() => {
    const fetchData = async () => {
      try {
        setTimeout(() => {
          setIsLoading(false);
        }, 1000);
      } catch (err) {
        setError('Không thể tải dữ liệu');
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  // Sử dụng useCallback để tránh việc tái tạo lại hàm khi re-render
  const handleSortChange = useCallback((e) => {
    setFilters((prev) => ({ ...prev, sort: e.target.value }));
  }, []);

  const resetFilters = useCallback(() => {
    setFilters({
      sort: 'default',
      busOperator: '',
      departureTimeRange: '',
      priceRange: '',
      pickupPoint: '',
      dropoffPoint: ''
    });
  }, []);

  const handleFilterChange = useCallback((field, value) => {
    if (field === 'clear') {
      resetFilters();
    } else {
      setIsLoading(true); // Hiển thị trạng thái tải khi thay đổi bộ lọc
      setFilters((prev) => ({ ...prev, [field]: value }));
      setTimeout(() => setIsLoading(false), 500); // Giả lập quá trình tải
    }
  }, [resetFilters]);

  const handlePopularRouteClick = (fromLocation, toLocation) => {
    const searchParams = new URLSearchParams();
    searchParams.set('departureLocation', fromLocation);
    searchParams.set('arrivalLocation', toLocation);
    const currentDate = new Date().toISOString().split('T')[0];
    searchParams.set('date', currentDate);
    searchParams.set('ticketCount', '1');
    navigate(`/search-page?${searchParams.toString()}`);
  };

  return (
    <div>
      <Navbar />
      <div className="min-h-screen w-full max-w-6xl mx-auto">
        <div className="w-full mx-auto mb-6">
          {error ? (
            <div className="text-red-500">Error: {error}</div>
          ) : (
            <Suspense fallback={<Skeleton height={150} />}>
              {isLoading ? <Skeleton height={150} /> : (
                <MainSection onPopularRouteClick={handlePopularRouteClick} /> // Truyền hàm xử lý
              )}
            </Suspense>
          )}
        </div>

        <div className="flex w-full">
          <div className="w-1/4 pr-4">
            {isLoading ? (
              <div>
                <Skeleton height={40} count={6} /> {/* Skeleton cho các bộ lọc */}
              </div>
            ) : (
              <Suspense fallback={<Skeleton height={40} count={6} />}>
                <FilterSidebar onSortChange={handleSortChange} onFilterChange={handleFilterChange} />
              </Suspense>
            )}
          </div>

          <div className="w-3/4">
            {isLoading ? (
              <div>
                <Skeleton height={150} count={5} /> {/* Hiển thị 5 skeleton card */}
              </div>
            ) : (
              <Suspense fallback={<Skeleton height={150} count={5} />}>
                <SearchResults filters={filters} />
              </Suspense>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
