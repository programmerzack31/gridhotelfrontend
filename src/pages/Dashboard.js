import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ConfirmDialog from '../components/ConfirmDialog '; // path as per your structure
const API = process.env.REACT_APP_API_URL;

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [showConfirm, setShowConfirm] = useState(false);
  const [bookingToCancel, setBookingToCancel] = useState(null);

  const fetchData = async () => {
    const token = localStorage.getItem('token');
    try {
      const userRes = await axios.get(`${API}/auth/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(userRes.data);

      const bookingRes = await axios.get(`${API}/bookings/user`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBookings(bookingRes.data);
    } catch (err) {
      console.error('Error fetching dashboard data:', err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const requestCancel = (id) => {
    setBookingToCancel(id);
    setShowConfirm(true);
  };

  const handleConfirm = async () => {
    const token = localStorage.getItem('token');
    try {
      await axios.delete(`${API}/bookings/cancel/${bookingToCancel}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBookings(prev => prev.filter(b => b._id !== bookingToCancel));
    } catch (error) {
      console.error('Error cancelling booking:', error);
    } finally {
      setShowConfirm(false);
      setBookingToCancel(null);
    }
  };

  return (
    <div className="dashboard-container">
      {user && (
        <div className="user-info">
          <h2>Welcome, {user.name}</h2>
          <p>Email: {user.email}</p>
        </div>
      )}

      <h3 className="section-title">Your Bookings</h3>

      {bookings.length === 0 ? (
        <p className="no-bookings">You have no bookings yet.</p>
      ) : (
        bookings.map(b => (
          <div key={b._id} className="booking-card">
            <h4>{b.roomId?.name || 'Room name unavailable'}</h4>
            <p>Type: {b.roomId?.type}</p>
            <p>Price: ${b.roomId?.price}</p>
            <p>Capacity: {b.roomId?.capacity}</p>
            <p>
              Booking From: <strong>{new Date(b.fromDate).toLocaleDateString()}</strong> to{' '}
              <strong>{new Date(b.toDate).toLocaleDateString()}</strong>
            </p>
            <button
              className="cancel-button"
              onClick={() => requestCancel(b._id)}
              style={{
                marginTop: '10px',
                backgroundColor: 'red',
                color: '#fff',
                padding: '8px 12px',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
              }}
            >
              Cancel Booking
            </button>
          </div>
        ))
      )}

      {showConfirm && (
        <ConfirmDialog
          message="Are you sure you want to cancel this booking?"
          onConfirm={handleConfirm}
          onCancel={() => setShowConfirm(false)}
        />
      )}
    </div>
  );
};

export default Dashboard;
