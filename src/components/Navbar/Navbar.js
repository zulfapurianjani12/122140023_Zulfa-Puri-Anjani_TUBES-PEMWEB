import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import logo from '../../assets/LogoCafe.png';  

const Navbar = ({ likedCount }) => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        {/* Gunakan gambar yang sudah diimpor */}
        <img src={logo} alt="Logo" className="logo" />
        <span className="logo-text">Nongki Geh</span>
      </div>
      <div className="navbar-menu">
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About Us</Link></li>
          <li><Link to="/login">Akun</Link></li>
          <li><Link to="/favorites">Favorit ({likedCount})</Link></li> 
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
