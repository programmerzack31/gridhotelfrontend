import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import BookingForm from '../components/BookingForm';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { motion, AnimatePresence } from 'framer-motion';

const API = process.env.REACT_APP_API_URL;

const RoomDetails = () => {
  const { id } = useParams();
  const [room, setRoom] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRoom = async () => {
      try {
        const res = await axios.get(`${API}/rooms/${id}`);
        setRoom(res.data);
        setTimeout(() => setLoading(false), 500); // fade-out buffer for nicer transition
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };
    fetchRoom();
  }, [id]);

  return (
    <div className="room-details">
      <AnimatePresence mode="wait">
        {loading ? (
          <motion.div
            key="skeleton"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div className="room-header">
              <h2><Skeleton width={200} /></h2>
              <p className="room-type"><Skeleton width={100} /></p>
            </div>

            <div className="room-info">
              <Skeleton height={300} width={'60%'} />
              <div className="room-meta" style={{ marginTop: '1rem' }}>
                <p className="room-price"><Skeleton width={100} /></p>
                <p><strong>Capacity:</strong> <Skeleton width={40} /></p>
                <p><strong>Description:</strong> <Skeleton count={2} /></p>
                <p><strong>Amenities:</strong> <Skeleton width={200} /></p>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div className="room-header">
              <h2>{room.name}</h2>
              <p className="room-type">{room.type}</p>
            </div>

            <div className="room-info">
              <img
                src={room.image}
                alt={`${room.type}`}
                className="room-image"
              />
              <div className="room-meta" style={{ marginTop: '1rem' }}>
                <p className="room-price">
                  ${room.price}
                  <span className="per-night"> per night</span>
                </p>
                <p><strong>Capacity:</strong> {room.capacity}</p>
                <p><strong>Description:</strong> {room.description}</p>
                <p><strong>Amenities:</strong> {room.amenities.join(', ')}</p>
              </div>
            </div>

            <BookingForm roomId={room._id} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default RoomDetails;
