import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BookingSuccessPopup from './BookingSuccessPopup';
import { useNavigate } from 'react-router-dom';

const BookingForm = ({ roomId }) => {
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
   const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();
  const [token, setToken] = useState(null);

  useEffect(() => {
    const t = localStorage.getItem('token');
    if (!t) {
      navigate('/login');
    } else {
      setToken(t);
    }
  }, [navigate]);

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await axios.post(
        'https://backendofgridhotel.onrender.com/api/bookings/create',
        { roomId, fromDate, toDate },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
         setShowPopup(true);
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
          onChange={e => setFromDate(e.target.value)}
          required
        />
        <label htmlFor="to">To Date</label>
        <input
          id="to"
          type="date"
          value={toDate}
          onChange={e => setToDate(e.target.value)}
          required
        />
        <button type="submit">Book Now</button>
      </form>
      {showPopup && <BookingSuccessPopup onClose={() => setShowPopup(false)} />}
    </div>
  );
};

export default BookingForm;
