import React from 'react';
import { useLocation } from 'react-router-dom';
import BookingForm from './BookingForm';
import BookingSummary from './BookingSummary';
import BookingConfirmation from './BookingConfirmation';

const BookingPage = () => {
  const location = useLocation();
  const { selectedSeats, totalPrice, trip, contactInfo } = location.state || {};

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Đặt Vé Xe</h2>
      <BookingForm 
        selectedSeats={selectedSeats} 
        totalPrice={totalPrice} 
        trip={trip} 
      />
      <BookingSummary selectedSeats={selectedSeats} totalPrice={totalPrice} />
      {contactInfo && 
        <BookingConfirmation tripDetails={trip} selectedSeats={selectedSeats} contactInfo={contactInfo} />
      }
    </div>
  );
};

export default BookingPage;
