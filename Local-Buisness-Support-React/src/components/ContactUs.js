// ContactUs.js
import React from "react";
import "../Styles/ContactUs.css";

const ContactUs = () => {
  return (
    <div className="contact-us">
      <div className="social-icons">
        <a
          href="https://www.instagram.com/rahul_nagvadia/"
          target="_blank"
          rel="noopener noreferrer"
          className="social-icon"
        >
          <i className="fab fa-instagram"></i>
        </a>
        <a
          href="https://x.com/Rahul_Nagvadia"
          target="_blank"
          rel="noopener noreferrer"
          className="social-icon"
        >
          <i className="fab fa-twitter"></i>
        </a>
        <a
          href="https://www.linkedin.com/in/rahul-nagvadia-44121b247/"
          target="_blank"
          rel="noopener noreferrer"
          className="social-icon"
        >
          <i className="fab fa-linkedin-in"></i>
        </a>
        <a
          href="https://github.com/rahul-nagvadia"
          target="_blank"
          rel="noopener noreferrer"
          className="social-icon"
        >
          <i className="fab fa-github"></i>
        </a>
      </div>
    </div>
  );
};

export default ContactUs;
