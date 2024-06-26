import React, { useEffect, useState } from "react";
import axios from "axios";
import videoBackground from "../Static/cart.mp4";
import Navbar from "./Navbar";
import "../Styles/Cart.css";
import NotFound from "./NotFound";
import { useNavigate } from "react-router-dom";

export default function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [isCartEmpty, setIsCartEmpty] = useState(false);
  const userid = localStorage.getItem("userid");
  const navigate = useNavigate();
  const fetchDetails = async () => {
    try {
      const token = localStorage.getItem("jwtUserToken");
      console.log(token);
      const userResponse = await axios.get(`http://localhost:8080/users/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(userResponse);
      
      if (userResponse.status !== 200) {
        navigate("/notfound");
      } else {
      }
    } catch (error) {
      if (error.code === "ERR_NETWORK" || error.code === "ERR_BAD_REQUEST") {
        navigate("/notfound");
      } else {
        navigate("/notfound");
        console.error("Error adding item to cart:", error);
      }
    }
  }
  fetchDetails();
  useEffect(() => {
    const fetchCartItems = async () => {
      const formData = new FormData();
      formData.append("user", userid);
      console.log(userid);
      try {
        const response = await axios.post(
          "http://localhost:8080/cart/get-cart-by-user",
          formData
        );
        const items = response.data.items || [];
        console.log(response);
        setCartItems(items);
        setQuantities(response.data.quantities || {});
        setIsCartEmpty(items.length === 0);
      } catch (error) {
        setIsCartEmpty(true);
        console.error("Error fetching cart items:", error);
      }
    };

    fetchCartItems();
  }, [userid]);

  const calculateSubtotal = () => {
    let subtotal = 0;
    cartItems.forEach((item) => {
      subtotal += item.price * quantities[item.itemId];
    });
    return subtotal;
  };

  const handleOrder = async () => {
    if (cartItems.length === 0) {
      alert("Your cart is empty!");
      return;
    }

    // Group items by business
    const itemsByBusiness = {};
    cartItems.forEach(item => {
      if (!itemsByBusiness[item.business]) {
        itemsByBusiness[item.business] = [];
      }
      itemsByBusiness[item.business].push({ itemId: item.itemId, quantity: quantities[item.itemId] });
    });

    // Create carts from grouped items
    const carts = Object.keys(itemsByBusiness).map(business => ({
      user: userid,
      items: Object.fromEntries(itemsByBusiness[business].map(({ itemId, quantity }) => [itemId, quantity])),
      business: business
    }));

    try {
      const response = await axios.post(
        "http://localhost:8080/order/create?user=" + userid,
        carts
      );
      console.log("Orders placed successfully:", response.data);
      // Optionally, you can add logic to handle success, like redirecting to a confirmation page
      setCartItems([]);
      setQuantities({});
      setIsCartEmpty(true);
    } catch (error) {
      console.error("Error placing orders:", error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="cart-page">
        <div className="video-container-cart">
          <video autoPlay loop muted className="video-bg-cart">
            <source src={videoBackground} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
        <div className="fixing-items">
          <div className="cart-items-container">
            {isCartEmpty ? (
              <div className="empty-cart-message">
                <h2>Your cart is empty.</h2>
                <p>Add items to your cart to see them here.</p>
              </div>
            ) : (
              cartItems.map((item) => (
                <div key={item.itemId} className="cart-item">
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="cart-item-image"
                  />
                  <div className="cart-item-details">
                    <h3>{item.name}</h3>
                    <p>Price: ₹{item.price}</p>
                    <p>Quantity: {quantities[item.itemId]}</p>
                    <p>Per: {item.per}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
        {!isCartEmpty && (
          <div
            data-tooltip={`Price: Rs. ${calculateSubtotal()}`}
            className="button-buy"
            onClick={handleOrder} // Call handleOrder function when button is clicked
          >
            <div className="button-wrapper-buy">
              <div className="text-buy">Book Order Now : {calculateSubtotal()}</div>
              <span className="icon-buy">
                <svg
                  viewBox="0 0 16 16"
                  className="bi bi-cart2"
                  fill="currentColor"
                  height="16"
                  width="16"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5zM3.14 5l1.25 5h8.22l1.25-5H3.14zM5 13a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0zm9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0z"></path>
                </svg>
              </span>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
