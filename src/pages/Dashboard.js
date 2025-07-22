import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { motion, AnimatePresence } from 'framer-motion';
import ConfirmDialog from '../components/ConfirmDialog';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ClipLoader from 'react-spinners/ClipLoader';

const API = process.env.REACT_APP_API_URL;

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [showConfirm, setShowConfirm] = useState(false);
  const [bookingToCancel, setBookingToCancel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [cancelLoading, setCancelLoading] = useState(false);

  useEffect(() => {
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
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const requestCancel = (id) => {
    setBookingToCancel(id);
    setShowConfirm(true);
  };

  const handleConfirm = async () => {
    const token = localStorage.getItem('token');
    setCancelLoading(true);
    try {
      await axios.delete(`${API}/bookings/cancel/${bookingToCancel}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBookings(prev => prev.filter(b => b._id !== bookingToCancel));
      toast.success('Booking cancelled successfully!');
    } catch (error) {
      console.error('Error cancelling booking:', error);
    } finally {
      setShowConfirm(false);
      setBookingToCancel(null);
      setCancelLoading(false);
    }
  };

  return (
    <div className="dashboard-container" style={{ padding: '1rem' }}>
      <AnimatePresence>
        {loading ? (
  <motion.div
    key="loading"
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.4 }}
  >
    <div className="user-info" style={{ marginBottom: '2rem' }}>
      <Skeleton height={30} width={200} />
      <Skeleton height={20} width={300} />
    </div>

    <h3 className="section-title">
      <Skeleton width={150} />
    </h3>

    {[...Array(3)].map((_, idx) => (
      <motion.div
        key={idx}
        className="booking-card"
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: idx * 0.1 }}
        style={{ marginBottom: '1.5rem' }}
      >
        <Skeleton height={24} width="50%" />
        <Skeleton height={20} width="40%" />
        <Skeleton height={20} width="30%" />
        <Skeleton height={20} width="50%" />
        <Skeleton height={36} width={140} style={{ marginTop: '10px' }} />
      </motion.div>
    ))}
  </motion.div>
        ) : (
          <motion.div
            key="loaded"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
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
                <motion.div
                  key={b._id}
                  className="booking-card"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                  style={{ marginBottom: '1rem' }}
                >
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
                    disabled={cancelLoading}
                    style={{
                      marginTop: '10px',
                      backgroundColor: cancelLoading ? '#aaa' : 'red',
                      color: '#fff',
                      padding: '8px 12px',
                      border: 'none',
                      borderRadius: '6px',
                      cursor: cancelLoading ? 'not-allowed' : 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                    }}
                  >
                    {cancelLoading && bookingToCancel === b._id ? (
                      <ClipLoader size={16} color="#fff" />
                    ) : (
                      'Cancel Booking'
                    )}
                  </button>
                </motion.div>
              ))
            )}

            {showConfirm && (
              <ConfirmDialog
                message="Are you sure you want to cancel this booking?"
                onConfirm={handleConfirm}
                onCancel={() => setShowConfirm(false)}
                loading={cancelLoading}
              />
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default Dashboard;
