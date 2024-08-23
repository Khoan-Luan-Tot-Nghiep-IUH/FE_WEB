import React, { useState, useEffect } from "react";
import { getLocations } from "../../../api/location";
import styles from "./BookingForm.module.css";
import DateSelector from "../Date/DateSelector";
import { useNavigate } from "react-router-dom";  // Thay thế useHistory bằng useNavigate

const BookingForm = () => {
  const [locations, setLocations] = useState([]);
  const [departure, setDeparture] = useState("");
  const [destination, setDestination] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isRoundTrip, setIsRoundTrip] = useState(false);
  const [returnDate, setReturnDate] = useState(null);
  const [ticketCount, setTicketCount] = useState(1);  // State cho "Số vé"

  const navigate = useNavigate();  // Sử dụng hook useNavigate để điều hướng

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

  const handleTripTypeChange = (e) => {
    setIsRoundTrip(e.target.value === 'round-trip');
    if (e.target.value !== 'round-trip') {
      setReturnDate(null);
    }
  };

  const handleSearch = () => {
    // Kiểm tra xem người dùng đã nhập đủ thông tin chưa
    if (!departure || !destination || !selectedDate) {
      alert("Vui lòng nhập đầy đủ thông tin!");
      return;
    }

    // Tạo query string để truyền thông tin tìm kiếm lên server
    const queryParams = new URLSearchParams({
      departureLocation: departure,
      arrivalLocation: destination,
      departureDate: selectedDate.toISOString(),
      returnDate: isRoundTrip && returnDate ? returnDate.toISOString() : undefined,
      ticketCount: ticketCount
    });

    // Điều hướng tới trang kết quả tìm kiếm với query string
    navigate(`/search-results?${queryParams.toString()}`);
  };

  return (
    <div className={styles.bookingForm}>
      <div className={styles.tripType}>
        <label>
          <input
            type="radio"
            name="trip"
            value="one-way"
            defaultChecked
            onChange={handleTripTypeChange}
          /> Một chiều
        </label>
        <label>
          <input
            type="radio"
            name="trip"
            value="round-trip"
            onChange={handleTripTypeChange}
          /> Khứ hồi
        </label>
      </div>

      <div className={`${styles.formGroupContainer} ${isRoundTrip ? styles.roundTrip : ''}`}>
        <div className={styles.formGroup}>
          <label>Điểm đi</label>
          <select
            value={departure}
            onChange={(e) => setDeparture(e.target.value)}
          >
            <option value="">Chọn điểm đi</option>
            {locations.map((location) => (
              <option key={location._id} value={location.name}>
                {location.name}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.switchButton}>
          <button
            onClick={() => {
              const temp = departure;
              setDeparture(destination);
              setDestination(temp);
            }}
          >
            ↔️
          </button>
        </div>

        <div className={styles.formGroup}>
          <label>Điểm đến</label>
          <select
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
          >
            <option value="">Chọn điểm đến</option>
            {locations.map((location) => (
              <option key={location._id} value={location.name}>
                {location.name}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.formGroup}>
          <label>Ngày đi</label>
          <DateSelector 
            selectedDate={selectedDate} 
            onDateChange={setSelectedDate} 
          />
        </div>

        {isRoundTrip && (
          <div className={`${styles.formGroup} ${styles.dateReturn}`}>
            <label>Ngày về</label>
            <DateSelector 
              selectedDate={returnDate} 
              onDateChange={setReturnDate} 
            />
          </div>
        )}

        <div className={`${styles.formGroup} ${styles.ticketCount}`}>
          <label>Số vé</label>
          <select value={ticketCount} onChange={(e) => setTicketCount(e.target.value)}>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
        </div>
      </div>

      <div className={styles.btnContainer}>
        <button className={styles.btnSearch} onClick={handleSearch}>Tìm chuyến xe</button>
      </div>
    </div>
  );
};

export default React.memo(BookingForm);
