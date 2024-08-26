import React from "react";
import styles from "./TripSearchResult.module.css";

const FilterSection = ({
  departureTimeFilter,
  setDepartureTimeFilter,
  busTypeFilter,
  setBusTypeFilter,
  seatLocationFilter,
  setSeatLocationFilter,
}) => (
  <div className={styles.filterContainer}>
    <h3>Bộ Lọc Tìm Kiếm</h3>
    <div className={styles.filterSection}>
      <h4>Giờ đi</h4>
      <div>
        <label>
          <input
            type="checkbox"
            checked={departureTimeFilter.includes("morning")}
            onChange={() => handleFilterChange(departureTimeFilter, setDepartureTimeFilter, "morning")}
          />
          Sáng sớm (00:00 - 5:59)
        </label>
        <label>
          <input
            type="checkbox"
            checked={departureTimeFilter.includes("forenoon")}
            onChange={() => handleFilterChange(departureTimeFilter, setDepartureTimeFilter, "forenoon")}
          />
          Buổi sáng (06:00 - 11:59)
        </label>
        <label>
          <input
            type="checkbox"
            checked={departureTimeFilter.includes("afternoon")}
            onChange={() => handleFilterChange(departureTimeFilter, setDepartureTimeFilter, "afternoon")}
          />
          Buổi chiều (12:00 - 17:59)
        </label>
        <label>
          <input
            type="checkbox"
            checked={departureTimeFilter.includes("evening")}
            onChange={() => handleFilterChange(departureTimeFilter, setDepartureTimeFilter, "evening")}
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
            checked={busTypeFilter.includes("Ghế Ngồi")}
            onChange={() => handleFilterChange(busTypeFilter, setBusTypeFilter, "Ghế Ngồi")}
          />
          Ghế
        </label>
        <label>
          <input
            type="checkbox"
            checked={busTypeFilter.includes("Giường Nằm")}
            onChange={() => handleFilterChange(busTypeFilter, setBusTypeFilter, "Giường Nằm")}
          />
          Giường
        </label>
        <label>
          <input
            type="checkbox"
            checked={busTypeFilter.includes("Limousine")}
            onChange={() => handleFilterChange(busTypeFilter, setBusTypeFilter, "Limousine")}
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
            checked={seatLocationFilter === "Front"}
            onChange={() => setSeatLocationFilter("Front")}
          />
          Hàng đầu
        </label>
        <label>
          <input
            type="radio"
            name="seatLocation"
            checked={seatLocationFilter === "Middle"}
            onChange={() => setSeatLocationFilter("Middle")}
          />
          Hàng giữa
        </label>
        <label>
          <input
            type="radio"
            name="seatLocation"
            checked={seatLocationFilter === "Back"}
            onChange={() => setSeatLocationFilter("Back")}
          />
          Hàng cuối
        </label>
      </div>
    </div>
  </div>
);

const handleFilterChange = (filter, setFilter, value) => {
  setFilter((prevState) =>
    prevState.includes(value)
      ? prevState.filter((item) => item !== value)
      : [...prevState, value]
  );
};

export default FilterSection;
