import React, { useEffect, useState } from 'react';
import axios from 'axios';
import RoomCard from '../components/RoomCard';

const API = process.env.REACT_APP_API_URL;
const Home = () => {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    axios.get(`${API}/rooms`)
      .then(res => setRooms(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="container">
      <h2>~ Explore Our Rooms ~</h2>
      <div className="room-grid">
        {rooms.map(room => (
          <RoomCard key={room._id} room={room} />
        ))}
      </div>
    </div>
  );
};

export default Home;
