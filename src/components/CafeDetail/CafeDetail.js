import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './CafeDetail.css';

const CafeDetail = () => {
  const { id } = useParams();
  const [cafe, setCafe] = useState(null);
  const [review, setReview] = useState('');
  const [rating, setRating] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userReview, setUserReview] = useState(null); // Review milik user
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:6543/api/cafes/${id}`)
      .then(res => res.json())
      .then(data => setCafe(data))
      .catch(err => console.error('Error:', err));

    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setIsLoggedIn(true);
      setUser(storedUser);

      // Fetch review user untuk cafe ini
      fetch(`http://localhost:6543/api/reviews/user/${storedUser.id}/cafe/${id}`)
        .then(res => res.json())
        .then(data => {
          if (data) {
            setUserReview(data);
            setReview(data.review);
            setRating(data.rating);
          }
        });
    }
  }, [id]);

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    if (!isLoggedIn) return alert('Login dulu ya!');

    const payload = {
      user_id: user.id,
      cafe_id: id,
      review,
      rating: parseInt(rating)
    };

    const endpoint = userReview ? `http://localhost:6543/api/reviews/${userReview.id}` : `http://localhost:6543/api/reviews`;
    const method = userReview ? 'PUT' : 'POST';

    const response = await fetch(endpoint, {
      method,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`
      },
      body: JSON.stringify(payload)
    });

    const data = await response.json();
    setUserReview(data);
    alert('Review berhasil disimpan!');
  };

  const handleDeleteReview = async () => {
    const confirmDelete = window.confirm('Yakin mau hapus review?');
    if (!confirmDelete) return;

    const response = await fetch(`http://localhost:6543/api/reviews/${userReview.id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${user.token}`
      }
    });

    if (response.ok) {
      setUserReview(null);
      setReview('');
      setRating(0);
      alert('Review berhasil dihapus.');
    }
  };

  if (!cafe) return <p>Loading...</p>;

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
          <form onSubmit={handleSubmitReview}>
            <textarea
              value={review}
              onChange={(e) => setReview(e.target.value)}
              placeholder="Tuliskan review mu di sini..."
              rows="4"
              required
            />
            <div className="rating">
              <label>Rating: </label>
              <select value={rating} onChange={(e) => setRating(e.target.value)}>
                <option value="0">Pilih rating</option>
                <option value="1">1 Star</option>
                <option value="2">2 Stars</option>
                <option value="3">3 Stars</option>
                <option value="4">4 Stars</option>
                <option value="5">5 Stars</option>
              </select>
            </div>
            <button type="submit">{userReview ? 'Update Review' : 'Submit Review'}</button>
            {userReview && <button type="button" onClick={handleDeleteReview} className="delete-btn">Delete Review</button>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default CafeDetail;
