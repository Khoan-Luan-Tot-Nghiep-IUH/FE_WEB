import React, { useState, useEffect } from "react";
import { getLocations } from "../../../api/location";
import styles from "./LocationSelector.module.css";

const LocationSelector = ({ value, onChange, placeholder }) => {
  const [locations, setLocations] = useState([]);
  const [filteredLocations, setFilteredLocations] = useState([]);
  const [recentSearches, setRecentSearches] = useState(() => JSON.parse(localStorage.getItem("recentSearches")) || []);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const data = await getLocations();
        setLocations(data);
      } catch (error) {
        console.error("Failed to fetch locations:", error);
      }
    };
    fetchLocations();
  }, []);

  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    onChange(inputValue);

    const filtered = locations.filter(location =>
      location.name.toLowerCase().includes(inputValue.toLowerCase())
    );
    setFilteredLocations(filtered);
    setIsDropdownOpen(true)
  };

  const handleLocationSelect = (locationName) => {
    onChange(locationName);
    setIsDropdownOpen(false);
    const updatedRecentSearches = [locationName, ...recentSearches.filter(item => item !== locationName)].slice(0, 5);
    setRecentSearches(updatedRecentSearches);
    localStorage.setItem("recentSearches", JSON.stringify(updatedRecentSearches));
  };

  const handleInputFocus = () => {
    setIsDropdownOpen(true);
  };

  const handleInputBlur = () => {
    setTimeout(() => {
      setIsDropdownOpen(false);
    }, 100);
  };

  return (
    <div className={styles.locationSelector}>
      <input
        type="text"
        value={value}
        onChange={handleInputChange}
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        placeholder={placeholder}
        className={styles.locationInput}
      />

      {isDropdownOpen && (
        <div className={styles.dropdown}>
          {filteredLocations.length > 0 ? (
            <div className={styles.locationList}>
              {filteredLocations.map((location) => (
                <div
                  key={location._id}
                  onClick={() => handleLocationSelect(location.name)}
                  className={styles.locationItem}
                >
                  {location.name}
                </div>
              ))}
            </div>
          ) : (
            <div className={styles.noResults}>Không có kết quả</div>
          )}

          {recentSearches.length > 0 && (
            <div className={styles.recentSearches}>
              <h4>Tìm kiếm gần đây</h4>
              <div className={styles.recentSearchList}>
                {recentSearches.map((search, index) => (
                  <div
                    key={index}
                    onClick={() => handleLocationSelect(search)}
                    className={styles.recentSearchItem}
                  >
                    {search}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default LocationSelector;
