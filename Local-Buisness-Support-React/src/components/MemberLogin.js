import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../Styles/MemberLogin.css"; // Make sure to import your CSS file

export default function MemberLogin({ onClose, onSignUnClick }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleChangeUser = (e) => {
    setUsername(e.target.value);
  };

  const handleChangePass = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8080/business-mem/login",
        {
          email: username,
          password: password,
        }
      );
      console.log(response.data);

      if (response.status === 200) {
        console.log("Login successful!");
        const token = response.data.token;
        localStorage.setItem("jwtToken", token);

        const currentUserResponse = await axios.get(
          "http://localhost:8080/business-mem/me",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (currentUserResponse.status === 200) {
          localStorage.setItem(
            "businessmanid",
            currentUserResponse.data.mem_id
          );
          localStorage.setItem("jwtBusinessToken", "");
          localStorage.setItem("jwtUserToken", "");
          localStorage.setItem("businessid", "");
          localStorage.setItem("userid", "");
          onClose();
          window.location.reload();
          console.log(currentUserResponse);
          window.alert("Login Success");
        }
      } else {
        console.log("Login failed!");
        window.alert("Invalid Login");
      }
    } catch (error) {
      console.error("Error In Logging Business Member:", error);
      window.alert("Error In Logging Business Member");
    }
  };

  return (
    <div className="modal-mem-log">
      <div className="modal-content-mem-log">
        <span className="close" onClick={onClose}>
          &times;
        </span>
        <div className="login-box">
          <p>Login As Business Man</p>
          <form onSubmit={handleSubmit}>
            <div className="user-box">
              <input
                required
                name="username"
                type="text"
                value={username}
                onChange={handleChangeUser}
              />
              <label>Email</label>
            </div>
            <div className="user-box">
              <input
                required
                name="password"
                type="password"
                value={password}
                onChange={handleChangePass}
              />
              <label>Password</label>
            </div>
            <button type="submit" className="submit-button">
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              Submit
            </button>
          </form>
          <p
            onClick={() => {
              onClose();
              onSignUnClick();
            }}
          >
            Don't have an account? <a className="a2">Sign up!</a>
          </p>
        </div>
      </div>
    </div>
  );
}
