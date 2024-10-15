import React, { useState } from 'react';
import FilterSidebar from './FilterSidebar';
import SearchResults from './SearchResults';
import MainSection from 'components/home/MainSection/MainSection';
import Navbar from 'components/shared/navbar/Navbar';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'; 

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
  React.useEffect(() => {
    setTimeout(() => {
      setIsLoading(false); // Sau khi dữ liệu tải xong
    }, 1000);
  }, []);

  const handleSortChange = (e) => {
    setFilters((prev) => ({ ...prev, sort: e.target.value }));
  };

  const handleFilterChange = (field, value) => {
    if (field === 'clear') {
      setFilters({
        sort: 'default',
        busOperator: '',
        departureTimeRange: '',
        priceRange: '',
        pickupPoint: '',
        dropoffPoint: ''
      });
    } else {
      setFilters((prev) => ({ ...prev, [field]: value }));
    }
  };

  return (
    <div>
      <Navbar />
      <div className="min-h-screen w-full max-w-6xl mx-auto">
        <div className="w-full mx-auto mb-6">
          {isLoading ? (
            <Skeleton height={150} /> 
          ) : (
            <MainSection />
          )}
        </div>

        <div className="flex w-full">
          {/* Skeleton cho Sidebar khi đang tải */}
          <div className="w-1/4 pr-4">
            {isLoading ? (
              <div>
                <Skeleton height={40} count={6} /> {/* Skeleton cho các bộ lọc */}
              </div>
            ) : (
              <FilterSidebar onSortChange={handleSortChange} onFilterChange={handleFilterChange} />
            )}
          </div>

          {/* Skeleton cho phần kết quả tìm kiếm khi đang tải */}
          <div className="w-3/4">
            {isLoading ? (
              <div>
                <Skeleton height={150} count={5} /> {/* Hiển thị 5 skeleton card */}
              </div>
            ) : (
              <SearchResults filters={filters} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
