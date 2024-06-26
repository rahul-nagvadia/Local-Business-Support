import React, { useState } from 'react';
import '../Styles/ContactForm.css';
import axios from 'axios';
import PropTypes from 'prop-types';

export default function Review({ onClose, user_id, first_name }) {
  const [reviewText, setReviewText] = useState('');
  
  const handleChange = (event) => {
    setReviewText(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
        console.log(first_name);
        console.log(reviewText);
        console.log(user_id);
        const rv = {
            name : first_name,
            review : reviewText,
            user_id : user_id
        }
      const response = await axios.post(
        'http://localhost:8080/review/add-to-review',
        rv,
      );
      console.log('Review submitted:', response.data);
      onClose(); // Close the modal after successful submission
    } catch (error) {
      console.error('Error submitting review:', error);
      // Handle the error (e.g., display an error message)
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <button className="close-button" onClick={onClose}>
          &times;
        </button>
        <div className="form-container">
          <form className="form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="textarea">Give a review to our web app</label>
              <textarea
                required
                cols="50"
                rows="10"
                id="textarea"
                name="textarea"
                value={reviewText}
                onChange={handleChange}
              ></textarea>
            </div>
            <button type="submit" className="form-submit-btn">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
}

Review.propTypes = {
    onClose: PropTypes.func.isRequired,
    user_id: PropTypes.string.isRequired,
    first_name: PropTypes.string.isRequired,
  };