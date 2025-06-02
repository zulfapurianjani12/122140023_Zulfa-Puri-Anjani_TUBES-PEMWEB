import React, { useEffect, useState } from 'react';
import './Favorites.css'; 

const Favorites = () => {
  const [likedCafes, setLikedCafes] = useState([]);

  useEffect(() => {
    const savedCafes = JSON.parse(localStorage.getItem('likedCafes')) || [];
    setLikedCafes(savedCafes);
  }, []);

  const removeCafe = (id) => {
    const updatedCafes = likedCafes.filter(cafe => cafe.id !== id);
    localStorage.setItem('likedCafes', JSON.stringify(updatedCafes));
    setLikedCafes(updatedCafes);
  };

  return (
    <div className="favorites">
      <h1 className="favorites-title">Temukan Cafe Favorit mu</h1>
      <div className="favorites-grid">
        {likedCafes.length > 0 ? (
          likedCafes.map(cafe => {
            const imageSrc = require(`../../assets/${cafe.image}`);
            return (
              <div key={cafe.id} className="favorite-cafe">
                <div className="favorite-cafe-image">
                  <img src={imageSrc} alt={cafe.name} className="favorite-cafe-img" />
                </div>
                <div className="favorite-cafe-details">
                  <h2>{cafe.name}</h2>
                  <p>{cafe.location}</p>
                  <p>Rating: {cafe.rating}</p>
                  <button onClick={() => window.open(cafe.maps, "_blank")}>View Maps</button>
                  <button className="remove-button" onClick={() => removeCafe(cafe.id)}>Remove Like</button>
                </div>
              </div>
            );
          })
        ) : (
          <p className="no-favorites">No cafes liked yet!</p>
        )}
      </div>
    </div>
  );
};

export default Favorites;
