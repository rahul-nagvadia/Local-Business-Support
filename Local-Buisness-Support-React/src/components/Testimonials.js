import React, { useState, useEffect } from "react";
import "../Styles/Testimonials.css";
import axios from "axios";
import LoginForm from "./UserLogin";
import AddUserMember from "./UserRegistration";
import AskUs from "./Review";
const Testimonials = () => {
  const [reviews, setReviews] = useState([]);
  const [currentReviewIndex, setCurrentReviewIndex] = useState(0);
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [showRegisterForm, setShowRegisterForm] = useState(false);
  const [showContactForm, setShowContactForm] = useState(false);
  const [userInfo, setUserInfo] = useState({});

  const handleOpenContactForm = () => {
    setShowContactForm(true);
  };

  const handleCloseContactForm = () => {
    setShowContactForm(false);
  };

  const handleOpenRegisterForm = () => {
    setShowRegisterForm(true);
    setShowLoginForm(false);
  };

  const handleCloseRegisterForm = () => {
    setShowRegisterForm(false);
  };

  const handleOpenLoginForm = () => {
    setShowRegisterForm(false);
    setShowLoginForm(true);
  };

  const handleCloseLoginForm = () => {
    setShowLoginForm(false);
  };
  useEffect(() => {
    console.log("1");
    const fetchReviews = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8080/review/get-all-review"
        );
        setReviews(res.data);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };

    fetchReviews();
  }, []);

  useEffect(() => {
    console.log("2");
    if (reviews.length > 0) {
      const interval = setInterval(() => {
        setCurrentReviewIndex((prevIndex) => (prevIndex + 1) % reviews.length);
      }, 2000);
      return () => clearInterval(interval);
    }
  }, [reviews]);

  const handleNextReview = () => {
    setCurrentReviewIndex((prevIndex) => (prevIndex + 1) % reviews.length);
  };

  const handleAddReview = async () => {
    try {
      const token = localStorage.getItem("jwtUserToken");
      const userResponse = await axios.get(`http://localhost:8080/users/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(userResponse);
      if (userResponse.status === 200) {
        setUserInfo({
          user_id: userResponse.data.user_id,
          first_name: userResponse.data.first_name,
        });
        const token = userResponse.data.token;
        localStorage.setItem("jwtUserToken", token);
        handleOpenContactForm();
      } else {
        console.log("Hello1");
        handleOpenLoginForm();
      }
    } catch (error) {
      if (error.code === "ERR_NETWORK" || error.code === "ERR_BAD_REQUEST") {
        console.log("pata chala");
        handleOpenLoginForm();
      } else {
        console.log("Hello");
        console.error("Error adding review to cart:", error);
      }
    }
  };

  if (reviews.length === 0) {
    return (
      <>
        <div className="testimonials">
          <h2 className="testimonials-title">TESTIMONIALS</h2>
          <h3 className="testimonials-heading">People Says...</h3>
          <p className="testimonials-text">No reviews available.</p>
          <button className="add-review-button" onClick={handleAddReview}>
            Add Review
          </button>
        </div>
        {showContactForm && (
          <AskUs
            onClose={() => setShowContactForm(false)}
            user_id={userInfo.user_id}
            first_name={userInfo.first_name}
          />
        )}
        {showRegisterForm && (
          <AddUserMember
            onClose={handleCloseRegisterForm}
            onSignInClick={handleOpenLoginForm}
          />
        )}
        {showLoginForm && (
          <div className="div">
            {console.log("Noo 1")}
            <LoginForm
              onClose={handleCloseLoginForm}
              onSignUnClick={handleOpenRegisterForm}
            />
            {console.log("Noo ")}
          </div>
        )}
      </>
    );
  }

  const { name, user, review } = reviews[currentReviewIndex];

  return (
    <>
      <div className="testimonials">
        <h2 className="testimonials-title">TESTIMONIALS</h2>
        <h3 className="testimonials-heading">People Says...</h3>
        <p className="testimonials-text">{review}</p>
        <div className="testimonial-person">
          <div className="testimonial-info">
            <p className="testimonial-name">{name}</p>
            <p className="testimonial-position">{user}</p>
          </div>
        </div>
        <button className="next-review-button" onClick={handleNextReview}>
          Next Review
        </button>
        <button className="add-review-button" onClick={handleAddReview}>
          Add Review
        </button>
      </div>
      {showContactForm && (
        <AskUs
          onClose={() => setShowContactForm(false)}
          user_id={userInfo.user_id}
          first_name={userInfo.first_name}
        />
      )}
      {showRegisterForm && (
        <AddUserMember
          onClose={handleCloseRegisterForm}
          onSignInClick={handleOpenLoginForm}
        />
      )}
      {showLoginForm && (
        <div className="div">
          {console.log("Noo 1")}
          <LoginForm
            onClose={handleCloseLoginForm}
            onSignUnClick={handleOpenRegisterForm}
          />
          {console.log("Noo ")}
        </div>
      )}
    </>
  );
};

export default Testimonials;
