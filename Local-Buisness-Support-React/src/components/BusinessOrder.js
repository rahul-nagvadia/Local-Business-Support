import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import "../Styles/OrderPage.css";
import videoBackground from "../Static/order.mp4";
export default function BusinessOrder() {
    const [orders, setOrders] = useState([]);
    const [items, setItems] = useState({});
    const businessid = localStorage.getItem("businessid");
    console.log(businessid);
    useEffect(() => {
      const fetchOrders = async () => {
        const formData = new FormData();
        formData.append("businessId", businessid);
        try {
          const response = await axios.post(
            "http://localhost:8080/order/get-orders-by-business",
            formData
          );
          console.log(response);
          setOrders(response.data);
  
          // Fetch item details for each item in the orders
          const itemDetails = {};
          for (const order of response.data) {
            for (const cart of order.carts) {
              for (const itemId in cart.items) {
                if (!itemDetails[itemId]) {
                  const itemResponse = await axios.get(
                    `http://localhost:8080/items/${itemId}`
                  );
                  itemDetails[itemId] = itemResponse.data;
                }
              }
            }
          }
          setItems(itemDetails);
        } catch (error) {
          console.error("Error fetching orders:", error);
        }
      };
  
      fetchOrders();
    }, []);
  
    return (
      <>
        <Navbar />
        <div className="orders-page">
          <div className="video-container-order">
            <video autoPlay loop muted className="video-bg-order">
              <source src={videoBackground} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
  
          <div className="order-page">
            <h1>Your Orders</h1>
            <div className="orders-container">
              {orders.length > 0 ? (
                orders.map((order) => (
                  <div key={order.order_id} className="order-card">
                    <h2>Order ID: {order.order_id}</h2>
                    <p>Order Date: {new Date(order.order_date).toLocaleString()}</p>
                  
                    <p>Status: {order.res === 1 ? "Pending" : order.res === 2 ? "Accepted" : "Declined"}</p>
                    <div className="order-items">
                      {order.carts &&
                        order.carts.length > 0 &&
                        order.carts[0].items &&
                        typeof order.carts[0].items === "object" &&
                        Object.entries(order.carts[0].items).map(
                          ([itemId, quantity]) => (
                            <div key={itemId} className="order-item">
                              {items[itemId] ? (
                                <>
                                  <img src={items[itemId].imageUrl} alt={items[itemId].name} />
                                  <div className="order-item-details">
                                  <p>{items[itemId].name}</p>
                                  <p>Quantity: {quantity}</p>
                                </div>
                                </>
                              ) : (
                                <p>Loading item details...</p>
                              )}
                            </div>
                          )
                        )}
                    </div>
                  </div>
                ))
              ) : (
                <p>No orders found</p>
              )}
            </div>
          </div>
        </div>
      </>
    );
}
