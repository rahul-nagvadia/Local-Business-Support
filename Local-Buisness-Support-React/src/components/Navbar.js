import React, { useEffect, useState } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import "../Styles/Navbar.css";
import logo from "../Static/logo-transparent-png.png"; // Ensure you have the correct path to your logo
import { HamburgetMenuClose, HamburgetMenuOpen } from "./Icons";
import axios from "axios";

function Navbar() {
  const navigate = useNavigate();
  const token1 = localStorage.getItem("businessmanid");
  const token2 = localStorage.getItem("businessid");
  const token3 = localStorage.getItem("userid");
  const [buisnessman, setman] = useState(false);
  const [buisness, setbuisness] = useState(false);
  const [user, setuser] = useState(false);
  const [click, setClick] = useState(false);
  const handleClick = () => setClick(!click);
  console.log(localStorage.getItem("jwtToken"));
  console.log(localStorage.getItem("jwtBusinessToken"));
  console.log(localStorage.getItem("jwtUserToken"));
  console.log(localStorage.getItem("businessmanid"));
  console.log(localStorage.getItem("businessid"));
  console.log(localStorage.getItem("userid"));
  const handleLogout = () => {
    console.log("Hello logout");
    localStorage.setItem("jwtToken","");
    localStorage.setItem("jwtBusinessToken","");
    localStorage.setItem("jwtUserToken","");
    localStorage.setItem("businessmanid","");
    localStorage.setItem("businessid","");
    localStorage.setItem("userid","");
    setbuisness(false);
    setman(false);
    setuser(false);
    navigate("/Home");
  };

  useEffect(() => {
    if(token1){
      setman(true);
      setbuisness(false);
      setuser(false);
    }
    else if(token2){
      setbuisness(true);
      setman(false);
      setuser(false);
    }
    else if(token3){
      setuser(true);
      setbuisness(false);
      setman(false);
    }
  }, [token1,token2,token3]); // Add dependency array

  return (
    <>
      <nav className="navbar">
        <div className="nav-container">
          <div className="logo">
            <Link to="/Home" className="navbar-brand">
              <img src={logo} alt="Your Logo" className="logo-image" />
            </Link>
          </div>

          <ul className={click ? "nav-menu active" : "nav-menu"}>
            <li className="nav-item">
              <NavLink to="/Home" className="nav-links" onClick={handleClick}>
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/ShoppingHome"
                className="nav-links"
                onClick={handleClick}
              >
                Shop
              </NavLink>
            </li>
            {user && (
              <li className="nav-item">
                <NavLink
                  to="/cart"
                  className="nav-links"
                  onClick={handleClick}
                >
                  Go to Cart
                </NavLink>
              </li>
            )}
            {user && (
              <li className="nav-item">
                <NavLink
                  to="/myorder"
                  className="nav-links"
                  onClick={handleClick}
                >
                  My Orders
                </NavLink>
              </li>
            )}
            {buisnessman && (
              <li className="nav-item">
                <NavLink
                  to="/mybusiness"
                  className="nav-links"
                  onClick={handleClick}
                >
                  My Businesses
                </NavLink>
              </li>
            )}
            {buisness && (
              <li className="nav-item">
                <NavLink
                  to="/myitems"
                  className="nav-links"
                  onClick={handleClick}
                >
                  My Items
                </NavLink>
              </li>
            )}
            {buisness && (
              <li className="nav-item">
                <NavLink
                  to="/OrderRequest"
                  className="nav-links"
                  onClick={handleClick}
                >
                 Active Orders
                </NavLink>
              </li>
            )}
            {buisness && (
              <li className="nav-item">
                <NavLink
                  to="/BusinessOrders"
                  className="nav-links"
                  onClick={handleClick}
                >
                 Orders History
                </NavLink>
              </li>
            )}
            {(buisnessman || buisness || user) && (
              <li className="nav-item">
                <button
                  className="nav-button"
                  onClick={handleLogout}
                >
                  Log out
                </button>
              </li>
            )}
            {(!buisnessman && !buisness && !user) && (
              <li className="nav-item">
                <div className="never-active">
                <NavLink
                  to="/Home/business-login"
                  className="nav-links"
                >
                  Log in
                </NavLink>
                </div>
              </li>
            )}
          </ul>
          <div className="nav-icon" onClick={handleClick}>
            {!click ? (
              <span className="icon">
                <HamburgetMenuOpen />
              </span>
            ) : (
              <span className="icon">
                <HamburgetMenuClose />
              </span>
            )}
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
