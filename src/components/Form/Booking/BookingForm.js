import React, { useState, useEffect } from "react";
import { getLocations } from "../../../api/location";
import styles from "./BookingForm.module.css";
import DateSelector from "../Date/DateSelector";
import { useNavigate } from "react-router-dom"; 

const BookingForm = () => {
  const [locations, setLocations] = useState([]);
  const [departure, setDeparture] = useState(localStorage.getItem('departure') || "");
  const [destination, setDestination] = useState(localStorage.getItem('destination') || "");
  
  const [selectedDate, setSelectedDate] = useState(() => {
    const savedDate = localStorage.getItem('selectedDate');
    return savedDate ? new Date(savedDate) : new Date();
  });
  
  const [isRoundTrip, setIsRoundTrip] = useState(false);
  const [returnDate, setReturnDate] = useState(() => {
    const savedReturnDate = localStorage.getItem('returnDate');
    return savedReturnDate ? new Date(savedReturnDate) : null;
  });
  
  const [ticketCount, setTicketCount] = useState(1); 

  const navigate = useNavigate();

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

  const handleDepartureChange = (e) => {
    setDeparture(e.target.value);
    localStorage.setItem('departure', e.target.value); 
  };

  const handleDestinationChange = (e) => {
    setDestination(e.target.value);
    localStorage.setItem('destination', e.target.value); 
  };

  const handleTripTypeChange = (e) => {
    setIsRoundTrip(e.target.value === 'round-trip');
    if (e.target.value !== 'round-trip') {
      setReturnDate(null);
      localStorage.removeItem('returnDate');
    }
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    localStorage.setItem('selectedDate', date.toISOString());
  };

  const handleReturnDateChange = (date) => {
    setReturnDate(date);
    localStorage.setItem('returnDate', date.toISOString());
  };

  const handleSearch = () => {
    if (!departure || !destination || !selectedDate) {
      alert("Vui lòng nhập đầy đủ thông tin!");
      return;
    }
  
    const queryParams = new URLSearchParams({
      departureLocation: departure,
      arrivalLocation: destination,
      departureDate: selectedDate.toISOString(),
      ticketCount: ticketCount
    });
    if (isRoundTrip && returnDate) {
      queryParams.append("returnDate", returnDate.toISOString());
    }
  
    navigate(`/search-results?${queryParams.toString()}`);
  };

  const handleSwapLocations = () => {
    const temp = departure;
    setDeparture(destination);
    setDestination(temp);
    localStorage.setItem('departure', destination); 
    localStorage.setItem('destination', temp); 
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
            onChange={handleDepartureChange}
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
          <button onClick={handleSwapLocations}>
            ↔️
          </button>
        </div>

        <div className={styles.formGroup}>
          <label>Điểm đến</label>
          <select
            value={destination}
            onChange={handleDestinationChange}
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
            onDateChange={handleDateChange} 
          />
        </div>

        {isRoundTrip && (
          <div className={`${styles.formGroup} ${styles.dateReturn}`}>
            <label>Ngày về</label>
            <DateSelector 
              selectedDate={returnDate} 
              onDateChange={handleReturnDateChange} 
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