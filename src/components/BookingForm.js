import React, { useState } from 'react';
import axios from 'axios';
import BookingSuccessPopup from './BookingSuccessPopup';
import { useNavigate } from 'react-router-dom';

const API = process.env.REACT_APP_API_URL;

const BookingForm = ({ roomId }) => {
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [dateError, setDateError] = useState('');
  const navigate = useNavigate();

  const isDateValid = () => {
    if (!fromDate || !toDate) return false;
    return new Date(fromDate) <= new Date(toDate);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (!isDateValid()) {
      setDateError('From date must be before or equal to To date');
      return;
    }

    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    try {
      await axios.post(
        `${API}/bookings/create`,
        { roomId, fromDate, toDate },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setShowPopup(true);
      setFromDate('');
      setToDate('');
      setDateError('');
    } catch (error) {
      alert('Booking failed');
    }
  };

  return (
    <div className="booking-form">
      <h3>Book this Room</h3>
      <form onSubmit={handleSubmit}>
        <label htmlFor="from">From Date</label>
        <input
          id="from"
          type="date"
          value={fromDate}
          onChange={e => {
            setFromDate(e.target.value);
            setDateError('');
          }}
          required
        />

        <label htmlFor="to">To Date</label>
        <input
          id="to"
          type="date"
          value={toDate}
          onChange={e => {
            setToDate(e.target.value);
            setDateError('');
          }}
          required
        />

        {dateError && <p style={{ color: 'red' }}>{dateError}</p>}

        <button type="submit" disabled={ !isDateValid()}>
          Book Now
        </button>
      </form>

      {showPopup && <BookingSuccessPopup onClose={() => setShowPopup(false)} />}
    </div>
  );
};

export default BookingForm;
