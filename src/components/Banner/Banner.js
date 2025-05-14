import React from 'react';
import './Banner.css';
import bannerImg from '../../assets/banner.jpg'; 

const Banner = () => {
  return (
    <div className="banner">
      <img src={bannerImg} alt="Cafe Banner" className="banner-img" />
      <div className="banner-content">
        <h1>Temukan Tempat Nongkrong Terbaik di Bandar Lampung</h1>
        <p>Kamu mengunjungi situs yang pas, untuk mengetahui info seputar cafe di Bandar Lampung</p>
        
        {/* Membungkus input dan tombol di dalam search-container */}
        <div className="search-container">
          <input 
            type="text" 
            className="search-bar" 
            placeholder="Cari cafe berdasarkan nama atau lokasi..." 
          />
          <button className="search-button">Search</button>
        </div>
      </div>
    </div>
  );
};

export default Banner;
