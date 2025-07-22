import React, { useEffect, useState } from 'react';
import axios from 'axios';
import RoomCard from '../components/RoomCard';
import Skeleton from 'react-loading-skeleton';
import { AnimatePresence, motion } from 'framer-motion';
import 'react-loading-skeleton/dist/skeleton.css';

const API = process.env.REACT_APP_API_URL;

const Home = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${API}/rooms`)
      .then(res => {
        setTimeout(() => {
          setRooms(res.data);
          setLoading(false);
        }, 1000); // Optional delay for smoother UX
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const renderSkeletons = () =>
    Array.from({ length: 6 }).map((_, index) => (
      <motion.div
        key={index}
        className="room-card skeleton-card"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.4, delay: index * 0.1 }}
      >
        <Skeleton height={180} borderRadius={8} />
        <Skeleton height={20} style={{ margin: '12px 0' }} />
        <Skeleton count={2} height={14} />
      </motion.div>
    ));

  return (
    <div className="container">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        ~ Explore Our Rooms ~
      </motion.h2>

      <div className="room-grid">
        <AnimatePresence mode="wait">
          {loading
            ? renderSkeletons()
            : rooms.map((room, index) => (
                <motion.div
                  key={room._id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                >
                  <RoomCard room={room} />
                </motion.div>
              ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Home;
