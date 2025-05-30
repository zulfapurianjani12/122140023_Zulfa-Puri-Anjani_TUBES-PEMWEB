import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './CafeDetail.css';

const CafeDetail = () => {
  const { id } = useParams();
  const [cafe, setCafe] = useState(null);
  const [review, setReview] = useState('');
  const [rating, setRating] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    fetch(`https://67f1ed63c733555e24ae5439.mockapi.io/cafes/${id}`)
      .then(response => response.json())
      .then(data => setCafe(data))
      .catch(error => console.error("Error fetching cafe details:", error));

    const user = localStorage.getItem('user');
    if (user) {
      setIsLoggedIn(true);
    }
  }, [id]);

  const handleReviewChange = (e) => {
    setReview(e.target.value);
  };

  const handleRatingChange = (e) => {
    setRating(e.target.value);
  };

  const handleSubmitReview = (e) => {
    e.preventDefault();
    if (!isLoggedIn) {
      alert('You must be logged in to submit a review!');
      return;
    }

    console.log("Review submitted:", { review, rating });
  };

  if (!cafe) {
    return <p>Loading...</p>;
  }

  return (
    <div className="cafe-detail">
      <div className="cafe-detail-content">
        <h1>{cafe.name}</h1>
        <img src={require(`../../assets/${cafe.image}`)} alt={cafe.name} className="cafe-image" />
        <p>{cafe.description}</p>
        <p><strong>Location:</strong> {cafe.location}</p>
        <p><strong>Rating:</strong> {cafe.rating}</p>
        <a href={cafe.maps} target="_blank" rel="noopener noreferrer">
          <button>View on Google Maps</button>
        </a>

        <div className="review-section">
          <h3>Berikan Review mu pada cafe ini</h3>
          {!isLoggedIn && <p>Please login to submit a review.</p>}
          <form onSubmit={handleSubmitReview}>
            <textarea
              value={review}
              onChange={handleReviewChange}
              placeholder="Tuliskan review mu di sini..."
              rows="4"
              required
            />
            <div className="rating">
              <label>Rating: </label>
              <select value={rating} onChange={handleRatingChange}>
                <option value="1">1 Star</option>
                <option value="2">2 Stars</option>
                <option value="3">3 Stars</option>
                <option value="4">4 Stars</option>
                <option value="5">5 Stars</option>
              </select>
            </div>
            <button type="submit" disabled={!isLoggedIn}>Submit Review</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CafeDetail;
