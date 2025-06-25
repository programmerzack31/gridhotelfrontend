import React from 'react';
import './BookingSuccessPopup.css';
import { FaCheckCircle } from 'react-icons/fa';

const BookingSuccessPopup = ({ onClose }) => {
  return (
    <div className="popup-overlay">
      <div className="popup-box">
        <FaCheckCircle className="success-icon" />
        <h2>Booking Confirmed!</h2>
        <p>Your booking has been successfully made. We look forward to hosting you!</p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default BookingSuccessPopup;
