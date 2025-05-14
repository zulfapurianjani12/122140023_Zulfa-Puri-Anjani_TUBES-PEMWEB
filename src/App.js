import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import CafeList from './components/CafeList/CafeList'; // Komponen CafeList
import CafeDetail from './components/CafeDetail/CafeDetail';
import Favorites from './components/Favorites/Favorites';
import Banner from './components/Banner/Banner';
import Login from './components/Login/Login';
import Register from './components/Register/Register'; 
import './App.css';

function App() {
  const [likedCount, setLikedCount] = useState(0);

  // useEffect untuk memuat likedCafes dari localStorage dan update likedCount
  useEffect(() => {
    const likedCafes = JSON.parse(localStorage.getItem('likedCafes')) || [];
    setLikedCount(likedCafes.length); // Menghitung jumlah cafe yang disukai
  }, []);

  return (
    <Router>
      <div>
        <Navbar likedCount={likedCount} />
        <Routes>
          {/* Menampilkan Banner hanya di halaman selain login dan register */}
          <Route path="/" element={<HomePage setLikedCount={setLikedCount} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/cafe/:id" element={<CafeDetail />} />
          <Route path="/favorites" element={<Favorites />} />
        </Routes>
      </div>
    </Router>
  );
}

function HomePage({ setLikedCount }) {
  const location = useLocation();
  const isLoginOrRegister = location.pathname === '/login' || location.pathname === '/register';

  return (
    <div>
      {/* Hanya tampilkan Banner jika bukan di halaman login atau register */}
      {!isLoginOrRegister && <Banner />}
      <CafeList setLikedCount={setLikedCount} />
    </div>
  );
}

export default App;
