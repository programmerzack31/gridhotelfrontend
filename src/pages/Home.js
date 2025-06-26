import React, { useEffect, useState } from 'react';
import axios from 'axios';
import RoomCard from '../components/RoomCard';
import ClipLoader from 'react-spinners/ClipLoader';

const API = process.env.REACT_APP_API_URL;

const Home = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`${API}/rooms`)
      .then(res => {
        setRooms(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="container">
      <h2>~ Explore Our Rooms ~</h2>

      {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center', padding: '2rem' }}>
          <ClipLoader size={40} color="#4f46e5" />
        </div>
      ) : (
        <div className="room-grid">
          {rooms.map(room => (
            <RoomCard key={room._id} room={room} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
