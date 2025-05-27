import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './CafeList.css';

const CafeList = ({ setLikedCount, searchQuery = '' }) => {
  const [cafes, setCafes] = useState([]);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    fetch('https://67f1ed63c733555e24ae5439.mockapi.io/cafes')
      .then(response => response.json())
      .then(data => setCafes(data))
      .catch(error => console.error("Error fetching cafes:", error));

    const storedFavorites = JSON.parse(localStorage.getItem('likedCafes')) || [];
    setFavorites(storedFavorites);
  }, []);

  const handleLike = (id, cafe) => {
    const isLiked = favorites.some(fav => fav.id === id);
    const newFavorites = isLiked
      ? favorites.filter(fav => fav.id !== id)
      : [...favorites, cafe];

    setFavorites(newFavorites);
    localStorage.setItem('likedCafes', JSON.stringify(newFavorites));
    setLikedCount(newFavorites.length);
  };

  const filteredCafes = cafes.filter(cafe =>
    cafe.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    cafe.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="cafe-list">
      <div className="cafe-grid">
        {filteredCafes.map(cafe => {
          let imageSrc;
          try {
            imageSrc = require(`../../assets/${cafe.image}`);
          } catch (err) {
            imageSrc = 'https://via.placeholder.com/150';
          }

          const isLiked = favorites.some(fav => fav.id === cafe.id);

          return (
            <div className="cafe-item" key={cafe.id}>
              <div className="image-container">
                <img src={imageSrc} alt={cafe.name} className="cafe-image" />
                <button
                  className={`love-button ${isLiked ? 'liked' : ''}`}
                  onClick={() => handleLike(cafe.id, cafe)}
                >
                  ♥
                </button>
              </div>
              <div>
                <h2>{cafe.name}</h2>
                <p>{cafe.location}</p>
                <p>Rating: {cafe.rating}</p>
                <div className="view-buttons">
                  <Link to={`/cafe/${cafe.id}`}>
                    <button>View Details</button>
                  </Link>
                  <button onClick={() => window.open(cafe.maps, "_blank")}>View Maps</button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CafeList;