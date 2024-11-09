import { useLocation, useNavigate } from 'react-router-dom';
import React, { useState, useEffect, useCallback, Suspense } from 'react';
import { FaPen } from 'react-icons/fa';
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
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

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
      setFilters((prev) => ({ ...prev, [field]: value }));
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

  const searchParams = new URLSearchParams(location.search);
  const fromLocation = searchParams.get('departureLocation');
  const toLocation = searchParams.get('arrivalLocation');
  const departureDate = searchParams.get('departureDate') ;

  const date = new Date(departureDate);
  const options = { weekday: 'long', day: '2-digit', month: '2-digit', year: 'numeric' };
  const formattedDate = new Intl.DateTimeFormat('vi-VN', options).format(date);

  return (
    <div className="min-h-screen">
      <div className="hidden sm:block">
        <Navbar />
        <div className="container mx-auto mb-6">
          {error ? (
            <div className="text-red-500">Error: {error}</div>
          ) : (
            <Suspense fallback={<Skeleton height={150} />}>
              {isLoading ? <Skeleton height={150} /> : (
                <MainSection onPopularRouteClick={handlePopularRouteClick} />
              )}
            </Suspense>
          )}
        </div>
      </div>

      {/* Thanh thay thế cho màn hình nhỏ nhất */}
      <div className="block sm:hidden bg-orange-500 text-white p-4 flex items-center justify-between">
        <button onClick={() => navigate(-1)} className="text-white">
          &larr;
        </button>
        <div className="text-center mt-4">
          <h2 className="text-lg font-bold">
            {fromLocation} - {toLocation}
          </h2>
          <p className="text-sm">{formattedDate}</p>
        </div>
        <button onClick={() => setIsSidebarOpen(true)} className="text-white">
          <FaPen className="h-5 w-5" />
        </button>
      </div>

      {/* Bố cục chính */}
      <div className="container mx-auto flex flex-col md:flex-row w-full max-w-6xl px-4 md:px-0">
        {/* Drawer Sidebar cho màn hình nhỏ */}
        {isSidebarOpen && (
          <div className="fixed inset-0 bg-gray-800 bg-opacity-50 z-40 flex justify-end sm:hidden">
            <div className="w-3/4 bg-white h-full p-4 z-50">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-bold">Bộ lọc</h2>
                <button onClick={() => setIsSidebarOpen(false)} className="text-gray-700">
                  Đóng
                </button>
              </div>
              <Suspense fallback={<Skeleton height={40} count={6} />}>
                <FilterSidebar
                  filters={filters}
                  onSortChange={handleSortChange}
                  onFilterChange={handleFilterChange}
                />
              </Suspense>
            </div>
          </div>
        )}

        {/* Sidebar bên trái và SearchResults bên phải cho màn hình lớn */}
        <div className="hidden md:block md:w-1/3 pr-4">
          {isLoading ? (
            <Skeleton height={40} count={6} />
          ) : (
            <Suspense fallback={<Skeleton height={40} count={6} />}>
              <FilterSidebar filters={filters} onSortChange={handleSortChange} onFilterChange={handleFilterChange} />
            </Suspense>
          )}
        </div>

        {/* Kết quả tìm kiếm */}
        <div className="w-full md:w-2/3">
          {isLoading ? (
            <Skeleton height={150} count={5} />
          ) : (
            <Suspense fallback={<Skeleton height={150} count={5} />}>
              <SearchResults filters={filters} />
            </Suspense>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
