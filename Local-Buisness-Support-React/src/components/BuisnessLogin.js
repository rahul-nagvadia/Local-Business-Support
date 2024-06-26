import React , {useState}from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import '../Styles/BuisnessLogin.css';
export default function BuisnessLogin({ onClose, onSignUnClick }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleChangeUser = (e) => {
    setUsername(e.target.value);
  };

  const handleChangePass = (e) => {
    setPassword(e.target.value);
  };

  const handleBusinessSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8080/business/login",
        {
          email: username,
          password: password,
        }
      );
      console.log(response.data);

      if (response.status === 200) {
        console.log("Login successful!");
        const token = response.data.token;
        localStorage.setItem("jwtBusinessToken", token);

        const currentUserResponse2 = await axios.get(
          "http://localhost:8080/business/me",
          {
            headers: {
              Authorization: `Bearer ${token}`, // Send JWT token in the Authorization header
            },
          }
        );
        if(currentUserResponse2.status === 200){
          localStorage.setItem("businessid",currentUserResponse2.data.id);
          localStorage.setItem("jwtToken","");
          localStorage.setItem("jwtUserToken","");
          localStorage.setItem("businessmanid","");
          localStorage.setItem("userid","");
          navigate("/Home");
        }
      } else {
        // Handle other response statuses
        console.log("Login failed!");
        window.alert("Invalid Login");
      }
    } catch (error) {
      // Handle errors
      console.error("Error In Logging Business Member:", error);
      window.alert("Error In Logging Business Member");
    }
  };

  const handleUserSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/users/login", {
        email: username,
        password: password,
      });
      console.log(response.data);

      if (response.status === 200) {
        console.log("Login successful!");
        const token = response.data.token;
        localStorage.setItem("jwtUserToken", token);
        const currentUserResponse = await axios.get(
          "http://localhost:8080/users/me",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (currentUserResponse.status === 200) {
          localStorage.setItem("userid", currentUserResponse.data.user_id);
          localStorage.setItem("jwtToken", "");
          localStorage.setItem("jwtBusinessToken", "");
          localStorage.setItem("businessmanid", "");
          localStorage.setItem("businessid", "");
          navigate("/Home");
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

  const handleBusinessManSubmit = async (e) => {
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
          console.log(currentUserResponse);
          window.alert("Login Success");
          navigate("/Home");
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
          <p>Login</p>
          <form>
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
            <button type="submit" className="submit-button" onClick={handleBusinessSubmit}>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              As Shop
            </button>
            <button type="submit" className="submit-button" onClick={handleUserSubmit}>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              As User
            </button>
            <button type="submit" className="submit-button" onClick={handleBusinessManSubmit}>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              As Buisnessman
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
