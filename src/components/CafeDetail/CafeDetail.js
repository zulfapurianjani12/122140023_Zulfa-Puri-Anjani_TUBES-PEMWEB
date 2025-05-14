import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './CafeDetail.css';

const CafeDetail = () => {
  const { id } = useParams();
  const [cafe, setCafe] = useState(null);

  // Fetch data berdasarkan ID dari Mock API
  useEffect(() => {
    fetch(`https://67f1ed63c733555e24ae5439.mockapi.io/cafes/${id}`)
      .then(response => response.json())
      .then(data => setCafe(data))
      .catch(error => console.error("There was an error fetching the cafe details:", error));
  }, [id]);

  return cafe ? (
    <div className="cafe-detail">
      <h1>{cafe.name}</h1>
      <p>{cafe.description}</p>
      <p>Location: {cafe.location}</p>
      <p>Rating: {cafe.rating}</p>
      <a href={cafe.maps} target="_blank" rel="noopener noreferrer">
        <button className="view-maps-button">View on Google Maps</button>
      </a>
    </div>
  ) : (
    <p>Loading...</p>
  );
};

export default CafeDetail;
