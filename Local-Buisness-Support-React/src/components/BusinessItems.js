import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "../Styles/BusinessItems.css";
import Navbar from "./Navbar"; // Import the new navbar
import videoBackground from "../Static/items.mp4";
import LoginForm from "./UserLogin";
import AddUserMember from "./UserRegistration";

export default function BusinessItems() {
  const { businessId } = useParams();
  const [items, setItems] = useState([]);
  const [businessName, setBusinessName] = useState("");
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [showRegisterForm, setShowRegisterForm] = useState(false);
  const [quantities, setQuantities] = useState({});
  const [user, setUser] = useState("");

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

  const handleQuantityChange = (itemId, value, unit) => {
    if (isDecimalUnit(unit)) {
      setQuantities({ ...quantities, [itemId]: value });
    } else {
      if (!value.includes(".")) {
        setQuantities({ ...quantities, [itemId]: value });
      } else {
        // Alert user or set to nearest integer
        alert("Please enter a whole number for this item.");
        const integerValue = Math.floor(value);
        setQuantities({ ...quantities, [itemId]: integerValue });
      }
    }
  };

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/items/${businessId}/itemsofbusiness`
        );
        setItems(response.data);
        console.log(response);
      } catch (error) {
        console.error("Error fetching items:", error);
      }
    };

    const fetchBusinessName = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/business/${businessId}`
        );
        setBusinessName(response.data.company);
      } catch (error) {
        console.error("Error fetching business name:", error);
      }
    };

    fetchItems();
    fetchBusinessName();
  }, [businessId]);

  const addToCart = async (itemId) => {
    try {
      const token = localStorage.getItem("jwtUserToken");
      console.log(token);
      const userResponse = await axios.get(`http://localhost:8080/users/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(userResponse);
      
      if (userResponse.status === 200) {
        console.log("Login successful!");
        setUser(userResponse.data.user_id);
        localStorage.setItem("userid", userResponse.data.user_id);
          localStorage.setItem("jwtToken", "");
          localStorage.setItem("jwtBusinessToken", "");
          localStorage.setItem("businessmanid", "");
          localStorage.setItem("businessid", "");
        const quantity = quantities[itemId] || 1;
        const cartItem = {
          user: userResponse.data.user_id,
          items: {
            [itemId]: quantity.toString(),
          },
        };
  
        // Call API to add item to cart with quantity
        const cartResponse = await axios.post(
          `http://localhost:8080/cart/add-to-cart`,
          cartItem
        );
        if (cartResponse.status === 200) {
          window.alert("Item added to cart successfully!");
        } else {
          window.alert("Item Not added to cart successfully!");
        }
      } else {
        handleOpenLoginForm();
      }
    } catch (error) {
      if (error.code === "ERR_NETWORK" || error.code === "ERR_BAD_REQUEST") {
        handleOpenLoginForm();
      } else {
        console.error("Error adding item to cart:", error);
      }
    }
  };
  

  const isDecimalUnit = (unit) =>
    ["kg", "g", "l", "ml"].includes(unit.toLowerCase());

  return (
    <>
      <Navbar />
      <div className="video-container-shop">
        <video autoPlay loop muted className="video-bg-shop">
          <source src={videoBackground} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="overlay"></div>
        <div className="content-container">
          <h1 className="business-name">{businessName}</h1>
          <div className="items-scroll-container">
            <div className="items-grid">
              {items.map((item, index) => (
                <div key={index} className="item-card">
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="item-image"
                  />
                  <h3>{item.name}</h3>
                  <div className="firsttwo">
                    <p>
                      Price: {parseFloat(item.price)} per {item.per}
                    </p>
                  </div>
                  <p
                    className={
                      item.status === "Available"
                        ? "status-available"
                        : "status-unavailable"
                    }
                  >
                    Status: {item.status}
                  </p>
                  <input
                    type="number"
                    min="1"
                    step={isDecimalUnit(item.per) ? "0.01" : "1"}
                    value={quantities[item.itemId] || ""}
                    onChange={(e) =>
                      handleQuantityChange(
                        item.itemId,
                        e.target.value,
                        item.per
                      )
                    }
                    placeholder="Quantity"
                  />
                  <button className="CartBtn" onClick={() => addToCart(item.itemId)}>
                    <span className="IconContainer">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="1em"
                        viewBox="0 0 576 512"
                        fill="rgb(17, 17, 17)"
                        className="cart"
                      >
                        <path d="M0 24C0 10.7 10.7 0 24 0H69.5c22 0 41.5 12.8 50.6 32h411c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3H170.7l5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5H488c13.3 0 24 10.7 24 24s-10.7 24-24 24H199.7c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5H24C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z"></path>
                      </svg>
                    </span>
                    <p className="text">Add to Cart</p>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {showRegisterForm && (
        <AddUserMember
          onClose={handleCloseRegisterForm}
          onSignInClick={handleOpenLoginForm}
        />
      )}
      {showLoginForm && (
        <LoginForm
          onClose={handleCloseLoginForm}
          onSignUnClick={handleOpenRegisterForm}
        />
      )}
    </>
  );
}
