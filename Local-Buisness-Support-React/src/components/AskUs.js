import React from 'react'
import '../Styles/ContactForm.css';
export default function AskUs({ onClose }) {
  return (
    <div className="modal-overlay">
      <div className="modal">
        <button className="close-button" onClick={onClose}>
          &times;
        </button>
        <div className="form-container">
          <form className="form">
            <div className="form-group">
              <label htmlFor="email">Company Email</label>
              <input required name="email" id="email" type="text" />
            </div>
            <div className="form-group">
              <label htmlFor="textarea">How Can We Help You?</label>
              <textarea required cols="50" rows="10" id="textarea" name="textarea"></textarea>
            </div>
            <button type="submit" className="form-submit-btn">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
}
