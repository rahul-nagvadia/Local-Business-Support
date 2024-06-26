import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../Styles/AddBusinessMember.css";

const AddBusinessMember = ({ onClose, onSignInClick }) => {
  const [business_mem, setBusiness_mem] = useState({
    username: "",
    password: "",
    email: "",
    mobile_no: "",
  });
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setBusiness_mem({ ...business_mem, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8080/business-mem/add-business-mem",
        business_mem
      );

      if (response.status === 200) {
        window.alert("Welcome to Business World");
        window.location.reload();
      } else if (response.status === 400) {
        window.alert("Email Already Registered");
      } else {
        window.alert("There is a problem registering");
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 400) {
          window.alert("Email or Username is/are Already in use");
        } else {
          window.alert("There is a problem registering");
        }
      } else if (error.request) {
        console.error("No response received:", error.request);
        window.alert("No response from server. Please try again later.");
      } else {
        console.error("Error in setting up request:", error.message);
        window.alert("There is a problem with the registration request.");
      }
    }
  };

  return (
    <div className="modal-mem">
      <div className="modal-content-mem">
        <span className="close" onClick={onClose}>
          &times;
        </span>
        <form className="form-mem" onSubmit={handleSubmit}>
          <p className="title-mem">Register</p>
          <p className="message-mem">Signup now and get full access to our app.</p>
          <label>
            <input
              className="input-mem"
              type="text"
              name="username"
              placeholder=""
              required
              value={business_mem.username}
              onChange={handleChange}
            />
            <span>Username</span>
          </label>
          <label>
            <input
              className="input-mem"
              type="text"
              name="mobile_no"
              placeholder=""
              required
              value={business_mem.mobile_no}
              onChange={handleChange}
            />
            <span>Mobile No.</span>
          </label>
          <label>
            <input
              className="input-mem"
              type="email"
              name="email"
              placeholder=""
              required
              value={business_mem.email}
              onChange={handleChange}
            />
            <span>Email</span>
          </label>
          <label>
            <input
              className="input-mem"
              type="password"
              name="password"
              placeholder=""
              required
              value={business_mem.password}
              onChange={handleChange}
            />
            <span>Password</span>
          </label>
          <label>
            <input
              className="input-mem"
              type="password"
              name="confirmPassword"
              placeholder=""
              required
              value={business_mem.confirmPassword}
              onChange={handleChange}
            />
            <span>Confirm password</span>
          </label>
          <button className="submit" type="submit">
            Submit
          </button>
          <p className="signin" onClick={() => { onClose(); onSignInClick(); }}>
            Already have an account? <a>Sign In</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default AddBusinessMember;
