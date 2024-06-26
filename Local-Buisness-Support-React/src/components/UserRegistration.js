import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../Styles/AddBusinessMember.css";

export default function UserRegistration({ onClose, onSignInClick }) {
  const [user, setuser] = useState({
    first_name: "",
    last_name: "",
    username: "",
    password: "",
    mobile_no: "",
    email: "",
    address: ""
  });
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setuser({ ...user, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8080/users/add-user",
        user
      );

      if (response.status === 200) {
        window.alert("Start Shoping");
        onClose();
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
        <div className="reg-form-container">
        <form className="form-mem" onSubmit={handleSubmit}>
          <p className="title-mem">Register</p>
          <p className="message-mem">Signup now and get full access to our app.</p>
          <label>
            <input
              className="input-mem"
              type="text"
              name="first_name"
              placeholder=""
              required
              value={user.first_name}
              onChange={handleChange}
            />
            <span>First Name</span>
          </label>
          <label>
            <input
              className="input-mem"
              type="text"
              name="last_name"
              placeholder=""
              required
              value={user.last_name}
              onChange={handleChange}
            />
            <span>Last Name</span>
          </label>
          <label>
            <input
              className="input-mem"
              type="text"
              name="username"
              placeholder=""
              required
              value={user.username}
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
              value={user.mobile_no}
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
              value={user.email}
              onChange={handleChange}
            />
            <span>Email</span>
          </label>
          <label>
            <input
              className="input-mem"
              type="text"
              name="address"
              placeholder=""
              required
              value={user.address}
              onChange={handleChange}
            />
            <span>Address</span>
          </label>
          <label>
            <input
              className="input-mem"
              type="password"
              name="password"
              placeholder=""
              required
              value={user.password}
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
              value={user.confirmPassword}
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
    </div>
  );
}
