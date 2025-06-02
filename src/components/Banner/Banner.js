import React from 'react';
import './Banner.css';
import bannerImg from '../../assets/banner.jpg';

const Banner = ({ searchQuery, setSearchQuery }) => {
  return (
    <div className="banner">
      <img src={bannerImg} alt="Cafe Banner" className="banner-img" />
      <div className="banner-content">
        <h1>Temukan Tempat Nongkrong Terbaik di Bandar Lampung</h1>
        <p>Kamu mengunjungi situs yang pas, untuk mengetahui info seputar cafe di Bandar Lampung</p>

        <div className="search-container">
          <input 
            type="text" 
            className="search-bar" 
            placeholder="Cari cafe berdasarkan nama atau lokasi..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                // Optional: bisa kasih feedback di sini
              }
            }}
          />

        </div>
      </div>
    </div>
  );
};

export default Banner;
