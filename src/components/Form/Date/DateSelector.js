// DateSelector.js

import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styles from "./DateSelector.module.css";

const DateSelector = ({ selectedDate, onDateChange }) => {
  const isPastDate = (date) => {
    const today = new Date();
    return date < today.setHours(0, 0, 0, 0); // So sánh đến đầu ngày hôm nay
  };

  return (
    <DatePicker
      selected={selectedDate}
      onChange={onDateChange}
      dateFormat="dd/MM/yyyy"
      className={styles.datePickerInput}
      placeholderText="Chọn ngày đi"
      calendarClassName={styles.datePickerCalendar}
      minDate={new Date()} 
      dayClassName={(date) =>
        isPastDate(date) ? styles.pastDate : styles.futureDate
      } 
    />
  );
};

export default React.memo(DateSelector);
