import React, { useState } from "react";
import Navbar from "./Navbar";
import videoBackground from "../Static/home1.mp4";
import "../Styles/Home.css";
import Card from "./Card";
import Testimonials from "./Testimonials";
import ContactUs from "./ContactUs";
import AskUs from "./AskUs";
import AddBusinessMember from "./AddBusinessMember";
import LoginForm from "./MemberLogin";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [showContactForm, setShowContactForm] = useState(false);
  const [showRegisterForm, setShowRegisterForm] = useState(false);
  const [showLoginForm, setShowLoginForm] = useState(false);
  const navigate = useNavigate();
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

  const navigateToShoppingHome = () => {
    navigate("/ShoppingHome");
  };

  return (
    <div>
      <Navbar/>
      <div className="video-container">
        <video autoPlay loop muted className="video-bg">
          <source src={videoBackground} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="content">
          <section className="header">
            <div className="title-wrapper">
              <h1 className="sweet-title">
                <span data-text="Welcome">Welcome</span>
              </h1>
              <span className="top-title">We Are Connecting</span>
              <span className="bottom-title">
                Local Business with Customers.
              </span>
            </div>
          </section>
        </div>
      </div>
      <div className="AddMember">
        <div className="intext">
          <div className="row small-text">Dont Wait</div>
          <div className="row big-text">Become Member</div>
          <div className="row2 small-text">
            Join to show case your business and connect to your local customers.
          </div>
          <button className="gradient-button" onClick={handleOpenRegisterForm}>Join Now</button>
        </div>
      </div>
      <div className="AddCustomer with-image">
        <div className="intextc">
          <div className="rowc small-textc">Don't Wait</div>
          <div className="rowc big-textc">Start Buying From Locals</div>
          <div className="row2c small-textc">
            Discover your everyday necessities within your local area.
          </div>
          <button className="gradientc-button" onClick={navigateToShoppingHome}>Shop Now</button>
        </div>
      </div>

      <div className="AboutService">
        <div className="abtrow">What Are We Providing!!</div>
        <div className="showprovide">
          <Card argument={1}></Card>
          <Card argument={2}></Card>
          <Card argument={3}></Card>
        </div>
      </div>
      <div className="Shop">
        <Testimonials />
      </div>
      <div className="sendemail center-container">
        <button onClick={handleOpenContactForm} className="contactButton">
          Get in Touch
          <div className="iconButton">
            <svg
              height="24"
              width="24"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M0 0h24v24H0z" fill="none"></path>
              <path
                d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z"
                fill="currentColor"
              ></path>
            </svg>
          </div>
        </button>
      </div>

      {showContactForm && <AskUs onClose={handleCloseContactForm} />}
      {showRegisterForm && <AddBusinessMember onClose={handleCloseRegisterForm} onSignInClick={handleOpenLoginForm} />}
      {showLoginForm && <LoginForm onClose={handleCloseLoginForm} onSignUnClick={handleOpenRegisterForm}/>}
      <ContactUs />
    </div>
  );
}
