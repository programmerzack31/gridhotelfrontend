import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import RoomDetails from './pages/RoomDetails';
import Dashboard from './pages/Dashboard';
import './App.css'
import Footer from './components/Footer';
import AboutUs from './components/AboutUs';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/room/:id" element={<RoomDetails />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path='/aboutus' element={<AboutUs />}/>
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
