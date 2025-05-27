import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import CafeList from './components/CafeList/CafeList';
import CafeDetail from './components/CafeDetail/CafeDetail';
import Favorites from './components/Favorites/Favorites';
import Banner from './components/Banner/Banner';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import AboutUs from './components/AboutUs/AboutUs';

import './App.css';

function App() {
  const [likedCount, setLikedCount] = useState(0);
  const [searchQuery, setSearchQuery] = useState(''); // ✅ State pencarian global

  useEffect(() => {
    const likedCafes = JSON.parse(localStorage.getItem('likedCafes')) || [];
    setLikedCount(likedCafes.length);
  }, []);

  return (
    <Router>
      <div>
        {/* ✅ Navbar bisa input pencarian */}
        <Navbar
          likedCount={likedCount}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
        <Routes>
          <Route
            path="/"
            element={
              <HomePage
                setLikedCount={setLikedCount}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
              />
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/cafe/:id" element={<CafeDetail />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/about" element={<AboutUs />} />
        </Routes>
      </div>
    </Router>
  );
}

function HomePage({ setLikedCount, searchQuery, setSearchQuery }) {
  const location = useLocation();
  const isLoginOrRegister = location.pathname === '/login' || location.pathname === '/register';

  return (
    <div>
      {/* ✅ Banner bisa input pencarian juga */}
      {!isLoginOrRegister && (
        <Banner
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
      )}
      <CafeList
        setLikedCount={setLikedCount}
        searchQuery={searchQuery}
      />
    </div>
  );
}

export default App;
