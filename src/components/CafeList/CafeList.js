import React, { useEffect, useState } from 'react';
import './CafeList.css';

const CafeList = ({ setLikedCount }) => {
  const [cafes, setCafes] = useState([]);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    fetch('https://67f1ed63c733555e24ae5439.mockapi.io/cafes')
      .then(response => response.json())
      .then(data => setCafes(data))
      .catch(error => console.error("Error fetching cafes:", error));

    // Load favorites from localStorage
    const storedFavorites = JSON.parse(localStorage.getItem('likedCafes')) || [];
    setFavorites(storedFavorites);
  }, []);

  const handleLike = (id, cafe) => {
    // Check if cafe is already liked
    const isLiked = favorites.some(fav => fav.id === id);

    let newFavorites; // Declare newFavorites here

    if (isLiked) {
      // If already liked, remove from favorites
      newFavorites = favorites.filter(fav => fav.id !== id);
    } else {
      // If not liked, add to favorites
      newFavorites = [...favorites, cafe];
    }

    // Update the favorites state and localStorage
    setFavorites(newFavorites);
    localStorage.setItem('likedCafes', JSON.stringify(newFavorites)); // Save updated favorites

    // Update the liked count
    setLikedCount(newFavorites.length);  // Update the count in App.js
  };

  return (
    <div className="cafe-list">
      <div className="cafe-grid">
        {cafes.map(cafe => {
          const imageSrc = require(`../../assets/${cafe.image}`);
          const isLiked = favorites.some(fav => fav.id === cafe.id);

          return (
            <div className="cafe-item" key={cafe.id}>
              <div className="image-container">
                <img 
                  src={imageSrc} 
                  alt={cafe.name} 
                  className="cafe-image" 
                />
                <button
                  className={`love-button ${isLiked ? 'liked' : ''}`}
                  onClick={() => handleLike(cafe.id, cafe)} // Handle click to toggle like
                >
                  ♥
                </button>
              </div>
              <div>
                <h2>{cafe.name}</h2>
                <p>{cafe.location}</p>
                <p>Rating: {cafe.rating}</p>
                <div className="view-buttons">
                  <button onClick={() => console.log('View details for cafe', cafe.id)}>
                    View Details
                  </button>
                  <button onClick={() => window.open(cafe.maps, "_blank")}>
                    View Maps
                  </button>
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
